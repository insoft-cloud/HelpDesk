package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RequestHistoryOutPort {

    Page<RequestHistory> getRequestHistories(Pageable pageable);
    Long getRequestsCount();
    Page<RequestHistory> getRequestHistories(String userId, Pageable pageable);
    Long getRequestsCount(String userId);
    Optional<RequestHistory> getRequestHistory(String id);
    void createRequest(RequestHistory requestHistory);
    void updateRequest(RequestHistory requestHistory);
    void deleteRequest(RequestHistory requestHistory);


}
