package com.insoft.helpdesk.application.biz.code.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * @Project     : HelpDesk
 * @ClassName   : CodeGroupOutPort
 * @FileName    : CodeGroupOutPort.java
 * @Date        : 2021-12-13
 * @author      : 박철한
 * @description : CodeGroup Service 에서 데이터 처리 결과 정보를 위한 Port
 */
public interface CodeGroupOutPort {

    Page<Group> getCodeGroups(Pageable pageable);
    Page<Group> getCodeGroupsUserId(String userId, Pageable pageable);
    Optional<Group>  getCodeGroup(String id);
    Long countCodeGroups();
    Long countCodeGroupsUserId(String userId);
    void createCodeGroup(Group group);
    void updateCodeGroup(Group group);
    void deleteCodeGroup(Group group);
}
