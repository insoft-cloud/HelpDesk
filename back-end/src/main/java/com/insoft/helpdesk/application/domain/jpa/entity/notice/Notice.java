package com.insoft.helpdesk.application.domain.jpa.entity.notice;

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
@Table(name = "TB_HELP_NTC")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Notice {

    @Id
    @Column(name = "NTC_NO", length = 36, nullable = false, updatable = false)
    @Comment("공지사항번호")
    @Size(max = 36)
    private String id;

    @Column(name = "CTGRY_CD", length = 16, nullable = false)
    @Comment("카테고리코드")
    @Size(max = 16)
    private String ctgrycd;

    @Column(name = "TTL", length = 128, nullable = false)
    @Comment("제목")
    @Size(max = 128)
    private String ttl;

    @Column(name = "CNTS", columnDefinition = "text", nullable = false)
    @Comment("내용")
    private String cnts;

    @Column(name = "USER_ID", length = 32, nullable = false)
    @Comment("사용자 아이디")
    @Size(max = 32)
    private String userId;

    @Column(name = "USER_NM", length = 16, nullable = false)
    @Comment("사용자 이름")
    @Size(max = 16)
    private String userName;

    @Column(name = "RDCNT")
    @Comment("조회수")
    private String rdcnt;

    @Column(name = "DEL_YN", length = 1, nullable = false)
    @Comment("삭제여부(Y,N)")
    @Size(max = 1)
    private String delYn;

    @Column(name = "REGIST_DT", nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT")
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

    @Column(name = "NTC_REGIST_YN", length = 1)
    @Comment("공지사항 등록여부")
    @Size(max = 1)
    private String ntcregistyn;

    @Column(name = "USE_YN", length = 1, nullable = false)
    @Comment("사용여부")
    @Size(max = 1)
    private String useyn;

    @Column(name = "RSVTN_DT")
    @Comment("예약일시")
    @CreationTimestamp
    private LocalDateTime rsvtnDt;

}
