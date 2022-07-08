package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface RequestChargeOutPort {

    Page<RequestCharge> getRequestCharges(Page<RequestCharge> requestCharge);
    List<String> getRequestChargeList(List<String> requestChargeList);
    Long getRequestChargesCount(Long count);
    Optional<RequestCharge> getRequestCharge(Optional<RequestCharge> requestCharge);
    RequestCharge createRequestCharge(RequestCharge requestHistory);
    RequestCharge updateRequestCharge(RequestCharge requestHistory);
    RequestCharge deleteRequestCharge(RequestCharge requestHistory);

}
