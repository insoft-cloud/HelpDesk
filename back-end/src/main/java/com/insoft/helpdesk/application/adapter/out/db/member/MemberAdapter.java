package com.insoft.helpdesk.application.adapter.out.db.member;

import com.insoft.helpdesk.application.biz.member.port.out.MemberOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class MemberAdapter implements MemberOutPort {

    final MemberRepo memberRepo;

    @Override
    public List<Member> getMembers() {
        return memberRepo.findAll();
    }

    @Override
    public Member getMemberId(String id) {
        return memberRepo.getById(id);
    }

    @Override
    public long countMembers() {
        return memberRepo.count();
    }

    @Override
    public void createMember(Member member) {
        memberRepo.save(member);
    }

    @Override
    public void updateMember(Member member) {
        memberRepo.save(member);
    }

    @Override
    public void deleteMember(Member member) {
        memberRepo.delete(member);
    }
}
