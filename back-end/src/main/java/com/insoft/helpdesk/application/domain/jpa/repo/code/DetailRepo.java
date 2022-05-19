package com.insoft.helpdesk.application.domain.jpa.repo.code;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface DetailRepo extends JpaRepository<Detail, String>, JpaSpecificationExecutor<Detail> {

    List<Detail> findAllByCdGroupNo(Group group);

}
