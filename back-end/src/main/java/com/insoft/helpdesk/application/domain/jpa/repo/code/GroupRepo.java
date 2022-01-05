package com.insoft.helpdesk.application.domain.jpa.repo.code;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepo extends JpaRepository<Group, String> {

    Long countAllByUserId(String userId);
    List<Group> findAllByUserId(String userId);
}