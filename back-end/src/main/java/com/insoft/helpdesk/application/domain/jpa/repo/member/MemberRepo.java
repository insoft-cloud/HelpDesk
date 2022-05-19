package com.insoft.helpdesk.application.domain.jpa.repo.member;

import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MemberRepo extends JpaRepository<Member, String>, JpaSpecificationExecutor<Member> {

    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String mobilePhone);

    @Query(value = "SELECT replace(user_id, substring(user_id, 2, 4), '****' ) FROM tb_help_mbr where email_addr = :email", nativeQuery = true)
    String findByUserId(@Param("email") String email);

    @Query(value = "SELECT user_id, email_addr, PSITN_INSTT_CD, PSITN_DEPT_NM, NM from tb_help_mbr where PSITN_INSTT_CD = ( select psitn_instt_cd FROM tb_help_mbr WHERE user_id = :userId ) or auth_cd = 'manager'", nativeQuery = true)
    List<Map> findByUserIdAndAgencyCode(@Param("userId") String userId);

    @Query(value = "SELECT user_id, email_addr, PSITN_INSTT_CD, PSITN_DEPT_NM, NM FROM tb_help_mbr", nativeQuery = true)
    List<Map> findByUserIdAndAuth();

    @Query(value = "SELECT user_id FROM tb_help_mbr where email_addr = :email", nativeQuery = true)
    String findByEmailAndUserId(@Param("email") String email);

    Optional<Member> findByUsername(String username);

    Optional<Member> findByEmail(String email);
    Optional<Member> findByPhoneNumber(String phone);
}
