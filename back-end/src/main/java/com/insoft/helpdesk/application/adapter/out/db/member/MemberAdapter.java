package com.insoft.helpdesk.application.adapter.out.db.member;

import com.insoft.helpdesk.application.biz.member.port.out.MemberOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class MemberAdapter implements MemberOutPort {

    final MemberRepo memberRepo;

    @Override
    public boolean existUserId(String userId) {
        return memberRepo.existsByUserId(userId);
    }

    @Override
    public boolean existEmail(String email) {
        return memberRepo.existsByEmail(email);
    }

    @Override
    public boolean existMobilePhone(String phone) {
        return memberRepo.existsByPhoneNumber(phone);
    }

    @Override
    public String getMemberFindId(String email ){ return memberRepo.findByUserId(email); }

    @Override
    public Page<Member> getMembers(Page<Member> members) {return members;}

    @Override
    public List<Member> getManagers(List<Member> members) {return members;}

    @Override
    public List<Member> getUsers(List<Member> members) {return members;}

    @Override
    public Optional<Member> getMember(Optional<Member> member) { return member; }

    @Override
    public Long countMembers(Long count) { return count; }

    @Override
    public Member createMember(Member member) { return member; }

    @Override
    public Member updateMember(Member member) { return member; }

    @Override
    public Member deleteMember(Member member) { return member; }

    @Override
    public List<Member> getMembers() {
        return null;
    }

}
