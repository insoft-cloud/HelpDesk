package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface RequestRepo extends JpaRepository<Request, String> {
    Long countAllByReqId(String userId);
    Page<Request> findAllByReqId(String userId, Pageable pageable);
    Page<Request> findAllByReqIdAndRegistDtBetween(String userId, LocalDateTime start, LocalDateTime end, Pageable pageable);


}