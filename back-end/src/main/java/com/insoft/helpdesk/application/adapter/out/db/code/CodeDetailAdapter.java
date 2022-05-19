package com.insoft.helpdesk.application.adapter.out.db.code;

import com.insoft.helpdesk.application.biz.code.port.out.CodeDetailOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeDetailAdapter implements CodeDetailOutPort {


    @Override
    public Page<Detail> getDetails(Page<Detail> details) {
        return details;
    }

    @Override
    public List<Detail> getDetailsList(List<Detail> details) {
        return details;
    }

    @Override
    public Long getDetailsCount(Long count) {
        return count;
    }

    @Override
    public Optional<Detail> getDetail(Optional<Detail> detail) {
        return detail;
    }

    @Override
    public Detail createDetail(Detail detail) {
        return detail;
    }

    @Override
    public Detail updateDetail(Detail detail) {
        return detail;
    }

    @Override
    public List updateDetail(List<Detail> details) {
        return details;
    }

    @Override
    public Detail deleteDetail(Detail detail) {
        return detail;
    }
}
