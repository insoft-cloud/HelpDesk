package com.insoft.helpdesk.application.adapter.in.controller.notice;


import com.insoft.helpdesk.application.biz.notice.port.in.NoticeInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.Notice;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@Tag(name = "Notice", description = "공지사항 API")
@HelpDeskRestController
@RequiredArgsConstructor
public class NoticeController {

    final NoticeInPort noticeInPort;

    @Tag(name = "Notice")
    @Operation(summary = "공지사항 조회", description = "공지사항 상세 조회")
    @GetMapping("/notice/{id}")
    public Notice getNotice(@PathVariable String id) { return  noticeInPort.getNotice(id).orElseThrow(null);}

    @Tag(name = "Notice")
    @Operation(summary = "공지사항 전체 조회", description = "공지사항 전체 조회")
    @GetMapping("/notices")
    public Page<Notice> getNotices(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return noticeInPort.getNotices(HelpDeskMapper.mapToJson(searchParams), HelpDeskMapper.mapToJson(keyParams), pageable);
    }

    @Tag(name = "Notice")
    @Operation(summary = "공지사항 생성", description = "공지사항 생성")
    @PostMapping("/notice")
    public Notice createNotice(@RequestBody Notice notice){
        return  noticeInPort.createNotice(notice);
    }

    @Tag(name = "Notice")
    @Operation(summary = "공지사항 수정", description = "공지사항 내용 수정")
    @PostMapping("/notice/{id}")
    public  Notice updateNotice(@PathVariable String id, @RequestBody Notice notice){
        Notice _notice = noticeInPort.getNotice(id).orElseThrow(null);
        _notice = _notice.updateNotice(notice);
       return noticeInPort.updateNotice(_notice);
    }

}
