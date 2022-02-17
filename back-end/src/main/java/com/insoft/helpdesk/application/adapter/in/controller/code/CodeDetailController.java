package com.insoft.helpdesk.application.adapter.in.controller.code;


import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.util.annotation.HelpdeskAdminRestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "CodeDetail", description = "코드 상세 API")
@HelpdeskAdminRestController
@RequiredArgsConstructor
public class CodeDetailController {

    private final CodeDetailInPort codeDetailInPort;

    private final CodeGroupInPort codeGroupInPort;

    @Tag(name = "CodeDetail")
    @GetMapping("/group/{groupId}/details")
    public ResponseEntity getDetails(@PathVariable String groupId, Pageable pageable){
        return ResponseEntity.ok(codeDetailInPort.getDetailsGroupId(groupId,pageable));
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/group/{groupId}/detail/{detailId}")
    public ResponseEntity selectCodeGroups(@PathVariable String groupId, @PathVariable String detailId){
        return ResponseEntity.ok(codeDetailInPort.getDetail(groupId,detailId).orElse(null));
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/group/details/count")
    public ResponseEntity getDetailsCount(){
        return ResponseEntity.ok(codeDetailInPort.getDetailsCount());
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/group/{groupId}/details/count")
    public ResponseEntity getDetailsGroupIdCount(@PathVariable String groupId){
        return ResponseEntity.ok(codeDetailInPort.getDetailsGroupIdCount(groupId));
    }

    @Tag(name = "CodeDetail")
    @PostMapping("/group/{groupId}/detail")
    public ResponseEntity createDetail(@PathVariable String groupId, @RequestBody Detail detail){
        Group group = codeGroupInPort.getCodeGroup(groupId).orElse(null);
        if(group == null){
            return ResponseEntity.badRequest().build();
        }
        detail.setCdGroupNo(group);
        codeDetailInPort.createDetail(detail);
        return ResponseEntity.ok(detail);
    }

    @Tag(name = "CodeDetail")
    @PatchMapping("/group/{groupId}/detail/{detailId}")
    public ResponseEntity updateDetail(@PathVariable String groupId, @PathVariable String detailId,@RequestBody Detail detail){
        Detail _detail = codeDetailInPort.getDetail(groupId,detailId).orElse(null);
        if( _detail == null){
            return ResponseEntity.badRequest().build();
        }
        _detail.updateDetail(detail);
        codeDetailInPort.updateDetail(_detail);
        return ResponseEntity.ok(_detail);
    }

    @Tag(name = "CodeDetail")
    @DeleteMapping("/group/{groupId}/detail/{id}")
    public ResponseEntity deleteDetail(@PathVariable String groupId, @PathVariable String id){
        Detail detail = codeDetailInPort.getDetail(groupId,id).orElse(null);
        if(detail == null){
            return ResponseEntity.badRequest().build();
        }
        codeDetailInPort.deleteDetail(detail);
        return ResponseEntity.ok(detail);
    }
}
