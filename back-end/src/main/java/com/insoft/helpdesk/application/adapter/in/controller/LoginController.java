package com.insoft.helpdesk.application.adapter.in.controller;

import com.insoft.helpdesk.application.biz.member.port.in.LoginInPort;
import com.insoft.helpdesk.application.biz.member.service.MemberService;
import com.insoft.helpdesk.application.domain.common.Content;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.entity.login.HelpDeskToken;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class LoginController extends Content {

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    private final LoginInPort loginInPort;

    private final RedisTemplate redisTemplate;

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
            redisTemplate.opsForValue()
                    .set(refreshToken, result.getUserId(),  tokenExpiredTime - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
            return ResponseEntity.ok(HelpDeskToken.builder().accessToken(token).refreshToken(refreshToken).refreshTokenExpired(refreshTokenExpiredTime).tokenExpired(tokenExpiredTime).build());
        }

    }

    @Transactional(readOnly = true)
    @PostMapping(value = "/refresh-token")
    public ResponseEntity refreshToken(@RequestHeader(value="REFRESH-TOKEN") String refreshToken ) {
        Object redisValue = redisTemplate.opsForValue().get(refreshToken);
        if(redisValue == null) {
            return ResponseEntity.badRequest().body("토큰이 없거나 만료되었습니다.");
        }else {
            redisTemplate.delete(refreshToken);
            String userId = redisValue.toString();
            Member result = loginInPort.SignIn(Member.builder().userId(userId).build());
            List<GrantedAuthority> roleList = result.getAuthorities().stream().collect(Collectors.toList());
            String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
            String newRefreshToken = jwtTokenProvider.createRefreshToken();
            long tokenExpiredTime = jwtTokenProvider.getTokenExpiredTime(token);
            long refreshTokenExpiredTime = jwtTokenProvider.getRefreshTokenExpiredTime(newRefreshToken);
            redisTemplate.opsForValue()
                    .set(newRefreshToken, result.getUserId(), jwtTokenProvider.getRefreshTokenExpiredTime(refreshToken) - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
            return ResponseEntity.ok(HelpDeskToken.builder().accessToken(token).refreshToken(newRefreshToken).refreshTokenExpired(refreshTokenExpiredTime).tokenExpired(tokenExpiredTime).build());
        }
    }

    @PostMapping(value = "/signup")
    public Object addUser(@RequestBody Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        loginInPort.SignUp(member);
        return true;
//        SignVO signVO = new SignVO();
//        int result = customUserDetailService.signInUser(user);
//        if (result == 1) {
//            signVO.setResult("success");
//            signVO.setMessage("SignUp complete");
//            return signVO;
//        } else if (result == -1) {
//            signVO.setResult("fail");
//            signVO.setMessage("There is the same name, please change your name.");
//            return signVO;
//        } else {
//            signVO.setResult("fail");
//            signVO.setMessage("Ask system admin");
//            return signVO;
//        }
    }

    @PostMapping(value = "/test")
    public boolean userCheck(@RequestBody Member member){
        return passwordEncoder.matches(member.getPassword(), loginInPort.SignIn(member).getPassword());
    }

    @GetMapping(value = "/auth")
    public boolean authCheck(){
        return true;
    }
}
