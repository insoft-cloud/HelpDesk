package com.insoft.helpdesk.application.adapter.in.controller;

import com.insoft.helpdesk.application.biz.member.service.MemberService;
import com.insoft.helpdesk.application.domain.common.Content;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.jpa.entity.MemberTest;
import com.insoft.helpdesk.application.domain.jpa.repo.MemberTestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class LoginController extends Content {

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    private final MemberService memberService;



    public LoginController(PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, MemberService memberService) {
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;

    }

    @PostMapping(value = "/signin")
    public ResponseMessage signInUser(@RequestBody MemberTest memberTest) {
        MemberTest result = memberService.getMember(memberTest.getUserId());
        Map map = new HashMap<>();
        if (!passwordEncoder.matches(memberTest.getPassword(), result.getPassword())) {
            map.put("error", "ID or Password is invalid.");
        }else {
            List<String> roleList = Arrays.asList(result.getRole().split(","));
            map.put("token", jwtTokenProvider.createToken(result.getUserId(), roleList));
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
