package com.insoft.helpdesk.application.domain.jpa.repo.member;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MemberRepo extends JpaRepository<Member, String>, JpaSpecificationExecutor<Member> {

    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String mobilePhone);

    @Query(value = "SELECT user_id FROM tb_help_mbr where email_addr = :email", nativeQuery = true)
    String findByUserId(@Param(value = "email") String email);


    Optional<Member> findByUsername(String username);

    Optional<Member> findByEmail(String email);
    Optional<Member> findByPhoneNumber(String phone);
}
