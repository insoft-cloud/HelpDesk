package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestHistoryService implements RequestHistoryInPort {

    RequestHistoryOutPort requestHistoryOutPort;

    @Override
    public Page<RequestHistory> getRequestHistories(Pageable pageable) {
        return requestHistoryOutPort.getRequestHistories(pageable);
    }

    @Override
    public Long getRequestsCount() {
        return requestHistoryOutPort.getRequestsCount();
    }

    @Override
    public Page<RequestHistory> getRequestHistories(String userId, Pageable pageable) {
        return requestHistoryOutPort.getRequestHistories(userId,pageable);
    }

    @Override
    public Long getRequestsCount(String userId) {
        return requestHistoryOutPort.getRequestsCount(userId);
    }

    @Override
    public Optional<RequestHistory> getRequestHistory(String id) {
        return requestHistoryOutPort.getRequestHistory(id);
    }

    @Override
    public void createRequestHistory(RequestHistory requestHistory) {
        requestHistoryOutPort.createRequestHistory(requestHistory);
    }

    @Override
    public void updateRequestHistory(RequestHistory requestHistory) {
        requestHistoryOutPort.updateRequestHistory(requestHistory);
    }

    @Override
    public void deleteRequestHistory(RequestHistory requestHistory) {
        requestHistoryOutPort.deleteRequestHistory(requestHistory);
    }
}
