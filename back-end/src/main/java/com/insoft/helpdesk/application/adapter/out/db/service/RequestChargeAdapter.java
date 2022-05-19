package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestChargeOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RequestChargeAdapter implements RequestChargeOutPort {

    @Override
    public Page<RequestCharge> getRequestCharges(Page<RequestCharge> requestCharge) {
        return requestCharge;
    }

    @Override
    public List<String> getRequestChargeList(List<String> requestChargeList) {
        return requestChargeList;
    }

    @Override
    public Long getRequestChargesCount(Long count) {
        return count;
    }

    @Override
    public Optional<RequestCharge> getRequestCharge(Optional<RequestCharge> requestCharge) {
        return requestCharge;
    }

    @Override
    public RequestCharge createRequestCharge(RequestCharge requestCharge) {
        return requestCharge;
    }

    @Override
    public RequestCharge updateRequestCharge(RequestCharge requestCharge) { return requestCharge;}

    @Override
    public RequestCharge deleteRequestCharge(RequestCharge requestCharge) {
        return requestCharge;
    }
}
