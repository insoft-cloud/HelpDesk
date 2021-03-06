package com.insoft.helpdesk.application.domain.jpa.entity.code;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.insoft.helpdesk.util.content.HelpDeskYNConverter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_HELP_CD_DTL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "del_yn='N'")
//@SequenceGenerator(
//        name = "DTL_SEQ_GENERATOR",
//        sequenceName = "DTL_SEQ",
//        initialValue = 50,
//        allocationSize = 1
//)
public class Detail {

    @Id
    @Column(name = "CD_NO", length = 36, nullable = false)
    @Comment("코드번호")
    @Size(max = 36)
    private String id;

    @Column(name = "CD_ID", length = 256, nullable = false)
    @Comment("코드아이디")
    @Size(max = 256)
    private String cdId;

    @Column(name = "CD_NM", length = 256, nullable = false)
    @Comment("코드명")
    @Size(max = 256)
    private String name;

    @Column(name = "CD_EXPLNT", length = 512, nullable = false)
    @Comment("코드설명")
    @Size(max = 512)
    private String cdExplnt;

    @Column(name = "DEL_YN", length = 1, nullable = false)
    @Comment("삭제여부(Y,N)")
    @Convert(converter = HelpDeskYNConverter.class)
    private Boolean delYn;

    @Column(name = "USER_ID", length = 32, nullable = false)
    @Comment("사용자 아이디(등록자)")
    @Size(max = 32)
    private String userId;

    @Column(name = "REGIST_DT", length = 8, nullable = false)
    @Comment("등록일시")
    @CreationTimestamp
    private LocalDateTime registDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;


    @JsonBackReference
    @JoinColumn(name = "CD_GRP_NO", referencedColumnName = "CD_GRP_NO")
    @Comment("코드번호")
    @Schema(description = "코드번호")
    @ManyToOne(fetch = FetchType.LAZY)
    private Group cdGroupNo;

    public Detail updateDetail(Detail detail){
        this.userId = detail.userId == null ? this.userId : detail.userId;
        this.delYn = detail.delYn == null ? this.delYn : detail.delYn;
        this.cdExplnt = detail.cdExplnt == null ? this.cdExplnt : detail.cdExplnt;
        this.name = detail.name == null ? this.name : detail.name;
        this.cdId = detail.cdId == null ? this.cdId : detail.cdId;
        return this;
    }


}
