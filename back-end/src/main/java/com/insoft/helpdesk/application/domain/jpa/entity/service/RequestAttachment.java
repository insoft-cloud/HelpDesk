package com.insoft.helpdesk.application.domain.jpa.entity.service;


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
@Table(name = "TB_HELP_SVC_RQST_ATCHMNFL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestAttachment {

    @Id
    @Column(name = "ATCHMNFL_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("첨부파일 번호")
    @Size(max = 36)
    private String id;

    @JoinColumn(name = "SVC_RQST_NO")
    @Comment("서비스 요청정보")
    @Size(max = 36)
    @OneToOne
    private Request svcReqNo;

    @Column(name = "FILE_NM", nullable = false)
    @Comment("파일 이름")
    @Size(max = 255)
    private String fileNm;

    @Column(name = "FILE_PATH", length = 512)
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
    @Comment("등록일시: 디폴트 CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

}
