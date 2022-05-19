package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface RequestChargeRepo extends JpaRepository<RequestCharge, String>, JpaSpecificationExecutor<RequestCharge> {

    List<RequestCharge> findBySvcReqNoAndDelYn(Request request, Boolean yn);

    boolean existsByUserIdAndSvcReqNo(String userId, Request req);

}
