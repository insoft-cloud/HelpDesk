package com.insoft.helpdesk.application.adapter.in.controller;

import com.insoft.helpdesk.application.biz.member.port.in.LoginInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.entity.login.HelpDeskToken;
import com.insoft.helpdesk.application.domain.entity.login.HelpdeskCaptcha;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.util.annotation.HelpDeskSignRestController;
import com.insoft.helpdesk.util.content.HelpDeskErrorCode;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import com.insoft.helpdesk.util.handler.HelpDeskException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@HelpDeskSignRestController
@Slf4j
public class LoginController {

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    private final LoginInPort loginInPort;

    private final RedisTemplate redisTemplate;

    private final WebClient webClient;

    private final MemberInPort memberInPort;

    // IP 주소 확인
    private String getUserIp() {
        HttpServletRequest request =((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();

        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) ip = request.getHeader("Proxy-Client-IP");
        if (ip == null) ip = request.getHeader("WL-Proxy-Client-IP");
        if (ip == null) ip = request.getHeader("HTTP_CLIENT_IP");
        if (ip == null) ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        if (ip == null) ip = request.getRemoteAddr();
        if (ip.equals("127.0.0.1")) {
            InetAddress address = null;
            try {
                address = InetAddress.getLocalHost();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
            ip = address.getHostAddress();
        }

        String[] realIp = ip.split(",");

        return realIp[0];
    }

    @Value("${captcha_key}")
    private String captchaKey;

    @Transactional(readOnly = true)
    @PostMapping(value = "/signin")
    public ResponseEntity signInUser(@RequestBody Member member) throws HelpDeskException {
        Member _member = (Member) memberInPort.getMember(member.getUserId()).orElse(null);
        if(_member.getDelYn().equals("Y")) {
            throw new HelpDeskException(HelpDeskErrorCode.WITHDRAWAL_MEMBER);
        }
        if(_member.getJoinConfirmYN().equals("N") && _member.getDelYn().equals("N")) {
            throw new HelpDeskException(HelpDeskErrorCode.UNAUTHORIZED_USER);
        }
        Member result = loginInPort.SignIn(member);
        if (!passwordEncoder.matches(member.getPassword(), result.getPassword())) {
            throw new HelpDeskException(HelpDeskErrorCode.LOGIN_VALIDATE_ERROR);
        }else {
            List<GrantedAuthority> roleList = result.getAuthorities().stream().collect(Collectors.toList());
            String refreshToken = jwtTokenProvider.createRefreshToken();
            String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
            long tokenExpiredTime = jwtTokenProvider.getTokenExpiredTime(token);
            long refreshTokenExpiredTime = jwtTokenProvider.getRefreshTokenExpiredTime(refreshToken);
            redisTemplate.opsForValue()
                    .set(refreshToken, result.getUserId() + " " + getUserIp(),  tokenExpiredTime - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
            return ResponseEntity.ok(
                    HelpDeskToken
                            .builder()
                            .accessToken(token)
                            .userId(jwtTokenProvider.getUserPk(token))
                            .refreshToken(refreshToken)
                            .userName(result.getUsername())
                            .refreshTokenExpired(refreshTokenExpiredTime)
                            .tokenExpired(tokenExpiredTime)
                            .auth(result.getAuth())
                            .build());
        }

    }

    @PostMapping(value = "/captcha-check")
    public Mono captchaCheck(HttpServletRequest request, @RequestBody HelpdeskCaptcha helpdeskCaptcha) {
        return webClient.post()
                .uri("https://www.google.com/recaptcha/api/siteverify?secret="+captchaKey+"&response=" + helpdeskCaptcha.getResponse())
                .bodyValue(helpdeskCaptcha)
                .retrieve()
                .bodyToMono(Object.class);
    }

    @Transactional(readOnly = true)
    @PostMapping(value = "/refresh-token")
    public ResponseEntity refreshToken(@RequestHeader(value="REFRESH-TOKEN") String refreshToken, HttpServletRequest request ) throws HelpDeskException {
        Object redisValue = redisTemplate.opsForValue().get(refreshToken);
        if(redisValue == null) {
            throw new HelpDeskException(HelpDeskErrorCode.TOKEN_ERROR);
        } else {
            String info[] = redisValue.toString().split(" ");
            String userId = "";
            for(int i = 0; i < info.length - 1; ++i) {
                userId += info[i];
            }
            String userIp = info[info.length - 1];
            if(userIp.equals(getUserIp())) {
                Member result = loginInPort.SignIn(Member.builder().userId(userId).build());
                List<GrantedAuthority> roleList = result.getAuthorities().stream().collect(Collectors.toList());
                String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
                String newRefreshToken = jwtTokenProvider.createRefreshToken();
                long tokenExpiredTime = jwtTokenProvider.getTokenExpiredTime(token);
                long refreshTokenExpiredTime = jwtTokenProvider.getRefreshTokenExpiredTime(newRefreshToken);
                redisTemplate.opsForValue()
                        .set(refreshToken, result.getUserId() + " " + getUserIp(), tokenExpiredTime - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
                return ResponseEntity.ok(
                        HelpDeskToken
                                .builder()
                                .accessToken(token)
                                .userId(jwtTokenProvider.getUserPk(token))
                                .refreshToken(refreshToken)
                                .userName(result.getUsername())
                                .refreshTokenExpired(refreshTokenExpiredTime)
                                .tokenExpired(tokenExpiredTime)
                                .auth(result.getAuth())
                                .build());
            } else {
                throw new HelpDeskException(HelpDeskErrorCode.SIGNIN_ERROR);
            }
        }
    }

    @PostMapping(value = "/signup")
    public Object addUser(@RequestBody Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        loginInPort.SignUp(member);
        return true;
    }

    @Tag(name = "Member")
    @Operation(summary  = "아이디 중복체크", description  = "아이디 중복체크")
    @GetMapping("/members/userid/{id}/exist")
    public ResponseEntity existMemberId(@PathVariable String id){
        boolean result = memberInPort.existUserId(id);
        return ResponseEntity.ok().body(result);
    }

    @Tag(name = "Member")
    @Operation(summary  = "이메일 중복체크", description  = "이메일 중복체크")
    @GetMapping("/members/email/{email}/exist")
    public ResponseEntity existMemberEmail(@PathVariable String email){
        boolean result = memberInPort.existEmail(email);
        return ResponseEntity.ok().body(result);
    }

    @Tag(name = "Member")
    @Operation(summary  = "이메일 중복체크", description  = "이메일 중복체크")
    @GetMapping("/tests")
    public Map tests(@RequestParam(value = "tests", required = false)String tests){
        log.info(tests.toString());
        log.info(HelpDeskMapper.mapToJson(tests).toString());

        return HelpDeskMapper.mapToJson(tests);
    }

    @Tag(name = "Member")
    @Operation(summary  = "이메일 중복체크", description  = "이메일 중복체크")
    @PostMapping("/test")
    public Map testsPatch(){
        Map map = new HashMap();
        map.put("result", true);
        return map;
    }


    @Tag(name = "Member")
    @Operation(summary  = "아이디 찾기", description  = "이메일로 아이디 찾기")
    @GetMapping("/members/findId/{email}")
    public ResponseEntity getMemberFindId(@PathVariable String email){
        String result = memberInPort.getMemberFindId(email);
        return  ResponseEntity.ok().body(result);
    }

    @Tag(name = "Member")
    @Operation(summary  = "비밀번호 찾기", description  = "이메일, 아이디로 비밀번호 재설정")
    @PostMapping("/members/findPw/{id}")
    public ResponseEntity updateMember(@PathVariable String id, @RequestBody Member member) {
        if (member.getPassword() != null) {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        Member _member = (Member) memberInPort.getMember(id).orElse(null);
        _member = _member.updateMember(member);
        memberInPort.updateMember(_member);
        return ResponseEntity.ok(_member);
    }
//    public ResponseEntity getMemberFindPw(@PathVariable String email, @RequestBody Member member){
//        if(member.getPassword()!=null){
//            member.setPassword(passwordEncoder.encode(member.getPassword()));
//        }
//        String result = memberInPort.getMemberFindPw(email);
//        return ResponseEntity.ok(result);
//    }

    @PersistenceContext
    private EntityManager em;


    public String getRemoteAddr(HttpServletRequest request) {

        String ip = null;

        ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getHeader("Proxy-Client-IP");

        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getHeader("WL-Proxy-Client-IP");

        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getHeader("HTTP_CLIENT_IP");

        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getHeader("HTTP_X_FORWARDED_FOR");

        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getHeader("X-Real-IP");

        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getHeader("X-RealIP");

        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getHeader("REMOTE_ADDR");

        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {

            ip = request.getRemoteAddr();

        }

        return ip;

    }

}
