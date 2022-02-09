package com.insoft.helpdesk.application.adapter.in.controller.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Tag(name = "Request", description = "서비스 요청 API")
@HelpdeskRestController
@RequiredArgsConstructor
public class RequestController {

    final RequestInPort requestInPort;

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{id}")
    public ResponseEntity getRequest(@PathVariable String id){
        Request request = requestInPort.getRequest(id).orElseThrow(null);
        return ResponseEntity.ok(request);
    }

    @Tag(name = "Request")
    @Operation(summary  = "요청 날짜별 조회", description  = "요청 날짜별 조회")
    @GetMapping("/service/requests/{userId}")
    public ResponseEntity getRequestsDate(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "now")String day, Pageable pageable){
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0));
        switch (day){
            case "week" : startDatetime = LocalDateTime.of(LocalDate.now().minusWeeks(1), LocalTime.of(0,0,0)); break;
            case "month" : startDatetime = LocalDateTime.of(LocalDate.now().minusMonths(1), LocalTime.of(0,0,0)); break;
            case "all" : startDatetime = LocalDateTime.of(LocalDate.of(0000,1,1), LocalTime.of(0,0,0)); break;
        }
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));
        return ResponseEntity.ok(requestInPort.getRequestsDate(userId, startDatetime, endDatetime, pageable));
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
    @PatchMapping("/service/request/{id}")
    public ResponseEntity updateRequest(@PathVariable String id, @RequestBody Request request){
        Request _request = requestInPort.getRequest(id).orElseThrow(null);
        _request = _request.updateRequest(request);
        requestInPort.updateRequest(_request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 삭제", description  = "해당 유저의 리퀘스트 삭제")
    @DeleteMapping("/service/request/{id}")
    public ResponseEntity deleteRequest(@PathVariable String id){
        Request request = requestInPort.getRequest(id).orElseThrow(null);
        requestInPort.deleteRequest(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

}
