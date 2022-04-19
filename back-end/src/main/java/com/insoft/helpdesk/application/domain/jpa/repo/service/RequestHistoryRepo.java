package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.JpaRepository;



public interface RequestHistoryRepo extends JpaRepository<RequestHistory, String>, JpaSpecificationExecutor<RequestHistory> {

}