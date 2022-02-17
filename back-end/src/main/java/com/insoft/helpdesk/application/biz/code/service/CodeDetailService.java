package com.insoft.helpdesk.application.biz.code.service;

import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.biz.code.port.out.CodeDetailOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeDetailService implements CodeDetailInPort {

    final CodeDetailOutPort codeDetailOutPort;

    @Override
    public Page<Detail> getDetails(Pageable pageable) {
        return codeDetailOutPort.getDetails(pageable);
    }

    @Override
    public Long getDetailsCount() {
        return codeDetailOutPort.getDetailsCount();
    }

    @Override
    public Page<Detail> getDetailsGroupId(String groupId, Pageable pageable) {
        return codeDetailOutPort.getDetailsGroupId(groupId, pageable);
    }

    @Override
    public Long getDetailsGroupIdCount(String groupId) {
        return codeDetailOutPort.getDetailsGroupIdCount(groupId);
    }

    @Override
    public Optional<Detail> getDetail(String groupId, String detailId) {
        return codeDetailOutPort.getDetail(groupId, detailId);
    }

    @Override
    public void createDetail(Detail detail) {
        codeDetailOutPort.createDetail(detail);
    }

    @Override
    public void updateDetail(Detail detail) {
        codeDetailOutPort.updateDetail(detail);
    }

    @Override
    public void deleteDetail(Detail detail) {
        codeDetailOutPort.deleteDetail(detail);
    }
}
