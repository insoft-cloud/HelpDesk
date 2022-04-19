package com.insoft.helpdesk.application.domain.jpa.repo.notice;

import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NoticeRepo extends JpaRepository<Notice, String>, JpaSpecificationExecutor<Notice>{


}