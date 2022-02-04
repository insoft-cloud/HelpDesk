package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;

import java.util.List;
import java.util.Optional;

public interface RequestAttachmentInPort {

    List<RequestAttachment> getRequestAttachments();
    Optional<RequestAttachment> getRequestAttachmentId(String id);
    List<RequestAttachment> getRequestAttachmentsReqId(String reqId);
    long countRequestAttachments();
    void createRequestAttachment(RequestAttachment requestAttachment);
    void updateRequestAttachment(RequestAttachment requestAttachment);
    void deleteRequestAttachment(RequestAttachment requestAttachment);
    List<Request> getRequest();
}
