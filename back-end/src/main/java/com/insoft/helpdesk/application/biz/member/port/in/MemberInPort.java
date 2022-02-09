package com.insoft.helpdesk.application.biz.member.port.in;


import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import org.springframework.http.ResponseEntity;

/**
 * @Project     : HelpDesk
 * @ClassName   : MemberInPort
 * @FileName    : MemberInPort.java
 * @Date        : 2022-01-18
 * @author      : 박철한
 * @description : MemberAdapter 에서 데이터 처리 결과 정보를 위한 Port
 */
public interface MemberInPort<T> {

    ResponseEntity<T> getMembers();
    ResponseEntity<T> getMemberId(String id);

    boolean existUserId(String userId);
    boolean existEmail(String email);

    ResponseEntity<T> createMember(Member member);
    ResponseEntity<T> updateMember(Member member);
    ResponseEntity<T> deleteMember(Member member);
}
