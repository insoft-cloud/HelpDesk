package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestAttachmentHistoryAdapter implements RequestAttachmentHistoryOutPort {


    @Override
    public Optional<RequestAttachmentHistory> getRequestAttachmentHistory(Optional<RequestAttachmentHistory> requestAttachmentHistory) {
        return requestAttachmentHistory;
    }

    @Override
    public Page<RequestAttachmentHistory> getRequestAttachmentHistories(Page<RequestAttachmentHistory> requestAttachmentHistories) {
        return requestAttachmentHistories;
    }

    @Override
    public Long countRequestAttachmentHistories(Long count) {
        return count;
    }

    @Override
    public RequestAttachmentHistory createRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory) {
        return requestAttachmentHistory;
    }

    @Override
    public RequestAttachmentHistory updateRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory) {
        return requestAttachmentHistory;
    }

    @Override
    public RequestAttachmentHistory deleteRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory) {
        return requestAttachmentHistory;
    }
}
