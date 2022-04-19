package com.insoft.helpdesk.application.adapter.out.db.service;


import com.insoft.helpdesk.application.biz.service.port.out.RequestOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestAdapter implements RequestOutPort {


    @Override
    public Page<Request> getRequests(Page<Request> requests) {
        return requests;
    }


    @Override
    public Page<Request> getRequestsDate(Page<Request> requests) {
        return requests;
    }


    @Override
    public Optional<Request> getRequest(Optional<Request> request) {
        return request;
    }

    @Override
    public Page<Request> getRequestPrcsSttsCd(Page<Request> requests) { return requests; }

    @Override
    public Page<Request> getRequestUserId(Page<Request> requests) {
        return requests;
    }

    @Override
    public Page<Request> getRequestChargeUserId(Page<Request> requests) {
        return requests;
    }

    @Override
    public Request createRequest(Request request) {
        return request;
    }

    @Override
    public Request updateRequest(Request request) {
        return request;
    }



}
