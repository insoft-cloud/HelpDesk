package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.ArrayList;


public interface RequestRepo extends JpaRepository<Request, String>, JpaSpecificationExecutor<Request> {
    Page<Request> findByReqIdAndPrcsSttsCdInOrderByRegistDtDesc(String userId, ArrayList<String> prcsSttsCdList, Pageable pageable);
}
