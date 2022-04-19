package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RequestAttachmentHistoryInPort {

    Optional<RequestAttachmentHistory> getRequestAttachmentHistory(String id);
    Page<RequestAttachmentHistory> getRequestAttachmentHistories(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Page<RequestAttachmentHistory> getRequestAttachmentHistories(String historyId, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Long countRequestAttachmentHistories(Map<String,String> keyParams, Map<String,String> searchParams);
    RequestAttachmentHistory createRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory);
    RequestAttachmentHistory updateRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory);
    RequestAttachmentHistory deleteRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory);
}
