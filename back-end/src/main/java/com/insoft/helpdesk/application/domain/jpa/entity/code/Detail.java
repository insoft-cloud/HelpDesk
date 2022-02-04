package com.insoft.helpdesk.application.domain.jpa.entity.code;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_HELP_CD_DTL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Detail {

    @Id
    @Column(name = "CD_NO", length = 16, nullable = false, updatable = false)
    @Comment("코드번호")
    @Size(max = 16)
    private String id;

    @Column(name = "CD_NM", length = 256, nullable = false)
    @Comment("코드명")
    @Size(max = 256)
    private String name;

    @Column(name = "CD_EXPLNT", length = 512, nullable = false)
    @Comment("코드설명")
    @Size(max = 512)
    private String cdExplnt;

    @Column(name = "CD_GRP_NO", length = 16, nullable = false)
    @Comment("코드 그룹 번호")
    @Size(max = 16)
    private String cdGroupNo;

    @Column(name = "DEL_YN", length = 1, nullable = false)
    @Comment("삭제여부(Y,N)")
    @Size(max = 1)
    private String delYn;

    @Column(name = "USER_ID", length = 32, nullable = false)
    @Comment("사용자 아이디(등록자)")
    @Size(max = 32)
    private String userId;

    @Column(name = "REGIST_DT", length = 8, nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

}