package com.insoft.helpdesk.application.domain.jpa.repo.notice;

import com.insoft.helpdesk.application.domain.jpa.entity.notice.NoticeAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeAttachmentRepo extends JpaRepository<NoticeAttachment, String> {

}