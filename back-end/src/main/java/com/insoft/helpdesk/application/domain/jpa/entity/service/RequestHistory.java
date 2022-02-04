package com.insoft.helpdesk.application.domain.jpa.entity.service;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
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
@Table(name = "TB_HELP_SVC_RQST_HIST")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class RequestHistory {

    @Id
    @Column(name = "SVC_RQST_HIST_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("서비스 요청 이력번호")
    @Size(max = 36)
    private String id;

    @Column(name = "USER_ID", length = 32)
    @Comment("사용자 아이디")
    @Size(max = 32)
    private String userId;

    @Column(name = "USER_NM", length = 16)
    @Comment("사용자 이름")
    @Size(max = 16)
    private String userNm;

    @Column(name = "PRCS_STTS_CD", length = 16)
    @Comment("처리상태코드")
    @Size(max = 16)
    private String prcssttsCp;

    @Column(name = "INPUT_MSG", columnDefinition = "text", nullable = false)
    @Comment("입력 메시지")
   private String inputMsg;

    @Column(name = "DEL_YN", length = 1)
    @Comment("삭제여부")
    private String delYn;

    @Column(name = "STTS_CD", length = 1)
    @Comment("상태코드")
    private String sttsCd;

    @Column(name = "REGIST_DT", length = 8, nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

    @JsonBackReference
    @JoinColumn(name = "SVC_RQST_NO", referencedColumnName = "SVC_RQST_NO")
    @Comment("서비스 요청번호")
    @ManyToOne(fetch = FetchType.LAZY)
    private Request svcReqNo;
}
