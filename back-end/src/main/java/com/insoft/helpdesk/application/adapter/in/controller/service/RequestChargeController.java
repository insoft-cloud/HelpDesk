package com.insoft.helpdesk.application.adapter.in.controller.service;


import com.insoft.helpdesk.application.biz.service.port.in.RequestChargeInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.biz.service.service.RequestChargeService;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Tag(name = "RequestCharge", description = "서비스 요청 담당자 API")
@HelpDeskRestController
@RequiredArgsConstructor
public class RequestChargeController {

    final RequestChargeInPort requestChargeInPort;

    final RequestInPort requestInPort;

    @Autowired
    private RequestChargeService requestChargeService;

    @Tag(name = "RequestCharge")
    @GetMapping("/service/request/charge/{id}")
    public RequestCharge getRequestCharge(@PathVariable String id){
        return requestChargeInPort.getRequestCharge(id).orElseThrow(null);
    }

    @Tag(name = "RequestCharge")
    @GetMapping("/service/request/charges")
    public Page<RequestCharge> getRequest(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return requestChargeInPort.getRequestCharges(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams), pageable);
    }

    @Tag(name = "RequestCharge")
    @GetMapping("/service/request/{id}/charges")
    public Page<RequestCharge> getRequest(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return requestChargeInPort.getRequestCharges(id,HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams), pageable);
    }

    @Tag(name = "RequestCharge")
    @GetMapping("/service/request/charges/count")
    public Long getRequestChargesCount(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return requestChargeInPort.getRequestChargesCount(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams));
    }

    @Tag(name = "RequestCharge")
    @GetMapping("/service/request/{id}/charges/count")
    public Long getRequestChargesCount(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return requestChargeInPort.getRequestChargesCount(id,HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams));
    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 생성", description  = "해당 유저의 리퀘스트 생성")
    @PostMapping("/service/request/{id}/charge")
    public RequestCharge createRequestHistory(@PathVariable String id, @RequestBody RequestCharge requestCharge){
        requestCharge.setSvcReqNo(requestInPort.getRequest(id).orElse(null));
        return requestChargeInPort.createRequestCharge(requestCharge);

    }

    @Tag(name = "Request")
    @Operation(summary  = "해당 유저의 리퀘스트 수정", description  = "해당 유저의 리퀘스트 수정")
    @PostMapping("/service/request/charge/{id}")
    public RequestCharge updateRequestHistory(@PathVariable String id, @RequestBody RequestCharge requestCharge){
        RequestCharge _requestCharge = requestChargeInPort.getRequestCharge(id).orElseThrow(null);
        _requestCharge = _requestCharge.updateRequestCharge(requestCharge);
        return requestChargeInPort.updateRequestCharge(_requestCharge);
    }

    @Tag(name = "Request")
    @Operation(summary  = "요청 별 담당자 ID 목록 조회", description  = "해당 요청을 담당하고 있는 담당자의 ID 목록 조회")
    @GetMapping("/service/request/chargeList/{rqstId}")
    public ArrayList<String> getRequestChargeList(@PathVariable String rqstId) {
        return requestChargeService.getRequestChargeList(rqstId);
    }
}
