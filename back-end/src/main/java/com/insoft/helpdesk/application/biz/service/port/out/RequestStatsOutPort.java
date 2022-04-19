package com.insoft.helpdesk.application.biz.service.port.out;


import java.util.List;
import java.util.Map;

public interface RequestStatsOutPort {


    List<Map> getRequestTyCdCount(List<Map> requests);
    List<Map> getRequestSysCdCount(List<Map> requests);
    List<Map> getRequestPrcsSttsCdCount(List<Map> requests);
    List<Map> getRequestNumCount(List<Map> requests);

    List<Map> getRequestUserIdTyCdCount(List<Map> requests);
    List<Map> getRequestUserIdSysCdCount(List<Map> requests);
    List<Map> getRequestUserIdPrcsSttsCdCount(List<Map> requests);
    List<Map> getRequestUserIdNumCount(List<Map> requests);

    List<Map> getRequestChargeIdTyCdCount(List<Map> requests);
    List<Map> getRequestChargeIdSysCdCount(List<Map> requests);
    List<Map> getRequestChargeIdPrcsSttsCdCount(List<Map> requests);
    List<Map> getRequestChargeIdNumCount(List<Map> requests);

    List<Map> getRequestReqIdPrcsSttsCdCount(List<Map> requests);

    List<Map> getRequestAll(List<Map> requests);
    List<Map> getRequestAllCount(List<Map> requests);

}
