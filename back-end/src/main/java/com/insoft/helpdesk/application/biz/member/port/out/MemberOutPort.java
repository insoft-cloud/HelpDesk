package com.insoft.helpdesk.application.biz.member.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MemberOutPort {

    boolean existUserId(String userId);
    boolean existEmail(String email);
    boolean existMobilePhone(String phone);
    Page<Member> getMembers(Page<Member> members);
    Page<Member> getAdmins(Page<Member> members);
    List<Member> getManagers(List<Member> members);
    List<Member> getUsers(List<Member> members);
    List<Member> getMembers();
    Optional<Member> getMember(Optional<Member> member);
    Long countMembers(Long count);
    Member createMember(Member member);
    Member updateMember(Member member);
    Member deleteMember(Member member);

    String getMemberFindId(String email);
    List<Map>getMentionMember(List<Map> member);
    List<Map>getMention(List<Map> member);

    String getTokenForFindId(String email);
}
