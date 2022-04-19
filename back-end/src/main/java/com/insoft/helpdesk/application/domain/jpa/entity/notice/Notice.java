package com.insoft.helpdesk.application.domain.jpa.entity.notice;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.insoft.helpdesk.util.content.HelpDeskYNConverter;
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
@Table(name = "TB_HELP_NTC")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicUpdate
@Where(clause = "del_yn='N'")
public class Notice {

    @Id
    @Column(name = "NTC_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
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
    @Convert(converter = HelpDeskYNConverter.class)
    private Boolean delYn;

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


    public Notice updateNotice(Notice notice){
        this.ctgrycd = notice.ctgrycd == null ? this.ctgrycd : notice.ctgrycd;
        this.ttl = notice.ttl == null ? this.ttl : notice.ttl;
        this.cnts = notice.cnts == null ? this.cnts : notice.cnts;
        this.delYn = notice.delYn == null ? this.delYn : notice.delYn;
        this.ntcregistyn = notice.ntcregistyn == null ? this.ntcregistyn : notice.ntcregistyn;
        this.rdcnt = notice.rdcnt == null ? this.rdcnt : notice.rdcnt;
        return this;
    }

}
