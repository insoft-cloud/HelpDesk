package com.insoft.helpdesk.application.domain.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
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
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("권한 번호")
    @Size(max = 36)
    @JsonIgnore
    private String id;

    @Column(name = "AUTH_NM", length = 255, nullable = false)
    @Comment("권한명")
    @Size(max = 255)
    private String name;

    @Column(name = "AUTH_CD", length = 256, nullable = false)
    @Comment("권한코드")
    @Size(max = 256)
    private String cdId;

    @Column(name = "ADMIN_YN", length = 1)
    @Comment("관리자여부(Y,N)")
    @Size(max = 1)
    private String adminYn;

    @Column(name = "UPD_AUTH_YN", length = 1)
    @Comment("수정권한여부(Y,N)")
    @Size(max = 1)
    private String updAuthYn;

    @Column(name = "REGIST_DT", nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT")
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

    public Auth updateAuth(Auth auth){
        this.id = auth.id == null ? this.id : auth.id;
        this.name = auth.name == null ? this.name : auth.name;
        this.cdId = auth.cdId == null ? this.cdId : auth.cdId;
        this.adminYn = auth.adminYn == null ? this.adminYn : auth.adminYn;
        this.updAuthYn = auth.updAuthYn == null ? this.updAuthYn : auth.updAuthYn;
        return this;
    }

}
