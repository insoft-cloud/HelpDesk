package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface RequestAttachmentOutPort {
    Page<RequestAttachment> getRequestAttachments(Page<RequestAttachment> requestAttachments);

    Optional<RequestAttachment> getRequestAttachment(Optional<RequestAttachment> requestAttachment);

    Long countRequestAttachments(Long count);

    RequestAttachment createRequestAttachment(RequestAttachment requestAttachment);
    RequestAttachment updateRequestAttachment(RequestAttachment requestAttachment);
    RequestAttachment deleteRequestAttachment(RequestAttachment requestAttachment);
}
