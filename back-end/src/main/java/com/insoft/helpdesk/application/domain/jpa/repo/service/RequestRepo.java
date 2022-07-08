package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;


public interface RequestRepo extends JpaRepository<Request, String>, JpaSpecificationExecutor<Request> {
    Page<Request> findByReqIdAndPrcsSttsCdInOrderByRegistDtDesc(String userId, List<String> prcsSttsCdList, Pageable pageable);
}
