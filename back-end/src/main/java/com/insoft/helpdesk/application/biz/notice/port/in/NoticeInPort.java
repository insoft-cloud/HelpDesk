package com.insoft.helpdesk.application.biz.notice.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Optional;

public interface NoticeInPort {
    Page<Notice> getNotices(Map<String, String> keyParams, Map<String, String> searchParams, Pageable pageable);
    Optional<Notice> getNotice(String id);
    Notice createNotice(Notice notice);
    Notice updateNotice(Notice notice);
    Notice deleteNotice(Notice notice);
}
