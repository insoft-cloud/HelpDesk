package com.insoft.helpdesk.application.adapter.in.controller;

import com.insoft.helpdesk.application.biz.member.port.in.LoginInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.entity.login.HelpDeskToken;
import com.insoft.helpdesk.application.domain.entity.login.HelpdeskCaptcha;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.util.annotation.HelpDeskSignRestController;
import com.insoft.helpdesk.util.content.HelpDeskErrorCode;
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

import javax.servlet.http.HttpServletRequest;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@HelpDeskSignRestController
@Tag(name = "Login", description = "로그인 API")
@Slf4j
public class LoginController {

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    private final LoginInPort loginInPort;

    private final RedisTemplate redisTemplate;

    private final WebClient webClient;

    private final MemberInPort memberInPort;

    private final static String TAGNAME = "Login";

    @Value("${login.loopbackaddress}")
    private String LOOPBACKADDRESS ;

    // IP 주소 확인
    private String getUserIp() {
        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();

        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) { ip = request.getHeader("Proxy-Client-IP"); }
        if (ip == null) { ip = request.getHeader("WL-Proxy-Client-IP"); }
        if (ip == null) { ip = request.getHeader("HTTP_CLIENT_IP"); }
        if (ip == null) { ip = request.getHeader("HTTP_X_FORWARDED_FOR"); }
        if (ip == null) { ip = request.getRemoteAddr(); }
        if (LOOPBACKADDRESS.equals(ip)) {
            InetAddress address = null;
            try {
                address = InetAddress.getLocalHost();
            } catch (final UnknownHostException e) {
                e.printStackTrace();
            }
            ip = Objects.requireNonNull(address).getHostAddress();
        }

        String[] realIp = ip.split(",");

        return realIp[0];
    }

    @Value("${captcha_key}")
    private String captchaKey;

    @Transactional(readOnly = true)
    @Tag(name = TAGNAME)
    @Operation(summary  = "로그인", description  = "로그인")
    @PostMapping("/signin")
    public ResponseEntity signInUser(@RequestBody Member member) throws HelpDeskException {
        Member memberTemp = (Member) memberInPort.getMember(member.getUserId()).orElse(null);
        if(memberTemp == null) {
            throw new HelpDeskException(HelpDeskErrorCode.LOGIN_VALIDATE_ERROR);
        }
        if("Y".equals(memberTemp.getDelYn())) {
            throw new HelpDeskException(HelpDeskErrorCode.WITHDRAWAL_MEMBER);
        }
        if("N".equals(memberTemp.getJoinConfirmYN()) && "N".equals(memberTemp.getDelYn())) {
            throw new HelpDeskException(HelpDeskErrorCode.UNAUTHORIZED_USER);
        }
        Member result = loginInPort.signIn(member);
        if (!passwordEncoder.matches(member.getPassword(), result.getPassword())) {
            throw new HelpDeskException(HelpDeskErrorCode.LOGIN_VALIDATE_ERROR);
        }else {
            List<GrantedAuthority> roleList = result.getAuthorities().stream().collect(Collectors.toList());
            String refreshToken = jwtTokenProvider.createRefreshToken();
            String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
            long tokenExpiredTime = jwtTokenProvider.getTokenExpiredTime(token);
            long refreshTokenExpiredTime = jwtTokenProvider.getRefreshTokenExpiredTime(refreshToken);
            redisTemplate.opsForValue()
                    .set(refreshToken, result.getUserId() + " " + getUserIp(),  refreshTokenExpiredTime - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
            return ResponseEntity.ok(
                    HelpDeskToken
                            .builder()
                            .accessToken(token)
                            .userId(jwtTokenProvider.getUserPk(token))
                            .refreshToken(refreshToken)
                            .userName(result.getUsername())
                            .refreshTokenExpired(refreshTokenExpiredTime)
                            .tokenExpired(tokenExpiredTime)
                            .auth(result.getAuth().getId())
                            .build());
        }
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "캡챠", description  = "캡챠")
    @PostMapping("/captcha-check")
    public Mono captchaCheck(HttpServletRequest request, @RequestBody HelpdeskCaptcha helpdeskCaptcha) {
        return webClient.post()
                .uri("http://172.0.128.152:6010/recaptcha/api/siteverify?"+captchaKey+"&response=" + helpdeskCaptcha.getResponse())
                .bodyValue(helpdeskCaptcha)
                .retrieve()
                .bodyToMono(Object.class);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "refresh 토큰 생성", description  = "refresh 토큰 생성")
    @Transactional(readOnly = true)
    @PostMapping("/refresh-token")
    public ResponseEntity refreshToken(@RequestHeader("REFRESH-TOKEN") String refreshToken, HttpServletRequest request ) throws HelpDeskException {
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
                Member result = loginInPort.signIn(Member.builder().userId(userId).build());
                List<GrantedAuthority> roleList = result.getAuthorities().stream().collect(Collectors.toList());
                String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
                String newRefreshToken = jwtTokenProvider.createRefreshToken();
                long tokenExpiredTime = jwtTokenProvider.getTokenExpiredTime(token);
                long refreshTokenExpiredTime = jwtTokenProvider.getRefreshTokenExpiredTime(newRefreshToken);
                redisTemplate.opsForValue()
                        .set(refreshToken, result.getUserId() + " " + getUserIp(), refreshTokenExpiredTime - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
                return ResponseEntity.ok(
                        HelpDeskToken
                                .builder()
                                .accessToken(token)
                                .userId(jwtTokenProvider.getUserPk(token))
                                .refreshToken(refreshToken)
                                .userName(result.getUsername())
                                .refreshTokenExpired(refreshTokenExpiredTime)
                                .tokenExpired(tokenExpiredTime)
                                .auth(result.getAuth().getId())
                                .build());
            } else {
                throw new HelpDeskException(HelpDeskErrorCode.SIGNIN_ERROR);
            }
        }
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "회원가입", description  = "회원가입")
    @PostMapping("/signup")
    public Object addUser(@RequestBody Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        loginInPort.signUp(member);
        return true;
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "아이디 중복체크", description  = "아이디 중복체크")
    @GetMapping("/members/userid/{id}/exist")
    public ResponseEntity existMemberId(@PathVariable String id){
        boolean result = memberInPort.existUserId(id);
        return ResponseEntity.ok().body(result);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "이메일 중복체크", description  = "이메일 중복체크")
    @GetMapping("/members/email/{email}/exist")
    public ResponseEntity existMemberEmail(@PathVariable String email){
        boolean result = memberInPort.existEmail(email);
        return ResponseEntity.ok().body(result);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "아이디 찾기", description  = "이메일로 아이디 찾기")
    @GetMapping("/members/findId/{email}")
    public ResponseEntity getMemberFindId(@PathVariable String email){
        String result = memberInPort.getMemberFindId(email);
        return  ResponseEntity.ok().body(result);
    }
}
