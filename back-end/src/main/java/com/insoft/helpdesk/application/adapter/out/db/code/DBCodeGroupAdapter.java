package com.insoft.helpdesk.application.adapter.out.db.code;

import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.application.domain.jpa.repo.code.GroupRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DBCodeGroupAdapter implements CodeGroupOutPort {

    private static final Logger logger = LoggerFactory.getLogger(DBCodeGroupAdapter.class);

    private final GroupRepo groupRepo;

    public DBCodeGroupAdapter(GroupRepo groupRepo) {
        this.groupRepo = groupRepo;
    }

    @Override
    public long selectCountCodeGroups() {
        return groupRepo.count();
    }

    @Override
    public long selectCountCodeGroups(String userId) {
        return groupRepo.countAllByUserId(userId);
    }

    @Override
    public List selectCodeGroups() {
        return groupRepo.findAll();
    }

    @Override
    public List selectCodeGroups(String groupId) {
        return groupRepo.findAllByUserId(groupId);
    }

    @Override
    public Optional<Group> selectCodeGroupId(String id) {
        return groupRepo.findById(id);
    }

    @Override
    public Group saveCodeGroup(Group group) {
        return groupRepo.save(group);
    }

    @Override
    public Group updateCodeGroup(Group group) {
        return groupRepo.save(group);
    }

    @Override
    public void deleteCodeGroup(Group group) {
        groupRepo.delete(group);
    }
}
