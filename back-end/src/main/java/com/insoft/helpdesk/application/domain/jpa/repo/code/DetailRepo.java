package com.insoft.helpdesk.application.domain.jpa.repo.code;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailRepo extends JpaRepository<Detail, String> {

    Long countAllByUserId(String userId);
    List<Detail> findAllByUserId(String userId);
}