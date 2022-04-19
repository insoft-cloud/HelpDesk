package com.insoft.helpdesk.application.adapter.in.controller.service;

import com.insoft.helpdesk.application.biz.common.port.out.CommonOutPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestStatsInPort;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestStatsRepo;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "RequestStats", description = "서비스 요청 통계 API")
@HelpDeskRestController
@RequiredArgsConstructor
public class RequestStatsController {

    final RequestStatsRepo requestStatsRepo;
    final RequestStatsInPort requestStatsInPort;
    final CommonOutPort commonOutPort;

    final JwtTokenProvider jwtTokenProvider;

    final MemberRepo memberRepo;

    @Tag(name = "RequestStats")
    @Operation(summary  = "유형분류", description  = "요청 통계 - 유형분류")
    @GetMapping("/service/request/tyCd/count")
    public List<Map> getRequestTyCdCount(@RequestParam(value = "day", required = false, defaultValue = "week")String day){
        return requestStatsInPort.getRequestTyCdCount(commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "기관별 빈도", description  = "요청 통계 - 기관별 빈도")
    @GetMapping("/service/request/sysCd/count")
    public List<Map> getRequestSysCdCount(@RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestSysCdCount(commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "서비스 진행 사항", description  = "요청 통계 - 서비스 진행 사항")
    @GetMapping("/service/request/prcsSttsCd/count")
    public List<Map> getRequestPrcsSttsCdCount(@RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestPrcsSttsCdCount(commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "요청건수", description  = "요청 통계 - 요청건수")
    @GetMapping("/service/request/rqstId/count")
    public List<Map> getRequestNumCount(@RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestNumCount(commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "해당 유저 소속기관 유형분류", description  = "요청 통계 - 해당 유저 소속기관 유형분류")
    @GetMapping("/service/request/{userId}/tyCd/count")
    public List<Map> getRequestUserIdTyCdCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day){
        return requestStatsInPort.getRequestUserIdTyCdCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "해당 유저 소속기관 빈도", description  = "요청 통계 - 해당 유저 소속기관 빈도")
    @GetMapping("/service/request/{userId}/sysCd/count")
    public List<Map> getRequestUserIdSysCdCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestUserIdSysCdCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "해당 유저 소속기관 서비스 진행 사항", description  = "요청 통계 - 해당 유저 소속기관 서비스 진행 사항")
    @GetMapping("/service/request/{userId}/prcsSttsCd/count")
    public List<Map> getRequestUserIdPrcsSttsCdCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestUserIdPrcsSttsCdCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "해당 유저 소속기관 요청건수", description  = "요청 통계 - 해당 유저 소속기관 요청건수")
    @GetMapping("/service/request/{userId}/rqstId/count")
    public List<Map> getRequestUserIdNumCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestUserIdNumCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }


    @Tag(name = "RequestStats")
    @Operation(summary  = "담당 요청 유형분류", description  = "요청 통계 - 담당 요청 유형분류")
    @GetMapping("/service/request/{userId}/charge/tyCd/count")
    public List<Map> getRequestChargeIdTyCdCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day){
        return requestStatsInPort.getRequestChargeIdTyCdCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "담당 요청 기관별 빈도", description  = "요청 통계 - 담당 요청 기관별 빈도")
    @GetMapping("/service/request/{userId}/charge/sysCd/count")
    public List<Map> getRequestChargeIdSysCdCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestChargeIdSysCdCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "담당 요청 진행 사항", description  = "요청 통계 - 담당 요청 진행 사항")
    @GetMapping("/service/request/{userId}/charge/prcsSttsCd/count")
    public List<Map> getRequestChargeIdPrcsSttsCdCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestChargeIdPrcsSttsCdCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "담당 요청건수", description  = "요청 통계 - 담당 요청건수")
    @GetMapping("/service/request/{userId}/charge/rqstId/count")
    public List<Map> getRequestChargeIdNumCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestChargeIdNumCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "담당 요청 진행 사항", description  = "요청 통계 - 담당 요청 진행 사항")
    @GetMapping("/service/request/{userId}/myRequest/prcsSttsCd/count")
    public List<Map> getRequestReqIdPrcsSttsCdCount(@PathVariable String userId, @RequestParam(value = "day", required = false, defaultValue = "week")String day) {
        return  requestStatsInPort.getRequestReqIdPrcsSttsCdCount(userId, commonOutPort.startDataTime(day), commonOutPort.endDataTime());
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "민원통계 상세 데이터", description  = "민원 통계 - 유형/날짜별 상세 데이터")
    @GetMapping("/service/request/tyCdRegist")
    public List<Map> getRequestAll(@RequestParam(value = "selectDate", required = false)String selectDate, @RequestParam(value = "selectType", required = false)String selectType, @RequestParam(value = "items", required = false)List<String> items) {
        return  requestStatsInPort.getRequestAll(selectDate, selectType, items);
    }

    @Tag(name = "RequestStats")
    @Operation(summary  = "민원통계 유형/날짜별 건수", description  = "민원 통계 - 유형/날짜별 건수")
    @GetMapping("/service/request/tyCdRegist/count")
    public List<Map> getRequestAllCount(@RequestParam(value = "startDay", required = false)String startDay, @RequestParam(value = "endDay", required = false)String endDay, @RequestParam(value = "items", required = false)List<String> items) {
        return  requestStatsInPort.getRequestAllCount(startDay, endDay, items);
    }



}
