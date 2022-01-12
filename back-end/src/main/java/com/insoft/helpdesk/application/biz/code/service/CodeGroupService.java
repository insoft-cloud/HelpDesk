package com.insoft.helpdesk.application.biz.code.service;

import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.http.HttpStatus;
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
    public ResponseMessage selectCountCodeGroups() {
        return codeGroupOutPort.selectCountCodeGroups();
    }

    @Override
    public ResponseMessage selectCountCodeGroups(String userId) {
        return codeGroupOutPort.selectCountCodeGroups(userId);
    }

    @Override
    public ResponseMessage selectCodeGroups() {
        return codeGroupOutPort.selectCodeGroups();
    }

    @Override
    public ResponseMessage selectCodeGroups(String userId) {
        return codeGroupOutPort.selectCodeGroups(userId);
    }

    @Override
    public ResponseMessage selectCodeGroupId(String id) {
        return codeGroupOutPort.selectCodeGroupId(id);
    }

    @Override
    public ResponseMessage saveCodeGroup(Group group) {
        return codeGroupOutPort.saveCodeGroup(group);
    }

    @Override
    public ResponseMessage updateCodeGroup(Group group) {
        return codeGroupOutPort.updateCodeGroup(group);
    }

    @Override
    public ResponseMessage deleteCodeGroup(Group group) {
        return codeGroupOutPort.deleteCodeGroup(group);
    }
}
