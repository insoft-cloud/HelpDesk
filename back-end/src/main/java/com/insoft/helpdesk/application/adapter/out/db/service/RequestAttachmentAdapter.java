package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestAttachmentAdapter implements RequestAttachmentOutPort {

    @Override
    public Page<RequestAttachment> getRequestAttachments(Page<RequestAttachment> requestAttachments) {
        return requestAttachments;
    }

    @Override
    public Optional<RequestAttachment> getRequestAttachment(Optional<RequestAttachment> requestAttachment) {
        return requestAttachment;
    }

    @Override
    public Long countRequestAttachments(Long count) {
        return count;
    }

    @Override
    public RequestAttachment createRequestAttachment(RequestAttachment requestAttachment) {
        return requestAttachment;
    }

    @Override
    public RequestAttachment updateRequestAttachment(RequestAttachment requestAttachment) {
        return requestAttachment;
    }

    @Override
    public RequestAttachment deleteRequestAttachment(RequestAttachment requestAttachment) {
        return requestAttachment;
    }
}
