package com.insoft.helpdesk.application.adapter.in.controller.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Tag(name = "RequestHistory", description = "서비스 히스토리 API")
@HelpDeskRestController
@RequiredArgsConstructor
public class RequestHistoryController {

    final RequestHistoryInPort requestHistoryInPort;
    final RequestInPort requestInPort;

    final static String TAGNAME = "RequestHistory";
    final static String KEY = "key";
    final static String SEARCH = "search";

    @Tag(name = TAGNAME)
    @Operation(summary  = "해당 댓글 조회", description  = "해당 id의 댓글 조회")
    @GetMapping("/service/request/history/{id}")
    public RequestHistory getRequestHistory(@PathVariable String id){
        return requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "요청의 댓글 전체조회", description  = "해당 요청의 관한 댓글 전체조회")
    @GetMapping("/service/request/{id}/histories")
    public Page<RequestHistory> getRequestHistories(@PathVariable String id, @RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams, Pageable pageable){
        return requestHistoryInPort.getRequestHistories(id, HelpDeskMapperUtils.mapToJson(searchParams), HelpDeskMapperUtils.mapToJson(keyParams), pageable);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  ="요청의 댓글 수 카운트", description  = "해당 요청의 총 댓글 수")
    @GetMapping("/service/request/{id}/histories/count")
    public Long getRequestHistoriesCount(@PathVariable String id, @RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams){
        return requestHistoryInPort.getRequestsCount(id, HelpDeskMapperUtils.mapToJson(searchParams), HelpDeskMapperUtils.mapToJson(keyParams));
    }

    @Tag(name = "Request")
    @Operation(summary  = "댓글 생성", description  = "해당 요청에 댓글 생성")
    @PostMapping("/service/request/{id}/history")
    public RequestHistory createRequestHistory(@PathVariable String id, @RequestBody RequestHistory requestHistory){
        requestHistory.setSvcReqNo(requestInPort.getRequest(id).orElse(null));
        return requestHistoryInPort.createRequestHistory(requestHistory);
    }

    @Tag(name = "Request")
    @Operation(summary  = "댓글 수정", description  = "댓글 수정")
    @PostMapping("/service/request/history/{id}")
    public RequestHistory updateRequestHistory(@PathVariable String id, @RequestBody RequestHistory requestHistory){
        RequestHistory requestHistoryTemp = requestHistoryInPort.getRequestHistory(id).orElseThrow(null);
        requestHistoryTemp = requestHistoryTemp.updateRequestHistory(requestHistory);
        return requestHistoryInPort.updateRequestHistory(requestHistoryTemp);
    }

}
