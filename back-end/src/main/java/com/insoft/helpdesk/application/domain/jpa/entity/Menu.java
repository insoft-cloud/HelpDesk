package com.insoft.helpdesk.application.domain.jpa.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
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
@Table(name = "TB_HELP_MENU")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class Menu {

    @Id
    @Column(name = "MENU_NO", length = 36, nullable = false, updatable = false)
    @Comment("메뉴번호")
    @Size(max = 16)
    private String id;

    @Column(name = "MENU_NM", length = 128, nullable = false)
    @Comment("메뉴명")
    @Size(max = 256)
    private String name;

    @Column(name = "USE_YN", length = 1, nullable = false)
    @Comment("사용여부(Y,N)")
    @Size(max = 1)
    private String UseYn;

    @Column(name = "SORT_NO", length = 4, nullable = false)
    @Comment("정렬번호")
    @Size(max = 4)
    private String sortNo;

    @Column(name = "LVL_NO", length = 4, nullable = false)
    @Comment("레벨번호")
    @Size(max = 4)
    private String lvlNo;

    @Column(name = "MENU_TY", length = 1)
    @Comment("메뉴유형")
    @Size(max = 1)
    private String menuty;

    @Column(name = "MENU_URL", length = 500, nullable = false)
    @Comment("메뉴URL")
    @Size(max = 500)
    private String menuurl;

    @Column(name = "UPR_MENU_NO", length = 36)
    @Comment("상위메뉴번호")
    @Size(max = 36)
    private String uprmenuNo;

    @Column(name = "USER_ID", length = 32, nullable = false)
    @Comment("사용자 아이디")
    @Size(max = 32)
    private String userId;

    @Column(name = "REGIST_DT", nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT")
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

}
