package com.insoft.helpdesk.application.domain.jpa.entity.service;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "요청 첨부 파일 모델")
@Entity
@Table(name = "TB_HELP_SVC_RQST_ATCHMNFL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicUpdate
public class RequestAttachment {

    @Id
    @Column(name = "ATCHMNFL_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("첨부파일 번호")
    @Schema(description = "첨부파일 번호")
    @Size(max = 36)
    private String id;

    @JsonBackReference
    @JoinColumn(name = "SVC_RQST_NO", referencedColumnName = "SVC_RQST_NO")
    @Comment("서비스 요청번호")
    @Schema(description = "서비스 요청번호")
    @ManyToOne(fetch = FetchType.LAZY)
    private Request svcReqNo;

    @Column(name = "FILE_NM", nullable = false)
    @Comment("파일 이름")
    @Schema(description = "파일 이름")
    @Size(max = 255)
    private String fileNm;

    @Column(name = "FILE_PATH", length = 512)
    @Comment("파일 경로")
    @Schema(description = "파일 경로")
    @Size(max = 512)
    private String filePath;

    @Column(name = "FILE_SIZE", nullable = false)
    @Comment("파일 사이즈")
    @Schema(description = "파일 사이즈")
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

    public RequestAttachment updateRequestAttachment(RequestAttachment requestAttachment){
        this.svcReqNo = requestAttachment.svcReqNo == null ? this.svcReqNo : requestAttachment.svcReqNo;
        this.fileNm = requestAttachment.fileNm == null ? this.fileNm : requestAttachment.fileNm;
        this.filePath = requestAttachment.filePath == null ? this.filePath : requestAttachment.filePath;
        this.fileSize = requestAttachment.fileSize == null ? this.fileSize : requestAttachment.fileSize;
        this.fileExt = requestAttachment.fileExt == null ? this.fileExt : requestAttachment.fileExt;
        return this;
    }
}

