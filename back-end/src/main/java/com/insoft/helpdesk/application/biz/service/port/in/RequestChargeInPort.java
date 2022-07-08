package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RequestChargeInPort {

    Page<RequestCharge> getRequestCharges(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Page<RequestCharge> getRequestCharges(String requestId, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    List<String> getRequestChargeList(String rqstId);

    Long getRequestChargesCount(Map<String,String> keyParams, Map<String,String> searchParams);
    Long getRequestChargesCount(String requestChargeId, Map<String,String> keyParams, Map<String,String> searchParams);

    Optional<RequestCharge> getRequestCharge(String id);

    RequestCharge createRequestCharge(RequestCharge requestHistory);
    RequestCharge updateRequestCharge(RequestCharge requestHistory);
    RequestCharge deleteRequestCharge(RequestCharge requestHistory);
}
