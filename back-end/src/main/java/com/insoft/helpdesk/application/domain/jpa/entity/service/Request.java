package com.insoft.helpdesk.application.domain.jpa.entity.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
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

    @Column(name = "TTL", length = 128, nullable = false)
    @Comment("제목")
    @Size(max = 128)
    private String ttl;

    @Column(name = "CNTS", nullable = false, columnDefinition = "text")
    @Comment("내용")
    private String cnts;

    @Column(name = "DEL_YN", length = 1, nullable = false)
    @Comment("삭제여부")
    @Size(max = 1)
    private String delYn;

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

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "SVC_RQST_NO", referencedColumnName = "SVC_RQST_NO")
    private List<RequestAttachment> requestAttachments;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "SVC_RQST_NO", referencedColumnName = "SVC_RQST_NO")
    private List<RequestAttachmentHistory> requestAttachmentHistories;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "SVC_RQST_NO", referencedColumnName = "SVC_RQST_NO")
    private List<RequestHistory> requestHistories;


    public Request updateRequest(Request request){
        System.out.println(request);
        this.reqId = request.reqId == null ? this.reqId : request.reqId;
        this.tyCd = request.tyCd == null ? this.tyCd : request.tyCd;
        this.priortCd = request.priortCd == null ? this.priortCd : request.priortCd;
        this.ttl = request.ttl == null ? this.ttl : request.ttl;
        this.cnts = request.cnts == null ? this.cnts : request.cnts;
        this.delYn = request.delYn == null ? this.delYn : request.delYn;
        this.goalDt = request.goalDt == null ? this.goalDt : request.goalDt;
        this.requestAttachments = request.requestAttachments == null ? this.requestAttachments : request.requestAttachments;
        this.requestAttachmentHistories = request.requestAttachmentHistories == null ? this.requestAttachmentHistories : request.requestAttachmentHistories;
        this.requestHistories = request.requestHistories == null ? this.requestHistories : request.requestHistories;
        return this;
    }
}
