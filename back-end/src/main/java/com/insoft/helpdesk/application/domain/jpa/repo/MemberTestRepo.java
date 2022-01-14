package com.insoft.helpdesk.application.domain.jpa.repo;

import com.insoft.helpdesk.application.domain.jpa.entity.MemberTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTestRepo extends JpaRepository<MemberTest, String> {
    MemberTest findByUsername(String name);
}
