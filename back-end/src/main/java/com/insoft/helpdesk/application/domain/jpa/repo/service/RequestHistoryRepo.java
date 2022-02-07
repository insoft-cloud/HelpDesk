package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RequestHistoryRepo extends JpaRepository<RequestHistory, String> {

    Page<RequestHistory> findAllByUserId(String userId, Pageable pageable);
    long countAllByUserId(String userId);

}