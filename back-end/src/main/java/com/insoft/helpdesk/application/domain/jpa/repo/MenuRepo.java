package com.insoft.helpdesk.application.domain.jpa.repo;

import com.insoft.helpdesk.application.domain.jpa.entity.Menu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepo extends JpaRepository<Menu, String> {
}
