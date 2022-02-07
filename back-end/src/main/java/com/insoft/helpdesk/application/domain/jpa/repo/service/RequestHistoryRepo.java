package com.insoft.helpdesk.application.domain.jpa.repo.service;

<<<<<<< HEAD
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestHistoryRepo extends JpaRepository<Request, String> {
=======
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RequestHistoryRepo extends JpaRepository<RequestHistory, String> {

    Page<RequestHistory> findAllByUserId(String userId, Pageable pageable);
    long countAllByUserId(String userId);
>>>>>>> e0672cfa9d8668f30701f34f60e0ed67819f70fb

}