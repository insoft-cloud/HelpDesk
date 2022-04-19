package com.insoft.helpdesk.application.biz.notice.service;

import com.insoft.helpdesk.application.biz.notice.port.in.NoticeAttachmentInPort;
import com.insoft.helpdesk.application.biz.notice.port.out.NoticeAttachmentOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.NoticeAttachment;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachmentHistory;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import com.insoft.helpdesk.application.domain.jpa.repo.notice.NoticeAttachmentRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentHistoryRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeAttachmentService implements NoticeAttachmentInPort {

    final NoticeAttachmentOutPort noticeAttachmentOutPort;
    final NoticeAttachmentRepo noticeAttachmentRepo;
    final HelpDeskSearchExecutor helpDeskSearchExecutor;


    @Override
    public Page<NoticeAttachment> getNoticeAttachments(String ntcNo, Map<String, String> keyParams, Map<String, String> searchParams, Pageable pageable) {
        return noticeAttachmentOutPort.getNoticeAttachments(noticeAttachmentRepo.findAll(helpDeskSearchExecutor.Search(searchParams,keyParams, Notice.class, ntcNo, "ntcNo", "id"),pageable));
    }

    @Override
    public Optional<NoticeAttachment> getNoticeAttachment(String id) {
        return noticeAttachmentOutPort.getNoticeAttachment(noticeAttachmentRepo.findById(id));
    }

    @Override
    public NoticeAttachment createNoticeAttachment(NoticeAttachment noticeAttachment) {
        return noticeAttachmentOutPort.createNoticeAttachment(noticeAttachmentRepo.save(noticeAttachment));
    }

    @Override
    public NoticeAttachment updateNoticeAttachment(NoticeAttachment noticeAttachment) {
        return noticeAttachmentOutPort.createNoticeAttachment(noticeAttachmentRepo.save(noticeAttachment));
    }

    @Override
    public NoticeAttachment deleteNoticeAttachment(NoticeAttachment noticeAttachment) {
        noticeAttachmentRepo.delete(noticeAttachment);
        return noticeAttachment;
    }

}
