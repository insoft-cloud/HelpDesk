package com.insoft.helpdesk.application.adapter.in.controller;


import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.util.HelpdeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "CodeGroup", description = "코드 그룹 API")
@HelpdeskRestController
@RequiredArgsConstructor
public class CodeGroupController {

    private final CodeGroupInPort codeGroupInPort;

    @Tag(name = "CodeGroup")
    @Operation(summary  = "코드 그룹 리스트 조회", description  = "코드 그룹 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/groups")
    public ResponseMessage selectCodeGroups(){
        return codeGroupInPort.selectCodeGroups();
    }



}
