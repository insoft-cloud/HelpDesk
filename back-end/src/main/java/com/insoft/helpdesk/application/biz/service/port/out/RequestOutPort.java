package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.time.LocalDateTime;
import java.util.Optional;

public interface RequestOutPort {
    Page<Request> getRequests(Pageable pageable);
    Long getRequestsCount();
    Page<Request> getRequests(String userId, Pageable pageable);
    Long getRequestsCount(String userId);
    Page<Request> getRequestsDate(String userId, LocalDateTime start,LocalDateTime end, Pageable pageable);
    Optional<Request> getRequest(String id);
    void createRequest(Request request);
    void updateRequest(Request request);
    void deleteRequest(Request request);
}
