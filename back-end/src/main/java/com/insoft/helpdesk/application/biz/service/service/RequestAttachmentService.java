package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RequestAttachmentService implements RequestAttachmentInPort {

    final RequestAttachmentOutPort requestAttachmentOutPort;

    final RequestAttachmentRepo requestAttachmentRepo;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;


    @Override
    public Page<RequestAttachment> getRequestAttachments(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable) {
        return requestAttachmentOutPort.getRequestAttachments(requestAttachmentRepo.findAll(helpDeskSearchExecutor.Search(searchParams, keyParams), pageable));
    }

    @Override
    public Page<RequestAttachment> getRequestAttachments(String reqId, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable) {
        return requestAttachmentOutPort.getRequestAttachments(requestAttachmentRepo.findAll(helpDeskSearchExecutor.Search(searchParams, keyParams, Request.class, reqId, "svcReqNo", "id"), pageable));
    }

    @Override
    public Optional<RequestAttachment> getRequestAttachment(String id) {
        return requestAttachmentOutPort.getRequestAttachment(requestAttachmentRepo.findById(id));
    }

    @Override
    public Long countRequestAttachments(Map<String,String> keyParams, Map<String,String> searchParams) {
        return requestAttachmentOutPort.countRequestAttachments(requestAttachmentRepo.count(helpDeskSearchExecutor.Search(searchParams, keyParams)));
    }

    @Override
    public Long countRequestAttachments(String reqId, Map<String,String> keyParams, Map<String,String> searchParams) {
        return requestAttachmentOutPort.countRequestAttachments(requestAttachmentRepo.count(helpDeskSearchExecutor.Search(searchParams, keyParams, Request.class, reqId, "svcReqNo", "id")));
    }

    @Override
    public RequestAttachment createRequestAttachment(RequestAttachment requestAttachment) {
        return requestAttachmentOutPort.createRequestAttachment(requestAttachmentRepo.save(requestAttachment));
    }

    @Override
    public RequestAttachment updateRequestAttachment(RequestAttachment requestAttachment) {
        return requestAttachmentOutPort.createRequestAttachment(requestAttachmentRepo.save(requestAttachment));
    }

    @Override
    public RequestAttachment deleteRequestAttachment(RequestAttachment requestAttachment) {
        requestAttachmentRepo.delete(requestAttachment);
        return requestAttachment;
    }
}