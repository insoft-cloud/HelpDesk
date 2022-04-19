package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface RequestStatsInPort {

     List<Map> getRequestSysCdCount(LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestTyCdCount(LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestPrcsSttsCdCount(LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestNumCount(LocalDateTime startTime, LocalDateTime endTime);

     List<Map> getRequestUserIdTyCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestUserIdSysCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestUserIdPrcsSttsCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestUserIdNumCount(String userId, LocalDateTime startTime, LocalDateTime endTime);

     List<Map> getRequestChargeIdTyCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestChargeIdSysCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestChargeIdPrcsSttsCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime);
     List<Map> getRequestChargeIdNumCount(String userId, LocalDateTime startTime, LocalDateTime endTime);

     List<Map> getRequestReqIdPrcsSttsCdCount(String userId, LocalDateTime startTime, LocalDateTime endTime);

     List<Map> getRequestAllCount(String startTime, String endTime, List<String> items);
     List<Map> getRequestAll(String selectDate, String selectType, List<String> items);


}
