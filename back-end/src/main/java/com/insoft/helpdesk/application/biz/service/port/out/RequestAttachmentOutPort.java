package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;

import java.util.List;
import java.util.Optional;

public interface RequestAttachmentOutPort {
    List<RequestAttachment> getRequestAttachment();
    List<RequestAttachment> getRequestAttachment(String reqId);
    Optional<RequestAttachment> getRequestAttachmentId(String id);
    long countRequestAttachments();
    long countRequestAttachments(String reqId);
    void createRequestAttachment(RequestAttachment requestAttachment);
    void updateRequestAttachment(RequestAttachment requestAttachment);
    void deleteRequestAttachment(RequestAttachment requestAttachment);
    List<Request> getRequest();
}
