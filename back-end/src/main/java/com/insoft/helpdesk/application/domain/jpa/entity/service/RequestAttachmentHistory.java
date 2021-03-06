package com.insoft.helpdesk.application.domain.jpa.entity.service;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Table(name = "TB_HELP_SVC_RQST_HIST_ATCHMNFL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestAttachmentHistory {

    @Id
    @Column(name = "ATCHMNFL_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("첨부파일 번호")
    @Size(max = 36)
    private String id;

    @JsonBackReference
    @JoinColumn(name = "SVC_RQST_HIST_NO", referencedColumnName ="SVC_RQST_HIST_NO")
    @Schema(description = "서비스 요청 이력번호")
    @Comment("서비스 요청 이력번호")
    @ManyToOne(fetch = FetchType.LAZY)
    private RequestHistory svcReqHistNo;

    @Column(name = "FILE_NM", length = 256, nullable = false)
    @Comment("파일 이름")
    @Size(max = 256)
    private String fileNm;

    @Column(name = "FILE_PATH", length = 512, nullable = false)
    @Comment("파일 경로")
    @Size(max = 512)
    private String filePath;

    @Column(name = "FILE_SIZE", nullable = false)
    @Comment("파일 사이즈")
    private Long fileSize;

    @Column(name = "FILE_EXTSN", length = 16, nullable = false)
    @Comment("파일 확장자")
    @Size(max = 16)
    private String fileExt;

    @Column(name = "REGIST_DT", length = 8, nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;


    public RequestAttachmentHistory update(RequestAttachmentHistory requestAttachmentHistory){
        this.svcReqHistNo = requestAttachmentHistory.svcReqHistNo == null ? this.svcReqHistNo : requestAttachmentHistory.svcReqHistNo;
        this.fileNm = requestAttachmentHistory.fileNm == null ? this.fileNm : requestAttachmentHistory.fileNm;
        this.filePath = requestAttachmentHistory.filePath == null ? this.filePath : requestAttachmentHistory.filePath;
        this.fileSize = requestAttachmentHistory.fileSize == null ? this.fileSize : requestAttachmentHistory.fileSize;
        this.fileExt = requestAttachmentHistory.fileExt == null ? this.fileExt : requestAttachmentHistory.fileExt;
        this.registDt = requestAttachmentHistory.registDt == null ? this.registDt : requestAttachmentHistory.registDt;
        return this;
    }
}
