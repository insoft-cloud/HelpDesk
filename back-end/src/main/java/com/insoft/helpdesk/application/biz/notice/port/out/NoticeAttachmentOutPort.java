package com.insoft.helpdesk.application.biz.notice.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.notice.NoticeAttachment;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface NoticeAttachmentOutPort {

    Page<NoticeAttachment> getNoticeAttachments(Page<NoticeAttachment> noticeAttachments);
    Optional<NoticeAttachment> getNoticeAttachment(Optional<NoticeAttachment> noticeAttachment);
    NoticeAttachment createNoticeAttachment(NoticeAttachment noticeAttachment);
    NoticeAttachment updateNoticeAttachment(NoticeAttachment noticeAttachment);
    NoticeAttachment deleteNoticeAttachment(NoticeAttachment noticeAttachment);

}
