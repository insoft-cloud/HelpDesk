package com.insoft.helpdesk.application.biz.code.service;

import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeGroupService implements CodeGroupInPort {

    final CodeGroupOutPort codeGroupOutPort;


    @Override
    public Page<Group> getCodeGroups(Pageable pageable) {
        return codeGroupOutPort.getCodeGroups(pageable);
    }

    @Override
    public Page<Group> getCodeGroupsUserId(String userId, Pageable pageable) {
        return codeGroupOutPort.getCodeGroupsUserId(userId, pageable);
    }

    @Override
    public Optional getCodeGroup(String id) {
        return codeGroupOutPort.getCodeGroup(id);
    }

    @Override
    public Long countCodeGroups() {
        return codeGroupOutPort.countCodeGroups();
    }

    @Override
    public Long countCodeGroupsUserId(String userId) {
        return codeGroupOutPort.countCodeGroupsUserId(userId);
    }

    @Override
    public void createCodeGroup(Group group) {
        codeGroupOutPort.createCodeGroup(group);
    }

    @Override
    public void updateCodeGroup(Group group) {
        codeGroupOutPort.updateCodeGroup(group);
    }

    @Override
    public void deleteCodeGroup(Group group) {
        codeGroupOutPort.deleteCodeGroup(group);
    }
}
