package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentHistoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestAttachmentHistoryAdapter implements RequestAttachmentHistoryOutPort {

    final RequestAttachmentHistoryRepo requestAttachmentHistoryRepo;

    @Override
    public List<RequestAttachmentHistory> getRequestAttachmentHistories() {
        return requestAttachmentHistoryRepo.findAll();
    }

    @Override
    public Optional<RequestAttachmentHistory> getRequestAttachmentId(String id) {
        return requestAttachmentHistoryRepo.findById(id);

    }
    @Override
    public List<RequestAttachmentHistory> getRequestAttachmentHistoriesReqId(String svcReqNo, Pageable pageable) {
        return (List<RequestAttachmentHistory>) requestAttachmentHistoryRepo.findAllBySvcReqNo(svcReqNo , pageable);
    }

    @Override
    public long countRequestAttachmentHistories() {
        return requestAttachmentHistoryRepo.count();
    }

    @Override
    public void createRequestAttachment(RequestAttachmentHistory requestAttachmentHistory) {
        requestAttachmentHistoryRepo.save(requestAttachmentHistory);
    }

    @Override
    public void updateRequestAttachment(RequestAttachmentHistory requestAttachmentHistory) {
        requestAttachmentHistoryRepo.save(requestAttachmentHistory);
    }

    @Override
    public void deleteRequestAttachment(RequestAttachmentHistory requestAttachmentHistory) {
        requestAttachmentHistoryRepo.delete(requestAttachmentHistory);
    }
}
