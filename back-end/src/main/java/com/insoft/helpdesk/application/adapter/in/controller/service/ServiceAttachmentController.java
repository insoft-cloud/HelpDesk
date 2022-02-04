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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Tag(name = "Service", description = "서비스 API")
@HelpdeskRestController
@RequiredArgsConstructor
public class ServiceAttachmentController {
    final RequestAttachmentInPort requestAttachmentInPort;

    @Tag(name = "Service")
    @Operation(summary  = "요청첨부 조회", description  = "요청첨부 정보 조회")
    @GetMapping("/service/req-attach/{id}")
    public ResponseEntity getRequestAttachment(@PathVariable String id){
        Optional<RequestAttachment> requestAttachmentOptional = requestAttachmentInPort.getRequestAttachmentId(id);
        RequestAttachment requestAttachment = requestAttachmentOptional.orElseThrow(NoSuchElementException::new);
        return ResponseEntity.ok(requestAttachment);
    }


    @Tag(name = "Service")
    @Operation(summary  = "해당 유저의 요청첨부 리스트 조회", description  = "해당 유저의 요청첨부 리스트 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "ok", content = @Content(schema = @Schema(implementation = RequestAttachment.class)))
            })
    @ApiResponses(
            @io.swagger.annotations.ApiResponse(response = RequestAttachment.class, message = "ok", code = 200)
    )
    @GetMapping("/service/req-attachs/{reqId}")
    public ResponseEntity getRequestAttachmentReqId(@PathVariable String reqId){
        List<RequestAttachment> requestAttachments = requestAttachmentInPort.getRequestAttachmentsReqId(reqId);
        return ResponseEntity.ok(requestAttachments);
    }


    @Tag(name = "Service")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "ok", content = @Content(schema = @Schema(implementation = RequestAttachment.class)))
            })
    @ApiResponses(
            @io.swagger.annotations.ApiResponse(response = Request.class, message = "ok", code = 200)
    )
    @GetMapping("/service/requests")
    public ResponseEntity getRequests(){

        return ResponseEntity.ok(null);
    }
}
