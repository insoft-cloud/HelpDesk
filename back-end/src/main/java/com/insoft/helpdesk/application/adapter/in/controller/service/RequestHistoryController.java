package com.insoft.helpdesk.application.adapter.in.controller.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestHistoryInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@Tag(name = "RequestHistory", description = "서비스 히스토리 API")
@HelpdeskRestController
@RequiredArgsConstructor
public class RequestHistoryController {

    RequestHistoryInPort requestHistoryInPort;

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{reqId}/history/{historyId}")
    public ResponseEntity getRequestHistory(@PathVariable String reqId, @PathVariable String id){
        RequestHistory requestHistory = requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
        return ResponseEntity.ok(requestHistory);
    }

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{reqId}/histories")
    public ResponseEntity getRequestHistoriesAll(Pageable pageable){
        return ResponseEntity.ok(requestHistoryInPort.getRequestHistories(pageable));
    }

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{reqId}/history/count")
    public ResponseEntity getRequestHistories(){
        return ResponseEntity.ok(requestHistoryInPort.getRequestsCount());
    }

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{reqId}/{userId}/history")
    public ResponseEntity getRequestHistories(@PathVariable String userId, Pageable pageable){
        return ResponseEntity.ok(requestHistoryInPort.getRequestHistories(userId, pageable));
    }

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{reqId}/{userId}/history/count")
    public ResponseEntity getRequestHistories(@PathVariable String userId){
        return ResponseEntity.ok(requestHistoryInPort.getRequestsCount(userId));
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 생성", description  = "해당 유저의 리퀘스트 생성")
    @PostMapping("/service/request/{reqId}/history")
    public ResponseEntity createRequestHistory(@RequestBody RequestHistory requestHistory){
        requestHistoryInPort.createRequestHistory(requestHistory);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 수정", description  = "해당 유저의 리퀘스트 수정")
    @PatchMapping("/service/request/{reqId}/history/{historyId}")
    public ResponseEntity updateRequestHistory(@PathVariable String id, @RequestBody RequestHistory requestHistory){
        RequestHistory _requestHistory = requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
        _requestHistory = _requestHistory.updateRequestHistory(requestHistory);
        requestHistoryInPort.updateRequestHistory(_requestHistory);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 삭제", description  = "해당 유저의 리퀘스트 삭제")
    @DeleteMapping("/service/request/{reqId}/history/{historyId}")
    public ResponseEntity deleteRequestHistory(@PathVariable String id){
        RequestHistory requestHistory = requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
        requestHistoryInPort.deleteRequestHistory(requestHistory);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }
}
