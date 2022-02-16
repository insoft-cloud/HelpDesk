package com.insoft.helpdesk.application.adapter.in.controller.code;


import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.util.annotation.HelpdeskAdminRestController;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "CodeGroup", description = "코드 그룹 API")
@HelpdeskAdminRestController
@RequiredArgsConstructor
public class CodeGroupController {

    private final CodeGroupInPort codeGroupInPort;

    @Tag(name = "CodeGroup")
    @Operation(summary  = "코드 그룹 리스트 조회", description  = "코드 그룹 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/groups")
    public ResponseEntity getCodeGroups(Pageable pageable){
        return ResponseEntity.ok(codeGroupInPort.getCodeGroups(pageable));
    }

    @Tag(name = "CodeGroup")
    @GetMapping("/groups/{userId}")
    public ResponseEntity getCodeGroupsUserId(@PathVariable String userId, Pageable pageable){
        return ResponseEntity.ok(codeGroupInPort.getCodeGroupsUserId(userId,pageable));
    }

    @Tag(name = "CodeGroup")
    @GetMapping("/groups-count")
    public ResponseEntity countCodeGroups(){
        return ResponseEntity.ok(codeGroupInPort.countCodeGroups());
    }

    @Tag(name = "CodeGroup")
    @GetMapping("/groups-count/{userId}")
    public ResponseEntity countCodeGroupsUserId(@PathVariable String userId){
        return ResponseEntity.ok(codeGroupInPort.countCodeGroupsUserId(userId));
    }

    @Tag(name = "CodeGroup")
    @PostMapping("/group")
    public ResponseEntity countCodeGroupsUserId(@RequestBody Group group){
        codeGroupInPort.createCodeGroup(group);
        return ResponseEntity.ok(null);
    }

    @Tag(name = "CodeGroup")
    @PatchMapping("/group/{id}")
    public ResponseEntity updateCodeGroup(@PathVariable String id, @RequestBody Group group){
        Group _group = codeGroupInPort.getCodeGroup(id).orElse(null);
        _group = _group.updateGroup(group);
        codeGroupInPort.updateCodeGroup(_group);
        return ResponseEntity.ok(null);
    }

    @Tag(name = "CodeGroup")
    @DeleteMapping("/group/{id}")
    public ResponseEntity deleteCodeGroup(@PathVariable String id){
        Group _group = codeGroupInPort.getCodeGroup(id).orElse(null);
        if(_group == null){
            return ResponseEntity.badRequest().build();
        }
        codeGroupInPort.deleteCodeGroup(_group);
        return ResponseEntity.ok(null);
    }


}
