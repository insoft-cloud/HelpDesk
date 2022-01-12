package com.insoft.helpdesk.application.biz.member.service;

import com.insoft.helpdesk.application.domain.jpa.entity.MemberTest;
import com.insoft.helpdesk.application.domain.jpa.repo.MemberTestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MemberService implements UserDetailsService {


    @Autowired
    MemberTestRepo memberTestRepo;


    @Override
    public MemberTest loadUserByUsername(String id) throws UsernameNotFoundException {
        return memberTestRepo.findById(id).get();
    }

    public MemberTest getMember(String id){
        return memberTestRepo.findById(id).get();
    }

    public void save(MemberTest memberTest){
        memberTestRepo.save(memberTest);
    }
}
