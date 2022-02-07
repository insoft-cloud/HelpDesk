package com.insoft.helpdesk.application.domain.jpa.repo.service;

<<<<<<< HEAD
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestAttachmentHistoryRepo extends JpaRepository<Request, String> {

=======
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestAttachmentHistoryRepo extends JpaRepository<RequestAttachmentHistory, String> {

    Page<RequestAttachmentHistory> findAllBySvcReqNo(String svcReqNo, Pageable pageable);
    long countAllBySvcReqNo(String svcReqNo);
>>>>>>> e0672cfa9d8668f30701f34f60e0ed67819f70fb
}