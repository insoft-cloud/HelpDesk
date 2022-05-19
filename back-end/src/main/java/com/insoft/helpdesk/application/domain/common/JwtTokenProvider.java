package com.insoft.helpdesk.application.domain.common;

import com.insoft.helpdesk.application.biz.member.port.in.LoginInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.refresh}")
    private String reFreshKey;

    private long passwordExpired = 1000L * 60 * 5; //5분만 토큰 유효

    private long expired = 1000L * 60 * 60; // 1시간만 토큰 유효

    private long refreshTokenValidMillisecond = 1000L * 60 * 60 * 24; // 24시간만 토큰 유효

    private Key key;

    private Key refreshKey;

    @Value("${jwt.subject}")
    private String subject;

    private final LoginInPort loginInPort;

    @PostConstruct
    protected void init() {
        key = new SecretKeySpec(DatatypeConverter.parseBase64Binary(secretKey), SignatureAlgorithm.HS256.getJcaName());
        refreshKey = new SecretKeySpec(DatatypeConverter.parseBase64Binary(reFreshKey), SignatureAlgorithm.HS256.getJcaName());
    }

    // Jwt 토큰 생성
    public String createToken(String userPk, List<GrantedAuthority> roles) {
        Claims claims = Jwts.claims().setSubject(subject).setId(userPk);
        claims.put("roles", roles);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expired))
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken() {
        Date now = new Date();
        Date reFreshExpired = new Date(now.getTime() + refreshTokenValidMillisecond);
        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(reFreshExpired)
                .signWith(refreshKey,SignatureAlgorithm.HS256)
                .compact();
    }

    public String createPasswordToken(String userPk,List<GrantedAuthority> roles) {
        Claims claims = Jwts.claims().setSubject(subject).setId(userPk);
        claims.put("roles", roles);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + passwordExpired))
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }


    @Transactional(readOnly = true)
    public Authentication getAuthentication(String token) {
        String id = this.getUserPk(token);
        Member member = loginInPort.signIn(Member.builder().userId(id).build());
        return new UsernamePasswordAuthenticationToken(member, "", member.getAuthorities());
    }


    public String getUserPk(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getId();
    }


    public long getTokenExpiredTime(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration().getTime();
    }

    public long getRefreshTokenExpiredTime(String token) {
        return Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(token).getBody().getExpiration().getTime();
    }

    public String resolveToken(HttpServletRequest req) {
        return req.getHeader("X-AUTH-TOKEN");
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateRefreshToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validatePasswordToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
