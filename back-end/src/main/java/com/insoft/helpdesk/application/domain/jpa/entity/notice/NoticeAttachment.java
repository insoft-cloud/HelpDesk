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
@Table(name = "TB_HELP_NTC_ATCHMNFL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class NoticeAttachment {

    @Id
    @Column(name = "ATCHMNFL_NO_NO", length = 36, nullable = false, updatable = false)
    @Comment("첨부파일번호")
    @Size(max = 36)
    private String id;

    @Column(name = "NTC_NO", length = 36)
    @Comment("공지사항번호")
    @Size(max = 36)
    private String ntcNo;

    @Column(name = "FILE_NM", length = 256, nullable = false)
    @Comment("파일이름")
    @Size(max = 256)
    private String filename;

    @Column(name = "FILE_PATH", length = 512, nullable = false)
    @Comment("파일경로")
    @Size(max = 512)
    private String filepath;

    @Column(name = "FILE_SIZE")
    @Comment("파일사이즈")
    private Long filesize;

    @Column(name = "REGIST_DT", nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT")
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;
}
