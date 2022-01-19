package com.insoft.helpdesk.application.adapter.out.db.member;

import com.insoft.helpdesk.application.biz.member.port.out.LoginOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginAdapter implements LoginOutPort {

    final MemberRepo memberRepo;

    @Override
    public Member getMemberId(String id) {
        return memberRepo.getById(id);
    }

    @Override
    public void createMember(Member member) {
        memberRepo.save(member);
    }

    @Override
    public void updateMember(Member member) {
        memberRepo.save(member);
    }
}
