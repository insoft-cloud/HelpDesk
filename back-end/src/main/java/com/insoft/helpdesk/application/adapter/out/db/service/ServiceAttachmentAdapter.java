package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentOutPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ServiceAttachmentAdapter implements RequestAttachmentOutPort {

    final RequestAttachmentRepo requestAttachmentRepo;


    @Override
    public List<RequestAttachment> getRequestAttachment() {
        return requestAttachmentRepo.findAll();
    }

    @Override
    public List<RequestAttachment> getRequestAttachment(String reqId) {
        return requestAttachmentRepo.findAllByReqId(reqId);
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
    public long countRequestAttachments(String reqId) {
        return requestAttachmentRepo.countReqId(reqId);
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
