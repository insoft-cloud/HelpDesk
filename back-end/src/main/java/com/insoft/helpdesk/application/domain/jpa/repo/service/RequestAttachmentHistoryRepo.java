package com.insoft.helpdesk.application.domain.jpa.repo.service;


import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestAttachmentHistoryRepo extends JpaRepository<RequestAttachmentHistory, String> {

    Page<RequestAttachmentHistory> findAllBySvcReqNo(String svcReqNo, Pageable pageable);
    Page<RequestAttachmentHistory> findAllBySvcReqHistNo(String vcReqHistNo, Pageable pageable);
    long countAllBySvcReqNo(String svcReqNo);

}