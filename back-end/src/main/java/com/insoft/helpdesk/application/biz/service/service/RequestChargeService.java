package com.insoft.helpdesk.application.biz.service.service;


import com.insoft.helpdesk.application.biz.service.port.in.RequestChargeInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestChargeOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestChargeRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestChargeService implements RequestChargeInPort {

    final RequestChargeRepo requestChargeRepo;

    final RequestChargeOutPort requestChargeOutPort;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    @Autowired
    private RequestRepo requestRepo;

    @Override
    public Page<RequestCharge> getRequestCharges(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable) {
        return requestChargeOutPort.getRequestCharges(requestChargeRepo.findAll(helpDeskSearchExecutor.search(searchParams, keyParams), pageable));
    }

    @Override
    public Page<RequestCharge> getRequestCharges(String requestId, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable) {
        return requestChargeOutPort.getRequestCharges(requestChargeRepo.findAll(helpDeskSearchExecutor.search(searchParams, keyParams,Request.class, requestId, "svcReqNo", "id"), pageable));
    }

    @Override
    public List<String> getRequestChargeList(String rqstId) {
        Request request = requestRepo.findById(rqstId).get();
        ArrayList<RequestCharge> requestCharges = (ArrayList<RequestCharge>) requestChargeRepo.findBySvcReqNoAndDelYn(request, false);
        ArrayList<String> requestChargeIdList = new ArrayList<>();
        for(RequestCharge i : requestCharges) {
            requestChargeIdList.add(i.getUserId());
        }
        return requestChargeOutPort.getRequestChargeList(requestChargeIdList);
    }

    @Override
    public Long getRequestChargesCount(Map<String,String> keyParams, Map<String,String> searchParams) {
        return requestChargeOutPort.getRequestChargesCount(requestChargeRepo.count(helpDeskSearchExecutor.search(searchParams, keyParams)));
    }

    @Override
    public Long getRequestChargesCount(String requestId, Map<String,String> keyParams, Map<String,String> searchParams) {
        return requestChargeOutPort.getRequestChargesCount(requestChargeRepo.count(helpDeskSearchExecutor.search(searchParams, keyParams,Request.class, requestId, "svcReqNo", "id")));
    }

    @Override
    public Optional<RequestCharge> getRequestCharge(String id) {
        return requestChargeOutPort.getRequestCharge(requestChargeRepo.findById(id));
    }

    @Override
    public RequestCharge createRequestCharge(RequestCharge requestCharge) {
        if(requestChargeRepo.existsByUserIdAndSvcReqNo(requestCharge.getUserId(), requestCharge.getSvcReqNo()))
        {
            return null;
        }
        return requestChargeOutPort.createRequestCharge(requestChargeRepo.save(requestCharge));
    }

    @Override
    public RequestCharge updateRequestCharge(RequestCharge requestCharge) {
        return requestChargeOutPort.updateRequestCharge(requestChargeRepo.save(requestCharge));
    }

    @Override
    public RequestCharge deleteRequestCharge(RequestCharge requestCharge) {
        requestChargeRepo.delete(requestCharge);
        return requestChargeOutPort.deleteRequestCharge(requestCharge);
    }
}
