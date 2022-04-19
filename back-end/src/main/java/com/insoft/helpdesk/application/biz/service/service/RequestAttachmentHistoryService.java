package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestAttachmentHistoryOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentHistoryRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestAttachmentHistoryService implements RequestAttachmentHistoryInPort {

    final RequestAttachmentHistoryOutPort requestAttachmentHistoryOutPort;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    final RequestAttachmentHistoryRepo historyRepo;

    @Override
    public Optional<RequestAttachmentHistory> getRequestAttachmentHistory(String id) {
        return requestAttachmentHistoryOutPort.getRequestAttachmentHistory(historyRepo.findById(id));
    }

    @Override
    public Page<RequestAttachmentHistory> getRequestAttachmentHistories(Map<String, String> keyParams, Map<String, String> searchParams, Pageable pageable) {
        return requestAttachmentHistoryOutPort.getRequestAttachmentHistories(historyRepo.findAll(helpDeskSearchExecutor.Search(searchParams,keyParams),pageable));
    }

    @Override
    public Page<RequestAttachmentHistory> getRequestAttachmentHistories(String historyId, Map<String, String> keyParams, Map<String, String> searchParams, Pageable pageable) {
        return requestAttachmentHistoryOutPort.getRequestAttachmentHistories(historyRepo.findAll(helpDeskSearchExecutor.Search(searchParams,keyParams, RequestHistory.class, historyId, "svcReqHistNo", "id"),pageable));
    }

    @Override
    public Long countRequestAttachmentHistories(Map<String, String> keyParams, Map<String, String> searchParams) {
        return requestAttachmentHistoryOutPort.countRequestAttachmentHistories(historyRepo.count(helpDeskSearchExecutor.Search(searchParams,keyParams)));
    }

    @Override
    public RequestAttachmentHistory createRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory) {
        return requestAttachmentHistoryOutPort.createRequestAttachmentHistory(historyRepo.save(requestAttachmentHistory));
    }

    @Override
    public RequestAttachmentHistory updateRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory) {
        return requestAttachmentHistoryOutPort.updateRequestAttachmentHistory(historyRepo.save(requestAttachmentHistory));
    }

    @Override
    public RequestAttachmentHistory deleteRequestAttachmentHistory(RequestAttachmentHistory requestAttachmentHistory) {
        historyRepo.delete(requestAttachmentHistory);
        return requestAttachmentHistoryOutPort.deleteRequestAttachmentHistory(requestAttachmentHistory);
    }
}

