package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RequestInPort {
    List<Request> getRequests();
    Long getRequestsCount();
    List<Request> getRequests(String userId);
    List<Request> getRequests(String userId, Pageable pageable);
    Long getRequestsCount(String userId);
    Optional<Request> getRequest(String id);
    void createRequest(Request request);
    void updateRequest(Request request);
    void deleteRequest(Request request);

}

