package com.insoft.helpdesk.application.adapter.in.controller;

import com.insoft.helpdesk.application.biz.member.port.in.LoginInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.entity.login.HelpDeskToken;
import com.insoft.helpdesk.application.domain.entity.login.HelpdeskCaptcha;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.util.annotation.HelpdeskSignRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@HelpdeskSignRestController
public class LoginController {

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    private final LoginInPort loginInPort;

    private final RedisTemplate redisTemplate;

    private final WebClient webClient;

    private final MemberInPort memberInPort;

    @Value("${captcha_key}")
    private String captchaKey;

    @Transactional(readOnly = true)
    @PostMapping(value = "/signin")
    public ResponseEntity signInUser(@RequestBody Member member) {
        Member result = loginInPort.SignIn(member);
        if (!passwordEncoder.matches(member.getPassword(), result.getPassword())) {
            return ResponseEntity.badRequest().body("패스워드 불일치");
        }else {
            List<GrantedAuthority> roleList = result.getAuthorities().stream().collect(Collectors.toList());
            String refreshToken = jwtTokenProvider.createRefreshToken();
            String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
            long tokenExpiredTime = jwtTokenProvider.getTokenExpiredTime(token);
            long refreshTokenExpiredTime = jwtTokenProvider.getRefreshTokenExpiredTime(refreshToken);
//            redisTemplate.opsForValue()
//                    .set(refreshToken, result.getUserId(),  tokenExpiredTime - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
            return ResponseEntity.ok(
                    HelpDeskToken
                            .builder()
                            .accessToken(token)
                            .userName(jwtTokenProvider.getUserPk(token))
                            .refreshToken(refreshToken)
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
    public ResponseEntity refreshToken(@RequestHeader(value="REFRESH-TOKEN") String refreshToken ) {
        Object redisValue = redisTemplate.opsForValue().get(refreshToken);
        if(redisValue == null) {
            return ResponseEntity.badRequest().body("토큰이 없거나 만료되었습니다.");
        }else {
            String userId = redisValue.toString();
            Member result = loginInPort.SignIn(Member.builder().userId(userId).build());
            List<GrantedAuthority> roleList = result.getAuthorities().stream().collect(Collectors.toList());
            String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
            String newRefreshToken = jwtTokenProvider.createRefreshToken();
            long tokenExpiredTime = jwtTokenProvider.getTokenExpiredTime(token);
            long refreshTokenExpiredTime = jwtTokenProvider.getRefreshTokenExpiredTime(newRefreshToken);
            redisTemplate.opsForValue()
                    .set(refreshToken, result.getUserId(),  tokenExpiredTime - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
            return ResponseEntity.ok(
                    HelpDeskToken
                            .builder()
                            .accessToken(token)
                            .userName(jwtTokenProvider.getUserPk(token))
                            .refreshToken(refreshToken)
                            .refreshTokenExpired(refreshTokenExpiredTime)
                            .tokenExpired(tokenExpiredTime)
                            .auth(result.getAuth())
                            .build());
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
