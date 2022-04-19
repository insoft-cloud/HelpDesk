package com.insoft.helpdesk.application.biz.service.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

public interface RequestChargeOutPort {

    Page<RequestCharge> getRequestCharges(Page<RequestCharge> requestCharge);
    ArrayList<String> getRequestChargeList(ArrayList<String> requestChargeList);
    Long getRequestChargesCount(Long count);
    Optional<RequestCharge> getRequestCharge(Optional<RequestCharge> requestCharge);
    RequestCharge createRequestCharge(RequestCharge requestHistory);
    RequestCharge updateRequestCharge(RequestCharge requestHistory);
    RequestCharge deleteRequestCharge(RequestCharge requestHistory);

}
