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
@Table(name = "TB_HELP_SVC_RQST_CHARGE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicUpdate
@Where(clause = "del_yn='N'")
public class RequestCharge {

    @Id
    @Column(name = "SVC_RQST_CHARGE_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("서비스 요청 담당번호")
    @Schema(description = "서비스 요청 담당번호")
    @Size(max = 36)
    private String id;

    @JsonBackReference
    @JoinColumn(name = "SVC_RQST_NO", referencedColumnName = "SVC_RQST_NO")
    @Comment("서비스 요청번호")
    @Schema(description = "서비스 요청번호")
    @ManyToOne(fetch = FetchType.LAZY)
    private Request svcReqNo;

    @Column(name = "USER_ID", length = 32)
    @Comment("사용자 아이디")
    @Size(max = 32)
    private String userId;

    @Column(name = "USER_NM", length = 16)
    @Comment("사용자 이름")
    @Size(max = 16)
    private String userNm;

    @Column(name = "DEL_YN", length = 1)
    @Comment("삭제여부")
    @Convert(converter = HelpDeskYNConverter.class)
    private Boolean delYn;

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

    @Column(name = "PSITN_INSTT_CD", length = 16, nullable = false)
    @Comment("소속기관 코드")
    @Size(max = 16)
    private String agencyCode;

    @Column(name = "PSITN_DEPT_NM", length = 256)
    @Comment("소속부서명")
    @Size(max = 256)
    private String departmentName;


    public RequestCharge updateRequestCharge(RequestCharge requestCharge){
        this.userId = requestCharge.userId == null ? this.userId : requestCharge.userId;
        this.userNm = requestCharge.userNm == null ? this.userNm : requestCharge.userNm;
        this.delYn = requestCharge.delYn == null ? this.delYn : requestCharge.delYn;;
        this.agencyCode = requestCharge.agencyCode == null ? this.agencyCode : requestCharge.agencyCode;
        this.departmentName = requestCharge.departmentName == null ? this.departmentName : requestCharge.departmentName;
        return this;
    }
}
