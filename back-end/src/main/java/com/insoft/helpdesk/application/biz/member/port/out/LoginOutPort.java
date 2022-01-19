package com.insoft.helpdesk.application.biz.member.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;

import java.util.List;

public interface LoginOutPort {
    Member getMemberId(String id);
    void createMember(Member member);
    void updateMember(Member member);
}
