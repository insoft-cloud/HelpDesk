package com.insoft.helpdesk.application.adapter.in.controller.code;


import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.util.annotation.HelpDeskAdminRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "CodeGroup", description = "코드 그룹 API")
@HelpDeskAdminRestController
@RequiredArgsConstructor
public class CodeGroupController {

    private final CodeGroupInPort codeGroupInPort;
    private final CodeDetailInPort codeDetailInPort;

    @Tag(name = "CodeGroup")
    @Operation(summary  = "코드 그룹 리스트 조회", description  = "코드 그룹 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/group/{id}")
    public ResponseEntity getCodeGroups(@PathVariable String id){
        return ResponseEntity.ok(codeGroupInPort.getCodeGroup(id));
    }

    @Tag(name = "CodeGroup")
    @Operation(summary  = "코드 그룹 리스트 조회", description  = "코드 그룹 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/groups")
    public ResponseEntity getCodeGroups(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return ResponseEntity.ok(codeGroupInPort.getCodeGroups(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams), pageable));
    }

    @Tag(name = "CodeGroup")
    @GetMapping("/groups/count")
    public ResponseEntity countCodeGroups(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return ResponseEntity.ok(codeGroupInPort.countCodeGroups(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams)));
    }

    @Tag(name = "CodeGroup")
    @PostMapping("/group")
    public ResponseEntity countCodeGroupsUserId(@RequestBody Group group){
        codeGroupInPort.createCodeGroup(group);
        return ResponseEntity.ok(group);
    }

    @Tag(name = "CodeGroup")
    @PostMapping("/group/{id}")
    public ResponseEntity updateCodeGroup(@PathVariable String id, @RequestBody Group group){
        Group _group = codeGroupInPort.getCodeGroup(id).orElse(null);
        _group = _group.updateGroup(group);
        if(_group.getDelYn().equals("Y")){
            codeGroupInPort.deleteCodeGroup(_group);
        }else{

            codeGroupInPort.updateCodeGroup(_group);
        }
        return ResponseEntity.ok(_group);
    }
//
//    @Tag(name = "CodeGroup")
//    @DeleteMapping("/group/{id}")
//    public ResponseEntity deleteCodeGroup(@PathVariable String id){
//        Group _group = codeGroupInPort.getCodeGroup(id).orElse(null);
//        if(_group == null){
//            return ResponseEntity.badRequest().build();
//        }
//        codeGroupInPort.deleteCodeGroup(_group);
//        return ResponseEntity.ok(_group);
//    }


}
