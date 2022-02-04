package com.insoft.helpdesk.application.adapter.in.controller.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.domain.entity.response.service.RequestResponse;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




@Tag(name = "Request", description = "서비스 요청 API")
@HelpdeskRestController
@RequiredArgsConstructor
public class ServiceController {

    final RequestInPort requestInPort;

    @Tag(name = "Request")
    @Operation(summary  = "요청 조회", description  = "요청 정보 조회")
    @GetMapping("/service/requests/{userId}")
    public ResponseEntity getRequests(@PathVariable String userId, Pageable pageable){
        return ResponseEntity.ok(RequestResponse.builder()
                .requestList(requestInPort.getRequests(userId, pageable))
                .count(requestInPort.getRequestsCount(userId))
                .build());
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{id}")
    public ResponseEntity getRequest(@PathVariable String id){
        Request request = requestInPort.getRequest(id).orElseThrow(null);
        return ResponseEntity.ok(request);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 생성", description  = "해당 유저의 리퀘스트 생성")
    @PostMapping("/service/request")
    public ResponseEntity createRequest(@RequestBody Request request){
        requestInPort.createRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 수정", description  = "해당 유저의 리퀘스트 수정")
    @PatchMapping("/service/request")
    public ResponseEntity updateRequest(@RequestBody Request request){
        requestInPort.updateRequest(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 삭제", description  = "해당 유저의 리퀘스트 삭제")
    @DeleteMapping("/service/request")
    public ResponseEntity deleteRequest(@RequestBody Request request){
        requestInPort.deleteRequest(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }
}
