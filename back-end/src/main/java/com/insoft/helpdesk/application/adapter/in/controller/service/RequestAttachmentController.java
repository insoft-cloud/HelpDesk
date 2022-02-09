package com.insoft.helpdesk.application.adapter.in.controller.service;


import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Tag(name = "RequestAttachment", description = "요청 첨부 API")
@HelpdeskRestController
@RequiredArgsConstructor
public class RequestAttachmentController {
    final RequestAttachmentInPort requestAttachmentInPort;

    @Tag(name = "RequestAttachment")
    @Operation(summary  = "요청첨부 조회", description  = "요청첨부 정보 조회")
    @GetMapping("/service/req-attach/{id}")
    public ResponseEntity getRequestAttachment(@PathVariable String id){
        return ResponseEntity.ok(requestAttachmentInPort.getRequestAttachmentId(id).orElseThrow(null));
    }


    @Tag(name = "RequestAttachment")
    @Operation(summary  = "해당 유저의 요청첨부 리스트 조회", description  = "해당 유저의 요청첨부 리스트 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "ok", content = @Content(schema = @Schema(implementation = RequestAttachment.class)))
            })
    @ApiResponses(
            @io.swagger.annotations.ApiResponse(response = RequestAttachment.class, message = "ok", code = 200)
    )
    @GetMapping("/service/req-attaches/{reqId}")
    public ResponseEntity getRequestAttachmentReqId(@PathVariable String reqId, Pageable pageable){
        return ResponseEntity.ok(requestAttachmentInPort.getRequestAttachmentsSvcReqNo(reqId, pageable));
    }

    @Tag(name = "RequestAttachment")
    @PostMapping("/service/req-attache")
    public ResponseEntity createRequestAttachments(@RequestBody RequestAttachment requestAttachment){
        requestAttachmentInPort.createRequestAttachment(requestAttachment);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @Tag(name = "RequestAttachment")
    @PatchMapping("/service/req-attache/{id}")
    public ResponseEntity createRequestAttachments(@PathVariable String id, @RequestBody RequestAttachment requestAttachment){
        requestAttachmentInPort.updateRequestAttachment(requestAttachmentInPort.getRequestAttachmentId(id).orElseThrow(null).getRequestAttachment(requestAttachment));
        return ResponseEntity.ok(null);
    }

    @Tag(name = "RequestAttachment")
    @DeleteMapping("/service/req-attache/{id}")
    public ResponseEntity createRequestAttachments(@PathVariable String id){
        requestAttachmentInPort.deleteRequestAttachment(requestAttachmentInPort.getRequestAttachmentId(id).orElseThrow(null));
        return ResponseEntity.ok(null);
    }
}
