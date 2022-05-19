package com.insoft.helpdesk.application.biz.member.port.in;


import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @Project     : HelpDesk
 * @ClassName   : MemberInPort
 * @FileName    : MemberInPort.java
 * @Date        : 2022-01-18
 * @author      : 박철한
 * @description : MemberAdapter 에서 데이터 처리 결과 정보를 위한 Port
 */
public interface MemberInPort<T> {

    boolean existUserId(String userId);
    boolean existEmail(String email);

    Page<Member> getMembers(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Page<Member> getAdmins(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    List<Member> getManagers(Map<String,String> keyParams, Map<String,String> searchParams);
    List<Member> getUsers(Map<String,String> keyParams, Map<String,String> searchParams);
    Optional<Member> getMember(String id);
    Long countMembers(Map<String,String> keyParams, Map<String,String> searchParams);
    Member createMember(Member member);
    Member updateMember(Member member);
    Member deleteMember(Member member);
    Optional<Member> getMemberByEmail(String email);

    String getMemberFindId(String email);

    String getTokenForFindId(String email);

    List<Map>getMentionMember(String userId);
    List<Map>getMention();
}
