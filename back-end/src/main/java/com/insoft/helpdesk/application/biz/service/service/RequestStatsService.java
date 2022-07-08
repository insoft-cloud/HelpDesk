package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestStatsInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestStatsOutPort;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestStatsRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class RequestStatsService implements RequestStatsInPort {

    @PersistenceContext
    private EntityManager em;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;
    final RequestStatsOutPort requestStatsOutPort;
    final RequestStatsRepo requestStatsRepo;

    @Override
    public List<Map> getRequestTyCdCount(LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestTyCdCount(requestStatsRepo.findByTyCd(startTime, endTime));
    }

    @Override
    public  List<Map> getRequestSysCdCount(LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestSysCdCount(requestStatsRepo.findBySysCd(startTime, endTime));
    }

    @Override
    public  List<Map> getRequestPrcsSttsCdCount(LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestPrcsSttsCdCount(requestStatsRepo.findByPrcsSttsCd(startTime, endTime));
    }

    @Override
    public  List<Map> getRequestNumCount(LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestNumCount(requestStatsRepo.findById(startTime, endTime));
    }
    @Override
    public  List<Map> getRequestCompleteTime(LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestCompleteTime(requestStatsRepo.findByRegistDtAndGoalDt(startTime, endTime));
    }

    @Override
    public List<Map> getRequestUserIdTyCdCount(String userId ,LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestUserIdTyCdCount(requestStatsRepo.findByTyCd(userId, startTime, endTime));
    }

    @Override
    public List<Map> getRequestUserIdSysCdCount(String userId ,LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestUserIdSysCdCount(requestStatsRepo.findBySysCd(userId, startTime, endTime));
    }

    @Override
    public List<Map> getRequestUserIdPrcsSttsCdCount(String userId ,LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestUserIdPrcsSttsCdCount(requestStatsRepo.findByPrcsSttsCd(userId, startTime, endTime));
    }

    @Override
    public  List<Map> getRequestUserIdNumCount(String userId, LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestUserIdNumCount(requestStatsRepo.findById(userId, startTime, endTime));
    }

    @Override
    public  List<Map> getRequestUserIdCompleteTime(String userId, LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestUserIdCompleteTime(requestStatsRepo.findByRegistDt(userId, startTime, endTime));
    }

    @Override
    public List<Map> getRequestChargeIdTyCdCount(String userId ,LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestChargeIdTyCdCount(requestStatsRepo.findByTyCdAndRegistDt(userId, startTime, endTime));
    }

    @Override
    public List<Map> getRequestChargeIdSysCdCount(String userId ,LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestChargeIdSysCdCount(requestStatsRepo.findBySysCdAndRegistDt(userId, startTime, endTime));
    }

    @Override
    public List<Map> getRequestChargeIdPrcsSttsCdCount(String userId ,LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestChargeIdPrcsSttsCdCount(requestStatsRepo.findByPrcsSttsCdAndRegistDt(userId, startTime, endTime));
    }

    @Override
    public  List<Map> getRequestChargeIdNumCount(String userId, LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestChargeIdNumCount(requestStatsRepo.findByIdOrderByRegistDt(userId, startTime, endTime));
    }

    @Override
    public  List<Map> getRequestReqIdPrcsSttsCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestReqIdPrcsSttsCdCount(requestStatsRepo.findByPrcsSttsCdAndReqId(userId, startTime, endTime));
    }

    @Override
    public  List<Map> getRequestChargeIdCompleteTime(String userId, LocalDateTime startTime, LocalDateTime endTime){
        return requestStatsOutPort.getRequestChargeIdCompleteTime(requestStatsRepo.findByRegistDtAndChrgprNm(userId, startTime, endTime));
    }

    @Override
    public List<Map> getRequestAll(String selectDate, String selectType, List<String> items) {
        return requestStatsOutPort.getRequestAll(requestStatsRepo.findByCount(selectDate, selectType,items));
    }

    @Override
    public List<Map> getRequestAllExcDate(String selectType, List<String> items) {
        return requestStatsOutPort.getRequestAllExcDate(requestStatsRepo.findByCountExcDate(selectType,items));
    }

    @Override
    public List<Map> getRequestAllExcTyCd(String selectDate, List<String> items) {
        return requestStatsOutPort.getRequestAllExcTyCd(requestStatsRepo.findByCountExcTyCd(selectDate,items));
    }

    @Override
    public List<Map> getRequestAllCount(String startTime, String endTime, List<String> items) {
        return requestStatsOutPort.getRequestAllCount(requestStatsRepo.findTyCdAndRegistDt(startTime, endTime,items));
    }

}
