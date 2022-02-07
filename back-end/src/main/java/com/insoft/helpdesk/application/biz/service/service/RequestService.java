package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class
RequestService implements RequestInPort {

    final RequestOutPort requestOutPort;

    @Override
    public Page<Request> getRequests(Pageable pageable) {
        return requestOutPort.getRequests(pageable);
    }

    @Override
    public Long getRequestsCount() {
        return requestOutPort.getRequestsCount();
    }

    @Override
    public Page<Request> getRequests(String userId, Pageable pageable) {
        return requestOutPort.getRequests(userId, pageable);
    }

    @Override
    public Long getRequestsCount(String userId) {
        return requestOutPort.getRequestsCount(userId);
    }

    @Override
    public Optional<Request> getRequest(String id) {
        return requestOutPort.getRequest(id);
    }

    @Override
    public void createRequest(Request request) {
        requestOutPort.createRequest(request);
    }

    @Override
    public void updateRequest(Request request) {
        requestOutPort.updateRequest(request);
    }

    @Override
    public void deleteRequest(Request request) {
        requestOutPort.deleteRequest(request);
    }
}
