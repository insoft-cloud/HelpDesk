package com.insoft.helpdesk.application.biz.service.port.out;


import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RequestAttachmentHistoryOutPort {

    Page<RequestAttachmentHistory> getRequestAttachmentHistories(Pageable pageable);
    Optional<RequestAttachmentHistory> getRequestAttachmentHistoryId(String id);
    Page<RequestAttachmentHistory> getRequestAttachmentHistoriesReqId(String svcReqNo, Pageable pageable);
    Page<RequestAttachmentHistory> getRequestAttachmentHistoriesReqHisId(String svcReqNo, Pageable pageable);
    long countRequestAttachmentHistories();
    void createRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
    void updateRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
    void deleteRequestAttachment(RequestAttachmentHistory requestAttachmentHistory);
}
