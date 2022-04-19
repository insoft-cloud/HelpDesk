package com.insoft.helpdesk.application.adapter.out.db.code;

import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.application.domain.jpa.repo.code.GroupRepo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeGroupAdapter implements CodeGroupOutPort {


    @Override
    public Page<Group> getCodeGroups(Page<Group> groups) {
        return groups;
    }

    @Override
    public Optional<Group> getCodeGroup(Optional<Group> group) {
        return group;
    }

    @Override
    public Long countCodeGroups(Long count) {
        return count;
    }

    @Override
    public Group createCodeGroup(Group group) {
        return group;
    }

    @Override
    public Group updateCodeGroup(Group group) {
        return group;
    }

    @Override
    public Group deleteCodeGroup(Group group) {
        return group;
    }
}
