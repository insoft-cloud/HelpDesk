package com.insoft.helpdesk.application.biz.notice.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.notice.NoticeAttachment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Optional;

public interface NoticeAttachmentInPort {

    Page<NoticeAttachment> getNoticeAttachments(String ntcNo, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Optional<NoticeAttachment> getNoticeAttachment(String id);
    NoticeAttachment createNoticeAttachment(NoticeAttachment noticeAttachment);
    NoticeAttachment updateNoticeAttachment(NoticeAttachment noticeAttachment);
    NoticeAttachment deleteNoticeAttachment(NoticeAttachment noticeAttachment);
}
