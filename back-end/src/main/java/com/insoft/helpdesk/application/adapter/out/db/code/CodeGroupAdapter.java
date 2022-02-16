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

    final GroupRepo groupRepo;


    @Override
    public Page<Group> getCodeGroups(Pageable pageable) {
        return groupRepo.findAll(pageable);
    }

    @Override
    public Page<Group> getCodeGroupsUserId(String userId, Pageable pageable) {
        return groupRepo.findAllByUserId(userId, pageable);
    }

    @Override
    public Optional getCodeGroup(String id) {
        return groupRepo.findById(id);
    }

    @Override
    public Long countCodeGroups() {
        return groupRepo.count();
    }

    @Override
    public Long countCodeGroupsUserId(String userId) {
        return groupRepo.countAllByUserId(userId);
    }

    @Override
    public void createCodeGroup(Group group) {
        groupRepo.save(group);
    }

    @Override
    public void updateCodeGroup(Group group) {
        groupRepo.save(group);
    }

    @Override
    public void deleteCodeGroup(Group group) {
        groupRepo.delete(group);
    }
}
