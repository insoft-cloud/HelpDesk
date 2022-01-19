package com.insoft.helpdesk.application.biz.member.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import org.springframework.http.ResponseEntity;

public interface LoginInPort {

    Member SignIn(Member member);
    ResponseEntity SignUp(Member member);
}
