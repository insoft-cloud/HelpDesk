package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestHistoryRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestHistoryService implements RequestHistoryInPort {

    final RequestHistoryOutPort requestHistoryOutPort;

    final RequestHistoryRepo requestHistoryRepo;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    @Override
    public Page<RequestHistory> getRequestHistories(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable) {
        return requestHistoryOutPort.getRequestHistories(requestHistoryRepo.findAll(helpDeskSearchExecutor.search(searchParams, keyParams), pageable));
    }

    @Override
    public Long getRequestsCount(Map<String,String> keyParams, Map<String,String> searchParams) {
        return requestHistoryOutPort.getRequestsCount(requestHistoryRepo.count(helpDeskSearchExecutor.search(searchParams, keyParams)));
    }

    @Override
    public Long getRequestsCount(String requestId, Map<String, String> keyParams, Map<String, String> searchParams) {
        return requestHistoryOutPort.getRequestsCount(requestHistoryRepo.count(helpDeskSearchExecutor.search(searchParams, keyParams, Request.class, requestId, "svcReqNo", "id")));
    }

    @Override
    public Page<RequestHistory> getRequestHistories(String requestId, Map<String,String> keyParams, Map<String,String> searchParams,  Pageable pageable) {
        return requestHistoryOutPort.getRequestHistories(requestHistoryRepo.findAll(helpDeskSearchExecutor.search(searchParams, keyParams, Request.class, requestId, "svcReqNo", "id"),pageable));
    }

    @Override
    public Optional<RequestHistory> getRequestHistory(String id) {
        return requestHistoryOutPort.getRequestHistory(requestHistoryRepo.findById(id));
    }

    @Override
    public RequestHistory createRequestHistory(RequestHistory requestHistory) {
        return requestHistoryOutPort.createRequestHistory(requestHistoryRepo.save(requestHistory));
    }

    @Override
    public RequestHistory updateRequestHistory(RequestHistory requestHistory) {
        return  requestHistoryOutPort.updateRequestHistory(requestHistoryRepo.save(requestHistory));
    }

    @Override
    public RequestHistory deleteRequestHistory(RequestHistory requestHistory) {
        requestHistoryRepo.delete(requestHistory);
        return  requestHistoryOutPort.deleteRequestHistory(requestHistory);
    }
}
