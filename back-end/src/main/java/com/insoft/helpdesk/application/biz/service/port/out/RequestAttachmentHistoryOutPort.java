package com.insoft.helpdesk.application.biz.service.port.out;


import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Page;
import java.util.Optional;

public interface RequestAttachmentHistoryOutPort {

    Optional<RequestAttachmentHistory> getRequestAttachmentHistory(Optional<RequestAttachmentHistory> requestAttachmentHistory);
    Page<RequestAttachmentHistory> getRequestAttachmentHistories(Page<RequestAttachmentHistory> requestAttachmentHistories);
    Long countRequestAttachmentHistories(Long count);
    RequestAttachmentHistory createRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory);
    RequestAttachmentHistory updateRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory);
    RequestAttachmentHistory deleteRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory);
}
