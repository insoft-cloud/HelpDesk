package com.insoft.helpdesk.application.biz.code.service;

import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.application.domain.jpa.repo.code.GroupRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeGroupService implements CodeGroupInPort {

    final CodeGroupOutPort codeGroupOutPort;

    final GroupRepo groupRepo;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    @Override
    public Page<Group> getCodeGroups(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable) {
//        return codeGroupOutPort.getCodeGroups(groupRepo.findAll(helpDeskSearchExecutor.search(searchParams, keyParams), pageable));
        return codeGroupOutPort.getCodeGroups(groupRepo.findAll(helpDeskSearchExecutor.search(searchParams,keyParams), pageable));
    }

    @Override
    public Optional<Group> getCodeGroup(String id) {
        return codeGroupOutPort.getCodeGroup(groupRepo.findById(id));
    }

    @Override
    public Long countCodeGroups(Map<String,String> keyParams, Map<String,String> searchParams) {
        return codeGroupOutPort.countCodeGroups(groupRepo.count(helpDeskSearchExecutor.search(searchParams, keyParams)));
    }

    @Override
    public Group createCodeGroup(Group group) {
        return codeGroupOutPort.createCodeGroup(groupRepo.save(group));
    }

    @Override
    public Group updateCodeGroup(Group group) {
        return codeGroupOutPort.updateCodeGroup(groupRepo.save(group));
    }

    @Override
    public Group deleteCodeGroup(Group group) {
        groupRepo.delete(group);
        return codeGroupOutPort.deleteCodeGroup(group);
    }
}
