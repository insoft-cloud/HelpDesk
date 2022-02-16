package com.insoft.helpdesk.application.adapter.out.db.code;

import com.insoft.helpdesk.application.biz.code.port.out.CodeDetailOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.repo.code.DetailRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeDetailAdapter implements CodeDetailOutPort {

    final DetailRepo detailRepo;

    @Override
    public Page<Detail> getDetails(Pageable pageable) {
        return detailRepo.findAll(pageable);
    }

    @Override
    public Long getDetailsCount() {
        return detailRepo.count();
    }

    @Override
    public Page<Detail> getDetailsGroupId(String groupId, Pageable pageable) {
        return detailRepo.findAllByCdGroupNo(groupId, pageable);
    }

    @Override
    public Long getDetailsGroupIdCount(String groupId) {
        return detailRepo.countAllByCdGroupNo(groupId);
    }

    @Override
    public Optional<Detail> getDetail(String id) {
        return detailRepo.findById(id);
    }

    @Override
    public void createRequest(Detail detail) {
        detailRepo.save(detail);
    }

    @Override
    public void updateRequest(Detail detail) {
        detailRepo.save(detail);
    }

    @Override
    public void deleteRequest(Detail detail) {
        detailRepo.delete(detail);
    }
}
