package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

public interface RequestInPort {
    Page<Request> getRequests(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Page<Request> getRequestsDate(String userId, String all, String startTime, String endTime, Map<String,String> searchParams, Pageable pageable);
    Optional<Request> getRequest(String id);
    Page<Request> getRequestUserId(String userId, ArrayList<String> prcsSttsCdList, Pageable pageable);
    Page<Request> getRequestPrcsSttsCd(String userId, String prcsSttsCd, String all, String startTime, String endTime, Map<String,String> searchParams, Pageable pageable);
    Page<Request> getRequestUserId(String userId, String startTime, String endTime, Map<String,String> searchParams, Pageable pageable);
    Page<Request> getRequestChargeUserId(String userId, String startTime, String endTime, Map<String,String> searchParams, Pageable pageable);
    Request createRequest(Request request);
    Request updateRequest(Request request);

}

