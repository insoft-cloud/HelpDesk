package com.insoft.helpdesk.application.biz.code.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;

import java.util.List;
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

    /**
     * @Method      : selectCountCodeGroups
     * @Param       : []
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의 전체 데이터 수 조회
     * @return      : long
     */
    long selectCountCodeGroups();

    /**
     * @Method      : selectCountCodeGroups
     * @Param       : [userId]
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의 userId가 일치한 데이터 수 조회
     * @return      : long
     */
    long selectCountCodeGroups(String userId);

    /**
     * @Method      : selectCodeGroups
     * @Param       : []
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의 전체 데이터 조회
     * @return      : java.util.List
     */
    List selectCodeGroups();

    /**
     * @Method      : selectCodeGroups
     * @Param       : [userId]
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의 param 속성 값과 일치한 데이터 조회
     * @return      : java.util.List
     */
    List selectCodeGroups(String userId);

    /**
     * @Method      : selectCodeGroupId
     * @Param       : [groupId]
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의 ID 값과 일치한 데이터 조회
     * @return      : com.insoft.helpdesk.jpa.entity.code.Group
     */
     Optional<Group> selectCodeGroupId(String id);

    /**
     * @Method      : saveCodeGroup
     * @Param       : [group]
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의  데이터 저장
     * @return      : com.insoft.helpdesk.jpa.entity.code.Group
     */
    Group saveCodeGroup(Group group);

    /**
     * @Method      : updateCodeGroup
     * @Param       : [group]
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의  데이터 변경
     * @return      : com.insoft.helpdesk.jpa.entity.code.Group
     */
    Group updateCodeGroup(Group group);

    /**
     * @Method      : deleteCodeGroup
     * @Param       : [group]
     * @Date        : 2021-12-13
     * @author      : 박철한
     * @description : CodeGroup 의  데이터 삭제
     * @return      : void
     */
    void deleteCodeGroup(Group group);
}
