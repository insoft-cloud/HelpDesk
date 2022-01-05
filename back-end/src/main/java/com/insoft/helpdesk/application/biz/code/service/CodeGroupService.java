package com.insoft.helpdesk.application.biz.code.service;

import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CodeGroupService implements CodeGroupInPort {

    final CodeGroupOutPort codeGroupOutPort;

    public CodeGroupService(CodeGroupOutPort codeGroupOutPort) {
        this.codeGroupOutPort = codeGroupOutPort;
    }


    @Override
    public long selectCountCodeGroups() {
        return codeGroupOutPort.selectCountCodeGroups();
    }

    @Override
    public long selectCountCodeGroups(String userId) {
        return codeGroupOutPort.selectCountCodeGroups(userId);
    }

    @Override
    public List selectCodeGroups() {
        return codeGroupOutPort.selectCodeGroups();
    }

    @Override
    public List selectCodeGroups(String userId) {
        return codeGroupOutPort.selectCodeGroups(userId);
    }

    @Override
    public Optional<Group> selectCodeGroupId(String id) {
        return codeGroupOutPort.selectCodeGroupId(id);
    }

    @Override
    public Group saveCodeGroup(Group group) {
        return codeGroupOutPort.saveCodeGroup(group);
    }

    @Override
    public Group updateCodeGroup(Group group) {
        return codeGroupOutPort.updateCodeGroup(group);
    }

    @Override
    public void deleteCodeGroup(Group group) {
        codeGroupOutPort.deleteCodeGroup(group);
    }
}
