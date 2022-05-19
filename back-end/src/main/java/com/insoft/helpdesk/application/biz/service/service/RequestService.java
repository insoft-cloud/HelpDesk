package com.insoft.helpdesk.application.biz.service.service;

import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.biz.service.port.out.RequestOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestService implements RequestInPort {

    final RequestRepo requestRepo;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    @PersistenceContext
    private EntityManager em;


    final RequestOutPort requestOutPort;

    private static final String SELECT_QUERY = "SELECT new Request(A.id, A.reqId, A.tyCd, A.priortCd, A.sysCd, A.chrgprNm, A.reqNm, A.prcsSttsCd, A.evl, A.ttl, A.cnts, A.registDt, A.updateDt, A.goalDt) FROM ";
    private static final String ORDER_BY = " ORDER BY ";
    private static final String AND = " AND ";
    private static final String A_registDt_Between = "A.registDt between ";
    private static final String AND_BRACKET = "and ( ";
    private static final String PERCENT_OR = "%' or ";
    private static final String LIKE_PERCENT = " like '%";

    @Override
    public Page<Request> getRequests(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable) {
        return requestOutPort.getRequests(requestRepo.findAll(helpDeskSearchExecutor.search(searchParams,keyParams), pageable));
    }

    @Override
    public  Page<Request> getRequestsDate(String userId, String all, String startTime, String endTime, Map<String,String> searchParams, Pageable pageable){
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(SELECT_QUERY);
        if(all != null && all.equals("Y")){
            stringBuffer.append("Request as A where A.sysCd = ");
            stringBuffer.append("(select B.agencyCode FROM Member as B WHERE B.userId = '");
            stringBuffer.append(userId + "' )");
            stringBuffer.append("and (");
        } else {
            stringBuffer.append("Request as A ");
            stringBuffer.append("where (");
        }
        if(searchParams != null && !searchParams.isEmpty()){
            for (Map.Entry<String, String> key : searchParams.entrySet()) {
                stringBuffer.append("A."+ key.getKey() + LIKE_PERCENT+searchParams.get(key.getKey())+PERCENT_OR);
            }
            stringBuffer.delete(stringBuffer.length()-4, stringBuffer.length());
            stringBuffer.append(")");
            stringBuffer.append(AND_BRACKET);
        }
        stringBuffer.append(A_registDt_Between);
        stringBuffer.append("'"+startTime+"'");
        stringBuffer.append(AND);
        stringBuffer.append("'"+endTime+"'");
        stringBuffer.append(" )");
        if(pageable.getSort().isSorted()){
            stringBuffer.append(ORDER_BY);
            pageable.getSort().stream().forEach(sort -> {
                stringBuffer.append("A."+sort.getProperty()+ " " + sort.getDirection());
            });
        }
        List requests = em.createQuery(stringBuffer.toString()
                , Request.class).getResultList();
        return getPageImpl(requests, pageable);
    };

    @Override
    public Optional<Request> getRequest(String id) {
        return requestOutPort.getRequest(requestRepo.findById(id));
    }

    @Override
    public  Page<Request> getRequestPrcsSttsCd(String userId, String prcsSttsCd, String all, String startTime, String endTime, Map<String,String> searchParams, Pageable pageable){
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(SELECT_QUERY);
        if(all != null && all.equals("Y")){
            stringBuffer.append("Request as A where A.sysCd = ");
            stringBuffer.append("(select B.agencyCode FROM Member as B WHERE B.userId = '");
            stringBuffer.append(userId + "' )");
            stringBuffer.append("and ");
        } else {
            stringBuffer.append("Request as A ");
            stringBuffer.append("where ");
        }
        stringBuffer.append("A.prcsSttsCd ");
        stringBuffer.append(LIKE_PERCENT+prcsSttsCd+"%'");
        if(searchParams != null && !searchParams.isEmpty()){
            stringBuffer.append(" AND (");
            for (Map.Entry<String, String> key : searchParams.entrySet()) {
                stringBuffer.append("A."+ key.getKey() + LIKE_PERCENT+searchParams.get(key.getKey())+PERCENT_OR);
            }
            stringBuffer.delete(stringBuffer.length()-4, stringBuffer.length());
            stringBuffer.append(")");
        }
        stringBuffer.append(AND_BRACKET);
        stringBuffer.append(A_registDt_Between);
        stringBuffer.append("'"+startTime+"'");
        stringBuffer.append(AND);
        stringBuffer.append("'"+endTime+"'");
        stringBuffer.append(" )");
        if(pageable.getSort().isSorted()){
            stringBuffer.append(ORDER_BY);
            pageable.getSort().stream().forEach(sort -> {
                stringBuffer.append("A."+sort.getProperty()+ " " + sort.getDirection());
            });
        }

        List requests = em.createQuery(stringBuffer.toString()
                , Request.class).getResultList();
        return getPageImpl(requests, pageable);
    };

    @Override
    public  Page<Request> getRequestUserId(String userId, List<String> prcsSttsCdList, Pageable pageable) {
        return requestOutPort.getRequestUserId(requestRepo.findByReqIdAndPrcsSttsCdInOrderByRegistDtDesc(userId, prcsSttsCdList, pageable));
    }

    @Override
    public  Page<Request> getRequestUserId(String userId, String startTime, String endTime, Map<String,String> searchParams, Pageable pageable){
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(SELECT_QUERY);
        stringBuffer.append("Request as A ");
        stringBuffer.append("where ");
        stringBuffer.append("A.reqId = '");
        stringBuffer.append(userId+"'");
        if(searchParams != null && !searchParams.isEmpty()){
            stringBuffer.append(" AND (");
            for (Map.Entry<String, String> key : searchParams.entrySet()) {
                stringBuffer.append("A."+ key.getKey() + LIKE_PERCENT+searchParams.get(key.getKey())+PERCENT_OR);
            }
            stringBuffer.delete(stringBuffer.length()-4, stringBuffer.length());
            stringBuffer.append(")");
        }
        stringBuffer.append(AND_BRACKET);
        stringBuffer.append(A_registDt_Between);
        stringBuffer.append("'"+startTime+"'");
        stringBuffer.append(AND);
        stringBuffer.append("'"+endTime+"'");
        stringBuffer.append(" )");
        if(pageable.getSort().isSorted()){
            stringBuffer.append(ORDER_BY);
            pageable.getSort().stream().forEach(sort -> {
                stringBuffer.append("A."+sort.getProperty()+ " " + sort.getDirection());
            });
        }

        List requests = em.createQuery(stringBuffer.toString()
                , Request.class).getResultList();
        return getPageImpl(requests, pageable);
    };

    @Override
    public Page<Request> getRequestChargeUserId(String userId, String startTime, String endTime, Map<String, String> searchParams, Pageable pageable) {
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(SELECT_QUERY);
        stringBuffer.append("Request as A JOIN RequestCharge as B on A.id = B.svcReqNo ");
        stringBuffer.append("where ");
        stringBuffer.append("B.userId = '");
        stringBuffer.append(userId+"'");
        stringBuffer.append(" and B.delYn = 'N' ");
        if(searchParams != null && !searchParams.isEmpty()){
            stringBuffer.append(" AND (");
            for (Map.Entry<String, String> key : searchParams.entrySet()) {
                stringBuffer.append("A."+ key.getKey() + LIKE_PERCENT+searchParams.get(key.getKey())+PERCENT_OR);
            }
            stringBuffer.delete(stringBuffer.length()-4, stringBuffer.length());
            stringBuffer.append(")");
        }
        stringBuffer.append(AND_BRACKET);
        stringBuffer.append(A_registDt_Between);
        stringBuffer.append("'"+startTime+"'");
        stringBuffer.append(AND);
        stringBuffer.append("'"+endTime+"'");
        stringBuffer.append(" )");
        if(pageable.getSort().isSorted()){
            stringBuffer.append(ORDER_BY);
            pageable.getSort().stream().forEach(sort -> {
                stringBuffer.append("A."+sort.getProperty()+ " " + sort.getDirection());
            });
        }

        List requests = em.createQuery(stringBuffer.toString()
                , Request.class).getResultList();
        return getPageImpl(requests, pageable);
    }


    @Override
    public Request createRequest(Request request) {
       return requestOutPort.createRequest(requestRepo.save(request));
    }

    @Override
    public Request updateRequest(Request request) { return requestOutPort.updateRequest(requestRepo.save(request));}


    private <T> PageImpl<T> getPageImpl(List requests, Pageable pageable){
        long size = requests.size();
        int startIndex = pageable.getPageNumber() * pageable.getPageSize();
        int endIndex = pageable.getPageSize() * (pageable.getPageNumber()+1);
        if(endIndex >= requests.size()){
            endIndex = requests.size();
        }
        if(startIndex > size){
            startIndex = 0;
            endIndex = 0;
        }
        return new PageImpl<>(requests.subList(startIndex, endIndex), pageable,requests.size());
    }


}
