package com.insoft.helpdesk.application.domain.jpa.entity.notice;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Table(name = "TB_HELP_NTC_ATCHMNFL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicUpdate
public class NoticeAttachment {

    @Id
    @Column(name = "ATCHMNFL_NO_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("첨부파일 번호")
    @Size(max = 36)
    private String id;

    @JsonBackReference
    @JoinColumn(name = "NTC_NO", nullable = false)
    @Comment("공지사항번호")
    @ManyToOne
    private Notice ntcNo;

    @Column(name = "FILE_NM", length = 256, nullable = false)
    @Comment("파일이름")
    @Size(max = 256)
    private String fileNm;

    @Column(name = "FILE_PATH", length = 512, nullable = false)
    @Comment("파일경로")
    @Size(max = 512)
    private String filePath;

    @Column(name = "FILE_SIZE")
    @Comment("파일사이즈")
    private Long fileSize;

    @Column(name = "FILE_EXTSN", length = 16, nullable = false)
    @Comment("파일 확장자")
    @Schema(description = "파일 확장자")
    @Size(max = 16)
    private String fileExt;

    @Column(name = "REGIST_DT", length = 8, nullable = false)
    @Comment("등록일시")
    @Schema(description = "등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;


    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @Schema(description = "수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

    public  NoticeAttachment updateNoticeAttachment(NoticeAttachment noticeAttachment){
        this.ntcNo = noticeAttachment.ntcNo == null ? this.ntcNo : noticeAttachment.ntcNo;
        this.fileNm = noticeAttachment.fileNm == null ? this.fileNm : noticeAttachment.fileNm;
        this.filePath = noticeAttachment.filePath == null ? this.filePath : noticeAttachment.filePath;
        this.fileSize = noticeAttachment.fileSize == null ? this.fileSize : noticeAttachment.fileSize;
        this.fileExt = noticeAttachment.fileExt == null ? this.fileExt : noticeAttachment.fileExt;
        return this;
    }
}
