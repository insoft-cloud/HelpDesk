package com.insoft.helpdesk.application.adapter.out.db.service;

import com.insoft.helpdesk.application.biz.service.port.out.RequestStatsOutPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RequestStatsAdapter implements RequestStatsOutPort {
    @Override
    public List<Map> getRequestTyCdCount(List<Map> requests ){ return  requests; }
    @Override
    public List<Map> getRequestSysCdCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestPrcsSttsCdCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestNumCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestCompleteTime(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestUserIdTyCdCount(List<Map> requests){return requests; }
    @Override
    public List<Map> getRequestUserIdSysCdCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestUserIdPrcsSttsCdCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestUserIdNumCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestUserIdCompleteTime(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestChargeIdTyCdCount(List<Map> requests){return requests; }
    @Override
    public List<Map> getRequestChargeIdSysCdCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestChargeIdPrcsSttsCdCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestChargeIdNumCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestChargeIdCompleteTime(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestReqIdPrcsSttsCdCount(List<Map> requests){return  requests; }
    @Override
    public List<Map> getRequestAll(List<Map> requests) {return requests; }
    @Override
    public List<Map> getRequestAllExcDate(List<Map> requests) {return requests;}
    @Override
    public List<Map> getRequestAllExcTyCd(List<Map> requests) {return requests;}
    @Override
    public List<Map> getRequestAllCount(List<Map> requests) {return  requests; }
}
