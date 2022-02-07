package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RequestAttachmentHistoryInPort {

    List<RequestAttachmentHistory> getRequestAttachmentHistories();
    Optional<RequestAttachmentHistory> getRequestAttachmentHistoryId(String id);
    List<RequestAttachmentHistory> getRequestAttachmentHistoriesReqId(String svcReqNo, Pageable pageable);
    long countRequestAttachmentHistories();
    void createRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
    void updateRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
    void deleteRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
}
