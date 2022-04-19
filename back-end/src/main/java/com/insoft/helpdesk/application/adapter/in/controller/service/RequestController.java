package com.insoft.helpdesk.application.adapter.in.controller.service;

import com.insoft.helpdesk.application.biz.common.port.out.CommonOutPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@Tag(name = "Request", description = "서비스 요청 API")
@HelpDeskRestController
@RequiredArgsConstructor
public class RequestController {

    final RequestInPort requestInPort;

    final CommonOutPort commonOutPort;

    final JwtTokenProvider jwtTokenProvider;

    final MemberRepo memberRepo;

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 상세 조회", description  = "해당 유저의 리퀘스트 상세 조회")
    @GetMapping("/service/request/{id}")
    public Request getRequest(@PathVariable String id){
        return requestInPort.getRequest(id).orElseThrow(null);
    }

    @Tag(name = "Request")
    @Operation(summary  = "전체 상태별 요청 정보 조회", description  = "전체 상태별 요청 정보 조회")
    @GetMapping("/service/requests/{userId}/{prcsSttsCd}/state")
    public Page<Request> getRequestsPrcsSttsCd(@PathVariable String userId, @PathVariable String prcsSttsCd, Pageable pageable, @RequestParam(value = "All", required = false, defaultValue = "Y") String all, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "day", required = false, defaultValue = "week")String day, @RequestParam(value = "search", required = false) String searchParam){
        return requestInPort.getRequestPrcsSttsCd(userId, prcsSttsCd, all, commonOutPort.startDataTime(day).toString().replace("T", " "), commonOutPort.endDataTime().toString().replace("T", " "), HelpDeskMapper.mapToJson(searchParam), pageable);
    }

    @Tag(name = "Request")
    @Operation(summary  = "서비스 전체 조회", description  = "서비스 전체 조회")
    @GetMapping("/service/requests/{userId}/serviceAll")
    public Page<Request> getRequestsDate(@PathVariable String userId, @RequestParam(value = "All", required = false, defaultValue = "Y") String all, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "day", required = false, defaultValue = "week")String day, @RequestParam(value = "search", required = false) String searchParam, Pageable pageable){
        return requestInPort.getRequestsDate(userId, all, commonOutPort.startDataTime(day).toString().replace("T", " "), commonOutPort.endDataTime().toString().replace("T", " "), HelpDeskMapper.mapToJson(searchParam), pageable);
    }
    
    @Tag(name = "Request")
    @Operation(summary  = "특정 상태(복수 조건)의 내 요청 조회", description  = "내가 요청한 건 중 특정 상태값들을 조회")
    @GetMapping("/service/requests/{userId}/prcsSttsCd")
    public Page<Request> getRequestsUserId(@PathVariable String userId, Pageable pageable, @RequestParam(name = "prcsSttsCdList", required = false) ArrayList<String> prcsSttsCdList){
        return requestInPort.getRequestUserId(userId, prcsSttsCdList, pageable);
    }

    @Tag(name = "Request")
    @Operation(summary  = "내 요청 정보 조회 ", description  = "내가 요청한 요청 정보 조회")
    @GetMapping("/service/requests/{userId}")
    public Page<Request> getRequestsUserId(@PathVariable String userId, Pageable pageable, @RequestParam(value = "day", required = false, defaultValue = "week")String day, @RequestParam(value = "search", required = false) String searchParam){
        return requestInPort.getRequestUserId(userId, commonOutPort.startDataTime(day).toString().replace("T", " "), commonOutPort.endDataTime().toString().replace("T", " "), HelpDeskMapper.mapToJson(searchParam), pageable);
    }

    @Tag(name = "Request")
    @Operation(summary  = "담당자별 요청 정보 조회", description  = "담당자별 요청 정보 조회")
    @GetMapping("/service/requests/{userId}/charges")
    public Page<Request> getRequestsChargeUserId(@PathVariable String userId, Pageable pageable, @RequestParam(value = "day", required = false, defaultValue = "week")String day, @RequestParam(value = "search", required = false) String searchParam){
        return requestInPort.getRequestChargeUserId(userId, commonOutPort.startDataTime(day).toString().replace("T", " "), commonOutPort.endDataTime().toString().replace("T", " "), HelpDeskMapper.mapToJson(searchParam), pageable);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 생성", description  = "해당 유저의 리퀘스트 생성")
    @PostMapping("/service/request")
    public Request createRequest(@RequestBody Request request){
        return requestInPort.createRequest(request);
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 수정", description  = "해당 유저의 리퀘스트 수정")
    @PostMapping("/service/request/{id}")
    public Request updateRequest(@PathVariable String id, @RequestBody Request request){
        Request _request = requestInPort.getRequest(id).orElseThrow(null);
        _request = _request.updateRequest(request);
        return requestInPort.updateRequest(_request);
    }


}
