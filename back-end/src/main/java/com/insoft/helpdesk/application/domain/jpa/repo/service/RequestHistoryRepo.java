package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestHistoryRepo extends JpaRepository<Request, String> {

}