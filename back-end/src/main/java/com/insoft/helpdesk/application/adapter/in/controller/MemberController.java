package com.insoft.helpdesk.application.adapter.in.controller;


import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Member", description = "멤버 API")
@RequestMapping(value = "/v1/member")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberInPort memberInPort;

    @Tag(name = "Member")
    @Operation(summary  = "멤버 전체 조회", description  = "멤버 리스트 전체를 조회합니다.")
    @GetMapping
    public ResponseEntity selectCodeGroups(){
        return memberInPort.getMembers();
    }
    
}
