package com.insoft.helpdesk.application.domain.jpa.entity.code;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
//@Table(name = "TB_HELP_CD_GRP")
@Table(name = "TB_HELP_CD_GRP")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Group {

    @Id
    @Column(name = "CD_NO", length = 16, nullable = false, updatable = false)
//    @GenericGenerator(name = "uuid2", strategy = "uuid2")
//    @GeneratedValue(generator = "uuid2")
    @Comment("코드번호")
    @Size(max = 16)
    private String id;

    @Column(name = "CD_NM", length = 256, nullable = false)
    @Comment("코드명")
    @Size(max = 256)
    private String name;


    @Column(name = "DEL_YN", length = 1)
    @Comment("삭제여부(Y,N)")
    @Size(max = 1)
    private String delYn;

    @Column(name = "USER_ID", length = 32, nullable = false)
    @Comment("사용자 아이디(등록자)")
    @Size(max = 32)
    private String userId;

    @Column(name = "REGIST_DT", length = 8, nullable = false)
    @Comment("등록일시: 디폴트 CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

}
