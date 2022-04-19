package com.insoft.helpdesk.application.biz.notice.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface NoticeOutPort {
    Page<Notice> getNotices(Page<Notice> notices);
    Optional<Notice> getNotice(Optional<Notice> notice);
    Notice createNotice(Notice notice);
    Notice updateNotice(Notice notice);
    Notice deleteNotice(Notice notice);
}
