package com.insoft.helpdesk.application.domain.jpa.repo.member;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepo extends JpaRepository<Member, String> {

    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
}
