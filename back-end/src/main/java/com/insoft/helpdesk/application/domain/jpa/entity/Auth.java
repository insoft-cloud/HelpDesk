package com.insoft.helpdesk.application.domain.jpa.entity;

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
@Table(name = "TB_HELP_AUTH")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Auth {

    @Id
    @Column(name = "AUTH_NO", length = 36, nullable = false, updatable = false)
    @Comment("권한 번호")
    @Size(max = 36)
    private String id;

    @Column(name = "AUTH_NM", length = 255, nullable = false)
    @Comment("권한명")
    @Size(max = 255)
    private String name;

    @Column(name = "ADMIN_YN", length = 1)
    @Comment("관리자여부(Y,N)")
    @Size(max = 1)
    private String AdminYn;

    @Column(name = "UPD_AUTH_YN", length = 1)
    @Comment("수정권한여부(Y,N)")
    @Size(max = 1)
    private String UpdAuthYn;

    @Column(name = "REGIST_DT", nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT")
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;
}
