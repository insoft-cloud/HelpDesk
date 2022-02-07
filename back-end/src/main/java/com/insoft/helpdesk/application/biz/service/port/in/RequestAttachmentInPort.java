package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RequestAttachmentInPort {

    Page<RequestAttachment> getRequestAttachments(Pageable pageable);
    Optional<RequestAttachment> getRequestAttachmentId(String id);
    Page<RequestAttachment> getRequestAttachmentsSvcReqNo(String SvcReqNo, Pageable pageable);
    long countRequestAttachments();
    long countRequestAttachments(String reqId);
    void createRequestAttachment(RequestAttachment requestAttachment);
    void updateRequestAttachment(RequestAttachment requestAttachment);
    void deleteRequestAttachment(RequestAttachment requestAttachment);
}
