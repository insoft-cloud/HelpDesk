package com.insoft.helpdesk.application.adapter.in.controller;

import com.insoft.helpdesk.application.biz.member.service.MemberService;
import com.insoft.helpdesk.application.domain.common.Content;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.jpa.entity.MemberTest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@RestController
public class LoginController extends Content {

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    private final MemberService memberService;

    private final RedisTemplate redisTemplate;

    @PostMapping(value = "/signin")
    public ResponseMessage signInUser(@RequestBody MemberTest memberTest) {
        MemberTest result = memberService.getMember(memberTest.getUserId());
        Map map = new HashMap<>();
        if (!passwordEncoder.matches(memberTest.getPassword(), result.getPassword())) {
            map.put("error", "ID or Password is invalid.");
        }else {
            List<String> roleList = Arrays.asList(result.getRole().split(","));
            String refreshToken = jwtTokenProvider.createRefreshToken();
            String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
            map.put("token", token);
            map.put("tokenExpired", jwtTokenProvider.getTokenExpiredTime(token));
            map.put("refreshToken", refreshToken);
            redisTemplate.opsForValue()
                    .set(refreshToken, memberTest.getUserId(), jwtTokenProvider.getRefreshTokenExpiredTime(refreshToken) - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
        }
        return ResponseMessage.builder().data(map).build();
    }

    @PostMapping(value = "/refresh-token")
    public ResponseMessage refreshToken(@RequestHeader(value="REFRESH-TOKEN") String refreshToken ) {
        Map map = new HashMap<>();
        Object redisValue = redisTemplate.opsForValue().get(refreshToken);
        if(redisValue == null) {
            map.put("error", "refresh token expired");
        }else {
            redisTemplate.delete(refreshToken);
            String userId = redisValue.toString();
            MemberTest result = memberService.getMember(userId);
            List<String> roleList = Arrays.asList(result.getRole().split(","));
            String token = jwtTokenProvider.createToken(result.getUserId(), roleList);
            String newRefreshToken = jwtTokenProvider.createRefreshToken();
            map.put("token", token);
            map.put("tokenExpired", jwtTokenProvider.getTokenExpiredTime(token));
            map.put("refreshToken", newRefreshToken);
            redisTemplate.opsForValue()
                    .set(newRefreshToken, result.getUserId(), jwtTokenProvider.getRefreshTokenExpiredTime(refreshToken) - new Timestamp(System.currentTimeMillis()).getTime(), TimeUnit.MILLISECONDS);
        }
        return ResponseMessage.builder().data(map).build();
    }

    @PostMapping(value = "/signup")
    public Object addUser(@RequestBody MemberTest memberTest) {
        memberTest.setRole("ROLE_USER");
        memberTest.setPassword(passwordEncoder.encode(memberTest.getPassword()));
        memberService.save(memberTest);
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
    public boolean userCheck(@RequestBody MemberTest memberTest){
        return passwordEncoder.matches(memberTest.getPassword(), memberService.loadUserByUsername(memberTest.getUserId()).getPassword());
    }

    @GetMapping(value = "/auth")
    public boolean authCheck(){
        return true;
    }
}
