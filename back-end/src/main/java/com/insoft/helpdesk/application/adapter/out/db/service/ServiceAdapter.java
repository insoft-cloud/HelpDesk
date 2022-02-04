package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestRepo;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ServiceAdapter implements RequestOutPort {

    final RequestRepo requestRepo;

    @Override
    public List<Request> getRequests() {
        return requestRepo.findAll();
    }

    @Override
    public Long getRequestsCount() {
        return requestRepo.count();
    }

    @Override
    public List<Request> getRequests(String userId) {
        return requestRepo.findAllByReqId(userId);
    }

    @Override
    public List<Request> getRequests(String userId, Pageable pageable) {
        return requestRepo.findAllByReqId(userId, pageable);
    }

    @Override
    public Long getRequestsCount(String userId) {
        return requestRepo.countAllByReqId(userId);
    }

    @Override
    public Optional<Request> getRequest(String id) {
        return requestRepo.findById(id);
    }

    @Override
    public void createRequest(Request request) {
        requestRepo.save(request);
    }

    @Override
    public void updateRequest(Request request) {
        requestRepo.save(request);
    }

    @Override
    public void deleteRequest(Request request) {
        requestRepo.delete(request);
    }
}
