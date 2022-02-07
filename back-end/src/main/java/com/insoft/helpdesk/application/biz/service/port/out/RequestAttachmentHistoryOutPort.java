package com.insoft.helpdesk.application.biz.service.port.out;


import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RequestAttachmentHistoryOutPort {

    List<RequestAttachmentHistory> getRequestAttachmentHistories();
    Optional<RequestAttachmentHistory> getRequestAttachmentId(String id);
    List<RequestAttachmentHistory> getRequestAttachmentHistoriesReqId(String svcReqNo, Pageable pageable);
    long countRequestAttachmentHistories();
    void createRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
    void updateRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
    void deleteRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
}
