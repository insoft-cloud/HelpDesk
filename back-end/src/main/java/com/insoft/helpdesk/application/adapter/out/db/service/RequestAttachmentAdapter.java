package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestAttachmentAdapter implements RequestAttachmentOutPort {

    final RequestAttachmentRepo requestAttachmentRepo;


    @Override
    public Page<RequestAttachment> getRequestAttachment(Pageable pageable) {
        return requestAttachmentRepo.findAll(pageable);
    }

    @Override
    public Page<RequestAttachment> getRequestAttachmentsSvcReqNo(String svcReqNo, Pageable pageable) {
        return requestAttachmentRepo.findAllBySvcReqNo(svcReqNo, pageable);
    }

    @Override
    public Optional<RequestAttachment> getRequestAttachmentId(String id) {
        return requestAttachmentRepo.findById(id);
    }

    @Override
    public long countRequestAttachments() {
        return requestAttachmentRepo.count();
    }

    @Override
    public long countRequestAttachments(String svcReqNo) {
        return requestAttachmentRepo.countAllBySvcReqNo(svcReqNo);
    }

    @Override
    public void createRequestAttachment(RequestAttachment requestAttachment) {
        requestAttachmentRepo.save(requestAttachment);
    }

    @Override
    public void updateRequestAttachment(RequestAttachment requestAttachment) {
        requestAttachmentRepo.save(requestAttachment);
    }

    @Override
    public void deleteRequestAttachment(RequestAttachment requestAttachment) {
        requestAttachmentRepo.delete(requestAttachment);
    }
}
