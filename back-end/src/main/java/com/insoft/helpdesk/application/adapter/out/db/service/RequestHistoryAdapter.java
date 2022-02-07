package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestHistoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestHistoryAdapter implements RequestHistoryOutPort {

    final RequestHistoryRepo requestHistoryRepo;

    @Override
    public Page<RequestHistory> getRequestHistories(Pageable pageable) {
        return requestHistoryRepo.findAll(pageable);
    }

    @Override
    public Long getRequestsCount() {
        return null;
    }

    @Override
    public Page<RequestHistory> getRequestHistories(String userId, Pageable pageable) {
        return requestHistoryRepo.findAllByUserId(userId,pageable);
    }

    @Override
    public Long getRequestsCount(String userId) {
        return requestHistoryRepo.countAllByUserId(userId);
    }

    @Override
    public Optional<RequestHistory> getRequestHistory(String id) {
        return Optional.empty();
    }

    @Override
    public void createRequestHistory(RequestHistory requestHistory) {

    }

    @Override
    public void updateRequestHistory(RequestHistory requestHistory) {

    }

    @Override
    public void deleteRequestHistory(RequestHistory requestHistory) {

    }
}
