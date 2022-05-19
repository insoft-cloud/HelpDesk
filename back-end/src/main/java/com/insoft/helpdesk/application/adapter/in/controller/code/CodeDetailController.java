package com.insoft.helpdesk.application.adapter.in.controller.code;


import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.domain.entity.code.CodeDetailList;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.util.annotation.HelpDeskAdminRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "CodeDetail", description = "코드 상세 API")
@HelpDeskAdminRestController
@RequiredArgsConstructor
public class CodeDetailController {

    private final CodeDetailInPort codeDetailInPort;

    private final CodeGroupInPort codeGroupInPort;

    final static String TAGNAME = "CodeDetail";
    final static String KEY = "key";
    final static String SEARCH = "search";

    @Tag(name = TAGNAME)
    @Operation(summary = "해당 코드상세 전체 조회(페이지형식)", description = "해당 코드그룹의 코드상세 전체 조회(페이지형식)")
    @GetMapping("/group/{id}/details")
    public Page<Detail> getDetails(@PathVariable String id, @RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams, Pageable pageable){
        return codeDetailInPort.getDetails(id, HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams), pageable);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "해당 코드상세 전체 조회(리스트형식)", description = "해당 코드그룹의 코드상세 전체 조회(리스트형식)")
    @GetMapping("/group/{id}/details_list")
    public List<Detail> getDetailsList(@PathVariable String id){
        return codeDetailInPort.getDetailsList(id);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "해당 코드상세 조회", description = "해당 id 코드상세 조회")
    @GetMapping("/group/detail/{id}")
    public Detail selectCodeGroups(@PathVariable String id){
        return codeDetailInPort.getDetail(id).orElse(null);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "코드상세 수 카운트", description = "코드상세 수 카운트")
    @GetMapping("/group/details/count")
    public Long getDetailsCount( @RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams){
        return codeDetailInPort.getDetailsCount(HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams));
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "코드상세 수 카운트", description = "해당 코드그룹의 총 코드상세 수 조회")
    @GetMapping("/group/{id}/details/count")
    public Long getDetailsGroupIdCount(@PathVariable String id, @RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams){
        return codeDetailInPort.getDetailsCount(id, HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams));
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "코드상세 생성", description = "코드상세 생성")
    @PostMapping("/group/{id}/detail")
    public Detail createDetail(@PathVariable String id, @RequestBody Detail detail) throws Exception {
        Group group = codeGroupInPort.getCodeGroup(id).orElse(null);
        if(group == null){
            throw new Exception("null");
        }
        detail.setCdGroupNo(group);
        codeDetailInPort.createDetail(detail);
        return detail;
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "코드상세 수정", description = "코드상세 수정")
    @PostMapping("/group/{id}/details")
    public List createDetail(@PathVariable String id, @RequestBody CodeDetailList codeDetailList) throws Exception {
        Group group = codeGroupInPort.getCodeGroup(id).orElse(null);
        if(group == null){
            throw new Exception("null");
        }
        return codeDetailInPort.updateDetail(group, codeDetailList);
    }
}
