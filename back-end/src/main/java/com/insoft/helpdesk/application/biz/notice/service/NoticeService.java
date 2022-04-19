package com.insoft.helpdesk.application.biz.notice.service;

import com.insoft.helpdesk.application.biz.notice.port.in.NoticeInPort;
import com.insoft.helpdesk.application.biz.notice.port.out.NoticeOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import com.insoft.helpdesk.application.domain.jpa.repo.notice.NoticeRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeService implements NoticeInPort {

    final NoticeRepo noticeRepo;

    final NoticeOutPort noticeOutPort;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    @Override
    public Page<Notice> getNotices(Map<String,String>keyParams, Map<String, String> searchParams, Pageable pageable){
        return noticeOutPort.getNotices(noticeRepo.findAll(helpDeskSearchExecutor.Search(searchParams, keyParams), pageable));
    }

    @Override
    public Optional<Notice> getNotice(String id){ return noticeOutPort.getNotice(noticeRepo.findById(id));}

    @Override
    public Notice createNotice(Notice notice){ return noticeOutPort.createNotice(noticeRepo.save(notice));}

    @Override
    public Notice updateNotice(Notice notice){ return noticeOutPort.updateNotice(noticeRepo.save(notice));}

    @Override
    public Notice deleteNotice(Notice notice){ noticeRepo.delete(notice); return  noticeOutPort.deleteNotice(notice);}
}
