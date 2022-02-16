package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestAttachmentHistoryService implements RequestAttachmentHistoryInPort {

    final RequestAttachmentHistoryOutPort requestAttachmentHistoryOutPort;

    @Override
    public Page<RequestAttachmentHistory> getRequestAttachmentHistories(Pageable pageable) {
        return requestAttachmentHistoryOutPort.getRequestAttachmentHistories(pageable);
    }

    @Override
    public Optional<RequestAttachmentHistory> getRequestAttachmentHistoryId(String id) {
        return requestAttachmentHistoryOutPort.getRequestAttachmentHistoryId(id);
    }

    @Override
    public Page<RequestAttachmentHistory> getRequestAttachmentHistoriesReqId(String svcReqNo, Pageable pageable) {
        return requestAttachmentHistoryOutPort.getRequestAttachmentHistoriesReqId(svcReqNo, pageable);
    }

    @Override
    public Page<RequestAttachmentHistory> getRequestAttachmentHistoriesReqHisId(String svcReqNo, Pageable pageable) {
        return requestAttachmentHistoryOutPort.getRequestAttachmentHistoriesReqHisId(svcReqNo, pageable);
    }

    @Override
    public long countRequestAttachmentHistories() {
        return requestAttachmentHistoryOutPort.countRequestAttachmentHistories();
    }

    @Override
    public void createRequestAttachment(RequestAttachmentHistory requestAttachmentHistory) {
        requestAttachmentHistoryOutPort.createRequestAttachment(requestAttachmentHistory);
    }

    @Override
    public void updateRequestAttachment(RequestAttachmentHistory requestAttachmentHistory) {
        requestAttachmentHistoryOutPort.updateRequestAttachment(requestAttachmentHistory);
    }

    @Override
    public void deleteRequestAttachment(RequestAttachmentHistory requestAttachmentHistory) {
        requestAttachmentHistoryOutPort.deleteRequestAttachment(requestAttachmentHistory);
    }
}

