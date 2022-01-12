package com.insoft.helpdesk.application.adapter.out.db.code;

import com.insoft.helpdesk.application.biz.code.port.out.CodeGroupOutPort;
import com.insoft.helpdesk.application.domain.common.ResponseMessage;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.application.domain.jpa.repo.code.GroupRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DBCodeGroupAdapter implements CodeGroupOutPort {

    private static final Logger logger = LoggerFactory.getLogger(DBCodeGroupAdapter.class);

    private final GroupRepo groupRepo;

    public DBCodeGroupAdapter(GroupRepo groupRepo) {
        this.groupRepo = groupRepo;
    }

    @Override
    public ResponseMessage selectCountCodeGroups() {
        return ResponseMessage.builder().count(Long.valueOf(groupRepo.count()).intValue()).build();
    }

    @Override
    public ResponseMessage selectCountCodeGroups(String groupId) {
        return ResponseMessage.builder().count(Long.valueOf(groupRepo.countAllByUserId(groupId)).intValue()).build();
    }

    @Override
    public ResponseMessage selectCodeGroups() {
        return ResponseMessage.builder().data(groupRepo.findAll()).count(Long.valueOf(groupRepo.count()).intValue()).build();
    }

    @Override
    public ResponseMessage selectCodeGroups(String groupId) {
        return ResponseMessage.builder().data(groupRepo.findAllByUserId(groupId)).count(Long.valueOf(groupRepo.countAllByUserId(groupId)).intValue()).build();
    }

    @Override
    public ResponseMessage selectCodeGroupId(String id) {
        return ResponseMessage.builder().data(groupRepo.findById(id)).build();
    }

    @Override
    public ResponseMessage saveCodeGroup(Group group) {
        return ResponseMessage.builder().build();
    }

    @Override
    public ResponseMessage updateCodeGroup(Group group) {
        return ResponseMessage.builder().build();
    }

    @Override
    public ResponseMessage deleteCodeGroup(Group group) {
        return ResponseMessage.builder().build();
    }
}
