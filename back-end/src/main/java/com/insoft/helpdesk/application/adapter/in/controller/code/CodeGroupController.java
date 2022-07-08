package com.insoft.helpdesk.application.adapter.in.controller.code;


import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.util.annotation.HelpDeskAdminRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "CodeGroup", description = "코드 그룹 API")
@HelpDeskAdminRestController
@RequiredArgsConstructor
public class CodeGroupController {

    private final CodeGroupInPort codeGroupInPort;

    final static String TAGNAME = "CodeGroup";
    final static String KEY = "key";
    final static String SEARCH = "search";


    @Tag(name = TAGNAME)
    @Operation(summary  = "코드 그룹 리스트 조회", description  = "코드 그룹 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/group/{id}")
    public ResponseEntity getCodeGroups(@PathVariable String id){
        return ResponseEntity.ok(codeGroupInPort.getCodeGroup(id));
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "코드 그룹 리스트 조회", description  = "코드 그룹 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/groups")
    public ResponseEntity getCodeGroups(@RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams, Pageable pageable){
        return ResponseEntity.ok(codeGroupInPort.getCodeGroups(HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams), pageable));
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "코드그룹 수 조회", description = "코드그룹 수 카운트")
    @GetMapping("/groups/count")
    public ResponseEntity countCodeGroups(@RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams){
        return ResponseEntity.ok(codeGroupInPort.countCodeGroups(HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams)));
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "코드그룹 전체조회", description = "코드그룹 전체조회")
    @PostMapping("/group")
    public ResponseEntity countCodeGroupsUserId(@RequestBody Group group){
        codeGroupInPort.createCodeGroup(group);
        return ResponseEntity.ok(group);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "코드그룹 수정", description = "코드그룹 수정")
    @PostMapping("/group/{id}")
    public ResponseEntity updateCodeGroup(@PathVariable String id, @RequestBody Group group){
        Group groupTemp = codeGroupInPort.getCodeGroup(id).orElse(null);
        groupTemp = groupTemp.updateGroup(group);
        if("Y".equals(groupTemp.getDelYn())){
            codeGroupInPort.deleteCodeGroup(groupTemp);
        }else{

            codeGroupInPort.updateCodeGroup(groupTemp);
        }
        return ResponseEntity.ok(groupTemp);
    }
}
