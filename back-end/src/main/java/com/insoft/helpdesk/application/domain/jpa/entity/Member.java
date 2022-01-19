package com.insoft.helpdesk.application.domain.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "TB_HELP_MBR")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Member implements UserDetails {

    @Id
    @Column(name = "USER_ID", length = 32, nullable = false)
    @Comment("사용자 아이디")
    @Size(max = 32)
    private String userId;

    @Column(name = "PSWD", length = 100, nullable = false)
    @Comment("비밀번호")
    @Size(max = 100)
    private String password;

    @Column(name = "LOGIN_RETRY_CNT", length =  4)
    @Comment("로그인 재시도수")
    @Builder.Default
    private BigDecimal loginRetryCnt = BigDecimal.ZERO;

    @Column(name = "PSITN_INSTT_CD", length = 16, nullable = false)
    @Comment("소속기관 코드")
    @Size(max = 16)
    private String agencyCode;

    @Column(name = "PSITN_DEPT_NM", length = 256)
    @Comment("소속부서명")
    @Size(max = 256)
    private String departmentName;

    @Column(name = "JOB_CD", length = 16)
    @Comment("업무코드")
    @Size(max = 16)
    private String jobCode;

    @Column(name = "RNK_CD", length = 16, nullable = false)
    @Comment("직급코드")
    @Size(max = 16)
    private String rankCode;

    @Column(name = "NM", length = 16, nullable = false)
    @Comment("이름")
    @Size(max = 16)
    private String username;

    @Column(name = "EMAIL_ADDR", length = 64, nullable = false)
    @Comment("이메일")
    @Size(max = 64)
    private String email;

    @Column(name = "MBTLNUM", length = 11, nullable = false)
    @Comment("휴대폰번호")
    @Size(max = 11)
    private String phoneNumber;

    @Column(name = "INDVL_INFO_COLCT_YN", length = 1, nullable = false)
    @Comment("개인정보 수집 여부")
    @Size(max = 1)
    private String informationCollectionYN;

    @Column(name = "TRMS_AGRE_YN", length = 1, nullable = false)
    @Comment("약관 동의 여부")
    @Size(max = 1)
    private String termsAgrYN;

    @Column(name = "SMS_RCPTN_YN", length = 1)
    @Comment("SMS 수신 여부")
    @Size(max = 1)
    private String smsRcptYN;

    @Column(name = "JOIN_CONFM_YN", length = 1)
    @Comment("가입 승인 여부")
    @Size(max = 1)
    private String joinConfirmYN;

    @Column(name = "JOIN_DT", length = 8, nullable = false)
    @Comment("가입일시")
    @CreationTimestamp
    private LocalDateTime joinDt;

    @Column(name = "UPD_DT", length = 8)
    @Comment("수정일시")
    @UpdateTimestamp
    private LocalDateTime updateDt;

    @Transient
    @JsonIgnore
    private Collection<? extends GrantedAuthority> authorities;

    @Transient
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<>();
        auth.add(new SimpleGrantedAuthority("USER"));
        auth.add(new SimpleGrantedAuthority("ADMIN"));
        return auth;
    }

    @Override
    @JsonIgnore
    @Transient
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    @Transient
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    @Transient
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    @Transient
    public boolean isEnabled() {
        return true;
    }
}
