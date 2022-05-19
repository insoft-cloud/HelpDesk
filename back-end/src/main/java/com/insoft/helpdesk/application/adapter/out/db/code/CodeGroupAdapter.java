package com.insoft.helpdesk.application.adapter.out.db.code;

import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
