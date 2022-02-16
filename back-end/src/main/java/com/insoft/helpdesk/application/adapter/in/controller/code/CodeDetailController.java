package com.insoft.helpdesk.application.adapter.in.controller.code;


import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
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

    @Tag(name = "CodeDetail")
    @GetMapping("/details")
    public ResponseEntity getDetails(Pageable pageable){
        return ResponseEntity.ok(codeDetailInPort.getDetails(pageable));
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/details/{groupId}")
    public ResponseEntity getDetailsGroupId(@PathVariable String groupId, Pageable pageable){
        return ResponseEntity.ok(codeDetailInPort.getDetailsGroupId(groupId, pageable));
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/detail/{id}")
    public ResponseEntity selectCodeGroups(@PathVariable String id){
        return ResponseEntity.ok(codeDetailInPort.getDetail(id).orElse(null));
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/details-count")
    public ResponseEntity getDetailsCount(){
        return ResponseEntity.ok(codeDetailInPort.getDetailsCount());
    }

    @Tag(name = "CodeDetail")
    @GetMapping("/details-count/{groupId}")
    public ResponseEntity getDetailsGroupIdCount(@PathVariable String groupId){
        return ResponseEntity.ok(codeDetailInPort.getDetailsGroupIdCount(groupId));
    }

    @Tag(name = "CodeDetail")
    @PostMapping("/detail")
    public ResponseEntity createRequest(@RequestBody Detail detail){
        codeDetailInPort.createRequest(detail);
        return ResponseEntity.ok(null);
    }

    @Tag(name = "CodeDetail")
    @PatchMapping("/detail")
    public ResponseEntity updateRequest(@RequestBody Detail detail){
        codeDetailInPort.updateRequest(detail);
        return ResponseEntity.ok(null);
    }

    @Tag(name = "CodeDetail")
    @DeleteMapping("/detail/{id}")
    public ResponseEntity deleteRequest(@PathVariable String id){
        Detail detail = codeDetailInPort.getDetail(id).orElse(null);
        if(detail == null){
            return ResponseEntity.badRequest().build();
        }
        codeDetailInPort.deleteRequest(detail);
        return ResponseEntity.ok(null);
    }
}
