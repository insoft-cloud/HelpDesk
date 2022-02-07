package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestAttachmentService implements RequestAttachmentInPort {

    final RequestAttachmentOutPort requestAttachmentOutPort;

    @Override
    public Page<RequestAttachment> getRequestAttachments(Pageable pageable) {
        return requestAttachmentOutPort.getRequestAttachment(pageable);
    }

    @Override
    public Optional<RequestAttachment> getRequestAttachmentId(String id) {
        return requestAttachmentOutPort.getRequestAttachmentId(id);
    }

    @Override
    public Page<RequestAttachment> getRequestAttachmentsSvcReqNo(String svcReqNo, Pageable pageable) {
        return requestAttachmentOutPort.getRequestAttachmentsSvcReqNo(svcReqNo, pageable);
    }

    @Override
    public long countRequestAttachments() {
        return requestAttachmentOutPort.countRequestAttachments();
    }

    @Override
    public long countRequestAttachments(String reqId) {
        return requestAttachmentOutPort.countRequestAttachments(reqId);
    }

    @Override
    public void createRequestAttachment(RequestAttachment requestAttachment) {
        requestAttachmentOutPort.createRequestAttachment(requestAttachment);
    }

    @Override
    public void updateRequestAttachment(RequestAttachment requestAttachment) {
        requestAttachmentOutPort.updateRequestAttachment(requestAttachment);
    }

    @Override
    public void deleteRequestAttachment(RequestAttachment requestAttachment) {
        requestAttachmentOutPort.deleteRequestAttachment(requestAttachment);
    }

}