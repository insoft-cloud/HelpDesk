package com.insoft.helpdesk.application.biz.member.service;

import com.insoft.helpdesk.application.biz.member.port.in.LoginInPort;
import com.insoft.helpdesk.application.biz.member.port.out.LoginOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService, LoginInPort {

    private final LoginOutPort loginOutPort;

    @Override
    public Member SignIn(Member member) {
        System.out.println("여기옴");
        return loginOutPort.getMemberId(member.getUserId());
    }

    @Override
    public ResponseEntity SignUp(Member member) {
        loginOutPort.createMember(member);
        return ResponseEntity.status(201).body(null);
    }

    @Override
    public Member loadUserByUsername(String id) throws UsernameNotFoundException {
        return loginOutPort.getMemberId(id);
    }
}
