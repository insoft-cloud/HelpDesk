package com.insoft.helpdesk.application.domain.jpa.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "TB_HELP_MBR_TEST")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberTest implements UserDetails{

    @Id
    @Column(name = "USER_ID", length = 32, nullable = false)
    @Comment("사용자 아이디")
    @Size(max = 32)
    private String userId;

    @Column(name = "PSWD", length = 256, nullable = false)
    @Comment("비밀번호")
    @Size(max = 256)
    private String password;

    @Column(name = "ROLE", length = 32, nullable = false)
    @Comment("룰")
    @Size(max = 32)
    private String role;


    @Column(name = "USERNAME", length = 32, nullable = false)
    @Comment("유저이름")
    @Size(max = 32)
    private String username;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<>();
        auth.add(new SimpleGrantedAuthority(role));
        return auth;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
