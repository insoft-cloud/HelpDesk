package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestAttachmentRepo extends JpaRepository<RequestAttachment, String> {

    @Query("SELECT req FROM RequestAttachment req JOIN FETCH req.svcReqNo svcrq WHERE svcrq.reqId = :reqId")
    List<RequestAttachment> findAllByReqId(String reqId);

    @Query("SELECT COUNT(distinct req) FROM RequestAttachment req LEFT JOIN req.svcReqNo svcrq WHERE svcrq.reqId = :reqId")
    long countReqId(@Param("reqId") String reqId);


}