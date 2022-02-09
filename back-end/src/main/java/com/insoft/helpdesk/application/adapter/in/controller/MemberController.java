package com.insoft.helpdesk.application.adapter.in.controller;


import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "Member", description = "멤버 API")
@HelpdeskRestController
@RequiredArgsConstructor
public class MemberController {


    
}
