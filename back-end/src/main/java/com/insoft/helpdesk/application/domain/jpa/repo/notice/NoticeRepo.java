package com.insoft.helpdesk.application.domain.jpa.repo.notice;

import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepo extends JpaRepository<Notice, String> {

}