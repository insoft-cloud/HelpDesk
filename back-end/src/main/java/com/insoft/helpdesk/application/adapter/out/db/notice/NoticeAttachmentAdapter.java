package com.insoft.helpdesk.application.adapter.out.db.notice;

import com.insoft.helpdesk.application.biz.notice.port.out.NoticeAttachmentOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.NoticeAttachment;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class NoticeAttachmentAdapter implements NoticeAttachmentOutPort {

    @Override
    public Page<NoticeAttachment> getNoticeAttachments(Page<NoticeAttachment> noticeAttachments) {
        return noticeAttachments;
    }

    @Override
    public Optional<NoticeAttachment> getNoticeAttachment(Optional<NoticeAttachment> noticeAttachment) {
        return noticeAttachment;
    }

    @Override
    public NoticeAttachment createNoticeAttachment(NoticeAttachment noticeAttachment) {
        return noticeAttachment;
    }

    @Override
    public NoticeAttachment updateNoticeAttachment(NoticeAttachment noticeAttachment) {
        return noticeAttachment;
    }

    @Override
    public NoticeAttachment deleteNoticeAttachment(NoticeAttachment noticeAttachment) {
        return noticeAttachment;
    }
}
