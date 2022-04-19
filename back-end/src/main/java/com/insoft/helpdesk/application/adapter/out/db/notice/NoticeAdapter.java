package com.insoft.helpdesk.application.adapter.out.db.notice;

import com.insoft.helpdesk.application.biz.notice.port.out.NoticeOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class NoticeAdapter implements NoticeOutPort {

    @Override
    public Page<Notice> getNotices(Page<Notice> notices){ return notices; }

    @Override
    public Optional<Notice> getNotice(Optional<Notice> notice){ return notice; }

    @Override
    public  Notice createNotice(Notice notice){return notice;}

    @Override
    public  Notice updateNotice(Notice notice){return  notice;}

    @Override
    public Notice deleteNotice(Notice notice){return notice; }
}
