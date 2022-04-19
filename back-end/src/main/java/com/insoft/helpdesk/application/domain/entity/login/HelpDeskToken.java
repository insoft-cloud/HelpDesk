package com.insoft.helpdesk.application.domain.entity.login;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HelpDeskToken {

    String accessToken;
    String refreshToken;
    long tokenExpired;
    long refreshTokenExpired;
    String userId;
    String userName;
    Auth auth;
}
