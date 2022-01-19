package com.insoft.helpdesk.application.biz.member.service;

import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.biz.member.port.out.MemberOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService implements MemberInPort {

    final MemberOutPort memberOutPort;

    @Override
    public ResponseEntity getMembers() {
        return ResponseEntity.ok(memberOutPort.getMembers());
    }

    @Override
    public ResponseEntity getMemberId(String id) {
        return ResponseEntity.ok(memberOutPort.getMemberId(id));
    }


    @Override
    public ResponseEntity createMember(Member member) {
        memberOutPort.createMember(member);
        return ResponseEntity.status(201).body(null);
    }

    @Override
    public ResponseEntity updateMember(Member member) {
        memberOutPort.updateMember(member);
        return ResponseEntity.accepted().body(null);
    }

    @Override
    public ResponseEntity deleteMember(Member member) {
        memberOutPort.deleteMember(member);
        return ResponseEntity.accepted().body(null);
    }
}
