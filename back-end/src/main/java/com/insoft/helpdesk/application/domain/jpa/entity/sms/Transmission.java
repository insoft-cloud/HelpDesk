package com.insoft.helpdesk.application.domain.jpa.entity.sms;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_HELP_TRSMS_BRKDW")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicUpdate
public class Transmission {
    @Id
    @Column(name = "TRSMS_NO", length = 36, nullable = false, updatable = false)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(generator = "uuid2")
    @Comment("전송번호")
    @Size(max = 36)
    private String id;

    @Column(name = "CNTS", nullable = false, columnDefinition = "text")
    @Comment("내용")
    private String cnts;

    @Column(name = "TRSMS_DT", length = 8, nullable = false)
    @CreationTimestamp
    @Comment("전송일시")
    private LocalDateTime trsmsDt;

    @Column(name = "TRSMS_TY_CD", length = 16, nullable = false)
    @Comment("전송타입코드")
    private String trsmsTyCd;

    @Column(name = "TTL", length = 128, nullable = false)
    @Comment("제목")
    private String ttl;

    @Column(name = "RCVER_ID", length = 32, nullable = false)
    @Comment("수신자 아이디")
    private String recvId;

    @Column(name = "TY_CD", length = 16, nullable = false)
    @Comment("유형 코드")
    private String tyCd;
}
