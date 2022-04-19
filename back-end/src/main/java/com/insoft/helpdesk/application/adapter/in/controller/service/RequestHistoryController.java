package com.insoft.helpdesk.application.adapter.in.controller.service;

import com.insoft.helpdesk.application.biz.member.port.in.LoginInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "RequestHistory", description = "서비스 히스토리 API")
@HelpDeskRestController
@RequiredArgsConstructor
public class RequestHistoryController {

    final RequestHistoryInPort requestHistoryInPort;
    final RequestInPort requestInPort;

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/history/{id}")
    public RequestHistory getRequestHistory(@PathVariable String id){
        return requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
    }

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/histories")
    public Page<RequestHistory> getRequestHistories(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return requestHistoryInPort.getRequestHistories(HelpDeskMapper.mapToJson(searchParams), HelpDeskMapper.mapToJson(keyParams), pageable);
    }

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{id}/histories")
    public Page<RequestHistory> getRequestHistories(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return requestHistoryInPort.getRequestHistories(id, HelpDeskMapper.mapToJson(searchParams), HelpDeskMapper.mapToJson(keyParams), pageable);
    }

    @Tag(name = "RequestHistory")
    @Operation(summary  = "해당 유저의 리퀘스트 조회", description  = "해당 유저의 리퀘스트 조회")
    @GetMapping("/service/request/{id}/histories/count")
    public Long getRequestHistoriesCount(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return requestHistoryInPort.getRequestsCount(id, HelpDeskMapper.mapToJson(searchParams), HelpDeskMapper.mapToJson(keyParams));
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 생성", description  = "해당 유저의 리퀘스트 생성")
    @PostMapping("/service/request/{id}/history")
    public RequestHistory createRequestHistory(@PathVariable String id, @RequestBody RequestHistory requestHistory){
        requestHistory.setSvcReqNo(requestInPort.getRequest(id).orElse(null));
        return requestHistoryInPort.createRequestHistory(requestHistory);

    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 수정", description  = "해당 유저의 리퀘스트 수정")
    @PostMapping("/service/request/history/{id}")
    public RequestHistory updateRequestHistory(@PathVariable String id, @RequestBody RequestHistory requestHistory){
        RequestHistory _requestHistory = requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
        _requestHistory = _requestHistory.updateRequestHistory(requestHistory);
        return requestHistoryInPort.updateRequestHistory(_requestHistory);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 삭제", description  = "해당 유저의 리퀘스트 삭제")
    @DeleteMapping("/service/request/history/{id}")
    public RequestHistory deleteRequestHistory(@PathVariable String id){
        RequestHistory requestHistory = requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
        return requestHistoryInPort.deleteRequestHistory(requestHistory);
    }
}
