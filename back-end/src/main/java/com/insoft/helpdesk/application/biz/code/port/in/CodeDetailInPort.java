package com.insoft.helpdesk.application.biz.code.port.in;

import com.insoft.helpdesk.application.domain.entity.code.CodeDetailList;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface CodeDetailInPort {
    Page<Detail> getDetails(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Long getDetailsCount(Map<String,String> keyParams, Map<String,String> searchParams);
    Page<Detail> getDetails(String groupId, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Long getDetailsCount(String groupId, Map<String,String> keyParams, Map<String,String> searchParams);
    Optional<Detail> getDetail(String detailId);
    Detail createDetail(Detail detail);
    Detail updateDetail(Detail detail);
    Detail deleteDetail(Detail detail);
    List<Detail> updateDetail(Group group, CodeDetailList codeDetailList);


}
