package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestHistoryAdapter implements RequestHistoryOutPort {


    @Override
    public Page<RequestHistory> getRequestHistories(Page<RequestHistory> requestHistories) {
        return requestHistories;
    }

    @Override
    public Long getRequestsCount(Long count) {
        return count;
    }

    @Override
    public Optional<RequestHistory> getRequestHistory(Optional<RequestHistory> requestHistory) {
        return requestHistory;
    }

    @Override
    public RequestHistory createRequestHistory(RequestHistory requestHistory) {
        return requestHistory;
    }

    @Override
    public RequestHistory updateRequestHistory(RequestHistory requestHistory) {
        return requestHistory;
    }

    @Override
    public RequestHistory deleteRequestHistory(RequestHistory requestHistory) {
        return requestHistory;
    }
}
