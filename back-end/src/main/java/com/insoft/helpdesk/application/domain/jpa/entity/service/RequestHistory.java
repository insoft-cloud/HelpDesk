package com.insoft.helpdesk.application.domain.jpa.entity.service;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.insoft.helpdesk.util.content.HelpDeskYNConverter;
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
@Table(name = "TB_HELP_SVC_RQST_HIST")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicUpdate
@Where(clause = "del_yn='N'")
public class RequestHistory {

    @Id
    @Column(name = "SVC_RQST_HIST_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("서비스 요청 이력번호")
    @Size(max = 36)
    private String id;

    @JsonBackReference
    @JoinColumn(name = "SVC_RQST_NO", referencedColumnName = "SVC_RQST_NO")
    @Comment("서비스 요청번호")
    @Schema(description = "서비스 요청번호")
    @ManyToOne(fetch = FetchType.LAZY)
    private Request svcReqNo;

    @Column(name = "RQST_CD", length = 8)
    @Comment("요청 코드(서비스처리 시간 통계자료 구분용)")
    private String rqstCd;

    @Column(name = "INPUT_MSG", columnDefinition = "text", nullable = false)
    @Comment("입력 메시지")
   private String inputMsg;

    @Column(name = "DEL_YN", length = 1)
    @Comment("삭제여부")
    @Convert(converter = HelpDeskYNConverter.class)
    private Boolean delYn;

    @Column(name = "REGIST_DT", length = 8, nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;


    @Column(name = "USER_ID", length = 32)
    @Comment("사용자 아이디")
    @Size(max = 32)
    private String userId;

    @Column(name = "USER_NM", length = 16)
    @Comment("사용자 이름")
    @Size(max = 16)
    private String userNm;

    public RequestHistory updateRequestHistory(RequestHistory requestHistory){
        this.delYn = requestHistory.delYn == null ? this.delYn : requestHistory.delYn;
        this.inputMsg = requestHistory.inputMsg == null ? this.inputMsg : requestHistory.inputMsg;
        this. userId = requestHistory.userId == null ? this.userId : requestHistory.userId;
        this. userNm = requestHistory.userNm == null ? this.userNm : requestHistory.userNm;
        this.rqstCd = requestHistory.rqstCd == null ? this.rqstCd : requestHistory.rqstCd;
        return this;
    }
}
