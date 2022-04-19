package com.insoft.helpdesk.application.biz.code.port.out;

import com.insoft.helpdesk.application.domain.entity.code.CodeDetailList;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CodeDetailOutPort {

    Page<Detail> getDetails(Page<Detail> details);

    Long getDetailsCount(Long count);

    Optional<Detail> getDetail(Optional<Detail> detail);
    Detail createDetail(Detail detail);
    Detail updateDetail(Detail detail);
    List updateDetail(List<Detail> details);
    Detail deleteDetail(Detail detail);
}
