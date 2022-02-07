package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestAttachmentRepo extends JpaRepository<RequestAttachment, String> {

    Page<RequestAttachment> findAllBySvcReqNo(String svcReqNo, Pageable pageable);
    long countAllBySvcReqNo(String svcReqNo);



}