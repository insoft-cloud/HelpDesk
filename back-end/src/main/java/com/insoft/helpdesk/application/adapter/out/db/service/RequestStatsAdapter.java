package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestStatsOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RequestStatsAdapter implements RequestStatsOutPort {


    public List<Map> getRequestTyCdCount(List<Map> requests ){ return  requests; }
    public List<Map> getRequestSysCdCount(List<Map> requests){return  requests; }
    public List<Map> getRequestPrcsSttsCdCount(List<Map> requests){return  requests; }
    public List<Map> getRequestNumCount(List<Map> requests){return  requests; }

    public List<Map> getRequestUserIdTyCdCount(List<Map> requests){return requests; }
    public List<Map> getRequestUserIdSysCdCount(List<Map> requests){return  requests; }
    public List<Map> getRequestUserIdPrcsSttsCdCount(List<Map> requests){return  requests; }
    public List<Map> getRequestUserIdNumCount(List<Map> requests){return  requests; }

    public List<Map> getRequestChargeIdTyCdCount(List<Map> requests){return requests; }
    public List<Map> getRequestChargeIdSysCdCount(List<Map> requests){return  requests; }
    public List<Map> getRequestChargeIdPrcsSttsCdCount(List<Map> requests){return  requests; }
    public List<Map> getRequestChargeIdNumCount(List<Map> requests){return  requests; }

    public List<Map> getRequestReqIdPrcsSttsCdCount(List<Map> requests){return  requests; }


    public List<Map> getRequestAll(List<Map> requests) {return requests; }
    public List<Map> getRequestAllCount(List<Map> requests) {return  requests; }
}
