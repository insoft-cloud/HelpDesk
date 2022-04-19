package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RequestHistoryOutPort {

    Page<RequestHistory> getRequestHistories(Page<RequestHistory> requestHistories);
    Long getRequestsCount(Long count);
    Optional<RequestHistory> getRequestHistory(Optional<RequestHistory> requestHistory);
    RequestHistory createRequestHistory(RequestHistory requestHistory);
    RequestHistory updateRequestHistory(RequestHistory requestHistory);
    RequestHistory deleteRequestHistory(RequestHistory requestHistory);


}
