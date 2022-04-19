package com.insoft.helpdesk.application.domain.jpa.repo;

import com.insoft.helpdesk.application.domain.jpa.entity.Auth;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AuthRepo extends JpaRepository<Auth, String>, JpaSpecificationExecutor<Auth> {

}
