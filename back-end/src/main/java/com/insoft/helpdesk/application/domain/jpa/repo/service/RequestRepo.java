package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepo extends JpaRepository<Request, String> {
    List<Request> findAllByReqId(String userId);
    Long countAllByReqId(String userId);
    List<Request> findAllByReqId(String userId, Pageable pageable);
}