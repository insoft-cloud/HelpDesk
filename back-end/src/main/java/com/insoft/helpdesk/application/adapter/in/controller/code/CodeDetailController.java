package com.insoft.helpdesk.application.adapter.in.controller.code;


import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.domain.entity.code.CodeDetailList;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.util.annotation.HelpDeskAdminRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "CodeDetail", description = "코드 상세 API")
@HelpDeskAdminRestController
@RequiredArgsConstructor
public class CodeDetailController {

    private final CodeDetailInPort codeDetailInPort;

    private final CodeGroupInPort codeGroupInPort;

    @Tag(name = "CodeDetail")
    @GetMapping("/group/{id}/details")
    public Page<Detail> getDetails(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return codeDetailInPort.getDetails(id, HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams), pageable);
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/group/detail/{id}")
    public Detail selectCodeGroups(@PathVariable String id){
        return codeDetailInPort.getDetail(id).orElse(null);
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/group/details/count")
    public Long getDetailsCount( @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return codeDetailInPort.getDetailsCount(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams));
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/group/{id}/details/count")
    public Long getDetailsGroupIdCount(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return codeDetailInPort.getDetailsCount(id, HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams));
    }

    @Tag(name = "CodeDetail")
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

    @Tag(name = "CodeDetail")
    @PostMapping("/group/{id}/details")
    public List createDetail(@PathVariable String id, @RequestBody CodeDetailList codeDetailList) throws Exception {
        Group group = codeGroupInPort.getCodeGroup(id).orElse(null);
        if(group == null){
            throw new Exception("null");
        }
        return codeDetailInPort.updateDetail(group, codeDetailList);
    }
//
//    @Tag(name = "CodeDetail")
//    @PatchMapping("/group/detail/{id}")
//    public Detail updateDetail(@PathVariable String id,@RequestBody Detail detail) throws Exception {
//        Detail _detail = codeDetailInPort.getDetail(id).orElse(null);
//        if(_detail == null){
//            throw new Exception("null");
//        }
//        _detail.updateDetail(detail);
//        codeDetailInPort.updateDetail(_detail);
//        return _detail;
//    }
//
//    @Tag(name = "CodeDetail")
//    @DeleteMapping("/group/detail/{id}")
//    public Detail deleteDetail(@PathVariable String id) throws Exception {
//        Detail _detail = codeDetailInPort.getDetail(id).orElse(null);
//        if(_detail == null){
//            throw new Exception("null");
//        }
//        codeDetailInPort.deleteDetail(_detail);
//        return _detail;
//    }
}
