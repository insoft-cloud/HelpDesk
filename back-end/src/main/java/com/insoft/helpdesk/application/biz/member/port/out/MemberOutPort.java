package com.insoft.helpdesk.application.biz.member.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;

import java.util.List;

public interface MemberOutPort {
    List<Member> getMembers();
    Member getMemberId(String id);
    long countMembers();

    boolean existUserId(String userId);
    boolean existEmail(String email);





    void createMember(Member member);
    void updateMember(Member member);
    void deleteMember(Member member);
}
