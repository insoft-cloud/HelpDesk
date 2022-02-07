package com.insoft.helpdesk.application.domain.jpa.repo.notice;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.NoticeAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeAttachmentRepo extends JpaRepository<NoticeAttachment, String> {

}