package com.insoft.helpdesk.application.biz.code.service;

import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.biz.code.port.out.CodeDetailOutPort;
import com.insoft.helpdesk.application.domain.entity.code.CodeDetailList;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.application.domain.jpa.repo.code.DetailRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeDetailService implements CodeDetailInPort {

    final CodeDetailOutPort codeDetailOutPort;

    final DetailRepo detailRepo;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    @Override
    public Page<Detail> getDetails(Map<String, String> keyParams, Map<String, String> searchParams, Pageable pageable) {
        return codeDetailOutPort.getDetails(detailRepo.findAll(helpDeskSearchExecutor.Search(searchParams, keyParams), pageable));
    }

    @Override
    public Long getDetailsCount(Map<String, String> keyParams, Map<String, String> searchParams) {
        return codeDetailOutPort.getDetailsCount(detailRepo.count(helpDeskSearchExecutor.Search(searchParams, keyParams)));
    }

    @Override
    public Page<Detail> getDetails(String groupId, Map<String, String> keyParams, Map<String, String> searchParams, Pageable pageable) {
        return codeDetailOutPort.getDetails(detailRepo.findAll(helpDeskSearchExecutor.Search(searchParams, keyParams, Group.class, groupId, "cdGroupNo", "id"), pageable));
    }

    @Override
    public Long getDetailsCount(String groupId, Map<String, String> keyParams, Map<String, String> searchParams) {
        return codeDetailOutPort.getDetailsCount(detailRepo.count(helpDeskSearchExecutor.Search(searchParams, keyParams, Group.class, groupId, "cdGroupNo", "id")));
    }

    @Override
    public Optional<Detail> getDetail(String detailId) {
        return codeDetailOutPort.getDetail(detailRepo.findById(detailId));
    }

    @Override
    public Detail createDetail(Detail detail) {
        return codeDetailOutPort.createDetail(detailRepo.save(detail));
    }

    @Override
    public Detail updateDetail(Detail detail) {
        return codeDetailOutPort.updateDetail(detailRepo.save(detail));
    }

    @Override
    public Detail deleteDetail(Detail detail) {
        detailRepo.delete(detail);
        return codeDetailOutPort.deleteDetail(detail);
    }

    @Override
    public List<Detail> updateDetail(Group group, CodeDetailList codeDetailList) {
        List<Detail> details = new ArrayList<>();
        codeDetailList.getCreateDetail().forEach(r -> {
            r.setCdGroupNo(group);
            r.setRegistDt(LocalDateTime.now());
            this.createDetail(r);
            details.add(r);
        });
        codeDetailList.getUpdateDetail().forEach(r -> {
            try {
                Detail detail = this.getDetail(r.getId()).orElseThrow();
                detail.setUpdateDt(LocalDateTime.now());
                detail.updateDetail(r);
                this.updateDetail(detail);
                details.add(detail);
            } catch (Exception e) {
                details.add(Detail.builder().id(r.getId()).name("error").build());
            }
        });
        codeDetailList.getDeleteDetail().forEach(r -> {
            try {
                Detail detail = this.getDetail(r.getId()).orElseThrow();
                this.deleteDetail(detail);
                details.add(detail);
            } catch (Exception e) {
                details.add(Detail.builder().id(r.getId()).name("error").build());
            }
        });
        return details;
    }
}
