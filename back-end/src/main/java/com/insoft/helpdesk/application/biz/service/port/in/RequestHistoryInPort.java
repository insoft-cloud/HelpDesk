package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Optional;

public interface RequestHistoryInPort {

    Page<RequestHistory> getRequestHistories(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Long getRequestsCount(Map<String,String> keyParams, Map<String,String> searchParams);
    Long getRequestsCount(String requestChargeId, Map<String,String> keyParams, Map<String,String> searchParams);
    Page<RequestHistory> getRequestHistories(String requestChargeId, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Optional<RequestHistory> getRequestHistory(String id);
    RequestHistory createRequestHistory(RequestHistory requestHistory);
    RequestHistory updateRequestHistory(RequestHistory requestHistory);
    RequestHistory deleteRequestHistory(RequestHistory requestHistory);
}
