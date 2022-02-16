package com.insoft.helpdesk.application.biz.code.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Optional;

public interface CodeDetailInPort {
    Page<Detail> getDetails(Pageable pageable);
    Long getDetailsCount();
    Page<Detail> getDetailsGroupId(String groupId, Pageable pageable);
    Long getDetailsGroupIdCount(String groupId);
    Optional<Detail> getDetail(String id);
    void createRequest(Detail detail);
    void updateRequest(Detail detail);
    void deleteRequest(Detail detail);
}
