package com.insoft.helpdesk.application.adapter.in.controller;


import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Tag(name = "CodeGroup", description = "코드 그룹 API")
@RequestMapping(value = "/v1/code_groups")
@RestController
public class CodeGroupController {

    private final CodeGroupInPort codeGroupInPort;

    public CodeGroupController(CodeGroupInPort codeGroupInPort) {
        this.codeGroupInPort = codeGroupInPort;
    }

    @Tag(name = "CodeGroup")
    @Operation(summary  = "코드 그룹 리스트 조회", description  = "코드 그룹 데이터 리스트 전체를 조회합니다.")
    @GetMapping
    public List selectCodeGroups(){
        return codeGroupInPort.selectCodeGroups();
    }



}
