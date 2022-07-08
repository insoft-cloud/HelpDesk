package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface RequestOutPort {
    Page<Request> getRequests(Page<Request> requests);
    Page<Request> getRequestsDate(Page<Request> requests);
    Optional<Request> getRequest(Optional<Request> request);

    Page<Request> getRequestPrcsSttsCd(Page<Request> requests);
    Page<Request> getRequestUserId(Page<Request> requests);
    Page<Request> getRequestChargeUserId(Page<Request> requests);
    Request createRequest(Request request);
    Request updateRequest(Request request);
}
