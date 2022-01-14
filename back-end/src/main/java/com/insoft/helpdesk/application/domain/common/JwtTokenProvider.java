package com.insoft.helpdesk.application.domain.common;

import com.insoft.helpdesk.application.biz.member.service.MemberService;
import com.insoft.helpdesk.application.domain.jpa.entity.MemberTest;
import lombok.RequiredArgsConstructor;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private byte[] secretKeyByte;

    private long expired = 1000L * 60 * 60; // 1시간만 토큰 유효

    private Key key;

    private final MemberService memberService;

    public JwtTokenProvider(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostConstruct
    protected void init() {
        secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);
        key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());
    }

    // Jwt 토큰 생성
    public String createToken(String userPk, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userPk);
        claims.put("roles", roles);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expired))
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }


    public Authentication getAuthentication(String token) {
        MemberTest memberTest = memberService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(memberTest, "", memberTest.getAuthorities());
    }


    public String getUserPk(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
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
}
