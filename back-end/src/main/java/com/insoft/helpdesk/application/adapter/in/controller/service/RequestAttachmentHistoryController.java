package com.insoft.helpdesk.application.adapter.in.controller.service;


import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentHistoryInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@HelpdeskRestController
@RequiredArgsConstructor
public class RequestAttachmentHistoryController {

    final RequestAttachmentHistoryInPort requestAttachmentHistoryInPort;

    @GetMapping("/service/req-attach-history/{id}")
    public ResponseEntity getRequestAttachment(@PathVariable String id) {
        return ResponseEntity.ok(requestAttachmentHistoryInPort.getRequestAttachmentHistoryId(id).orElseThrow(null));
    }


    @GetMapping("/service/req-attaches-histories/{id}")
    public ResponseEntity getRequestAttachmentReqId(@PathVariable String id, Pageable pageable) {
        return ResponseEntity.ok(requestAttachmentHistoryInPort.getRequestAttachmentHistoriesReqId(id, pageable));
    }


    @GetMapping("/service/req-attaches-histories/{id}/history")
    public ResponseEntity getRequestAttachmentHistoryId(@PathVariable String id, Pageable pageable) {
        return ResponseEntity.ok(requestAttachmentHistoryInPort.getRequestAttachmentHistoriesReqHisId(id, pageable));
    }

    @PostMapping("/service/req-attach-history")
    public ResponseEntity createRequestAttachmentHistory(@RequestBody RequestAttachmentHistory requestAttachmentHistory) {
        requestAttachmentHistoryInPort.createRequestAttachment(requestAttachmentHistory);
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/service/req-attach-history/{id}")
    public ResponseEntity updateRequestAttachmentHistory(@PathVariable String id, @RequestBody RequestAttachmentHistory requestAttachmentHistory) {
        RequestAttachmentHistory _request = requestAttachmentHistoryInPort.getRequestAttachmentHistoryId(id).orElseThrow(null);
        _request = _request.update(requestAttachmentHistory);
        requestAttachmentHistoryInPort.updateRequestAttachment(_request);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/service/req-attach-history/{id}")
    public ResponseEntity deleteRequestAttachmentHistory(@PathVariable String id) {
        requestAttachmentHistoryInPort.deleteRequestAttachment(requestAttachmentHistoryInPort.getRequestAttachmentHistoryId(id).orElseThrow(null));
        return ResponseEntity.ok(null);
    }
}
