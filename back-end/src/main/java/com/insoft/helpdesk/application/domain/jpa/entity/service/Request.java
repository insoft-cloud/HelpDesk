package com.insoft.helpdesk.application.domain.jpa.entity.service;

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
@Table(name = "TB_HELP_SVC_RQST")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicUpdate
@Where(clause = "del_yn='N'")
public class Request {

    @Id
    @Column(name = "SVC_RQST_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("서비스요청번호")
    @Size(max = 36)
    private String id;

    @Column(name = "RQSTR_ID", length = 32, nullable = false)
    @Comment("요청자 아이디")
    @Size(max = 32)
    private String reqId;

    @Column(name = "TY_CD", length = 16)
    @Comment("유형 코드")
    @Size(max = 16)
    private String tyCd;

    @Column(name = "PRIORT_CD", length = 16)
    @Comment("우선순위 코드")
    @Size(max = 16)
    private String priortCd;

    @Column(name = "SYS_CD", length = 16, nullable = false)
    @Comment("시스템 코드")
    @Size(max = 16)
    private String sysCd;

    @Column(name = "CHRGPR_NM", length = 16)
    @Comment("담당자 이름")
    @Size(max = 16)
    private String chrgprNm;

    @Column(name = "RQSTR_NM", length = 16, nullable = false)
    @Comment("요청자 이름")
    @Size(max = 16)
    private String reqNm;

    @Column(name = "PRCS_STTS_CD", length = 16)
    @Comment("처리상태코드")
    @Size(max = 16)
    private String prcsSttsCd;

    @Column(name = "EVL", length = 1)
    @Comment("평가")
    @Size(max = 1)
    private String evl;

    @Column(name = "TTL", length = 128, nullable = false)
    @Comment("제목")
    @Size(max = 128)
    private String ttl;

    @Column(name = "CNTS", nullable = false, columnDefinition = "text")
    @Comment("내용")
    private String cnts;

    @Column(name = "DEL_YN", length = 1, nullable = false)
    @Comment("삭제여부")
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

    @Column(name = "GOAL_DT")
    @Comment("목표일시")
    private LocalDateTime goalDt;

    public Request updateRequest(Request request){
        this.reqId = request.reqId == null ? this.reqId : request.reqId;
        this.reqNm = request.reqNm == null ? this.reqNm : request.reqNm;
        this.tyCd = request.tyCd == null ? this.tyCd : request.tyCd;
        this.priortCd = request.priortCd == null ? this.priortCd : request.priortCd;
        this.prcsSttsCd = request.prcsSttsCd == null ? this.prcsSttsCd : request.prcsSttsCd;
        this.chrgprNm = request.chrgprNm == null ? this.chrgprNm : request.chrgprNm;
        this.ttl = request.ttl == null ? this.ttl : request.ttl;
        this.cnts = request.cnts == null ? this.cnts : request.cnts;
        this.delYn = request.delYn == null ? this.delYn : request.delYn;
        this.goalDt = request.goalDt == null ? this.goalDt : request.goalDt;
        this.evl = request.evl == null ? this.evl : request.evl;
        return this;
    }
}
