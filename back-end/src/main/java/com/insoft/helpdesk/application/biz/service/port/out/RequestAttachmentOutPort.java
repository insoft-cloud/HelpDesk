package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RequestAttachmentOutPort {
    Page<RequestAttachment> getRequestAttachment(Pageable pageable);
    Page<RequestAttachment> getRequestAttachmentsSvcReqNo(String SvcReqNo, Pageable pageable);
    Optional<RequestAttachment> getRequestAttachmentId(String id);
    long countRequestAttachments();
    long countRequestAttachments(String reqId);
    void createRequestAttachment(RequestAttachment requestAttachment);
    void updateRequestAttachment(RequestAttachment requestAttachment);
    void deleteRequestAttachment(RequestAttachment requestAttachment);
}
