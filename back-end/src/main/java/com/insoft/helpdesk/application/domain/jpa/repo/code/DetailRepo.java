package com.insoft.helpdesk.application.domain.jpa.repo.code;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DetailRepo extends JpaRepository<Detail, String> {

    Page<Detail> findAllByCdGroupNo(String groupNo, Pageable pageable);
    Optional<Detail> findByCdGroupNoAndId(String groupNo, String id);
    Long countAllByCdGroupNo(String CdGroupNo);

}