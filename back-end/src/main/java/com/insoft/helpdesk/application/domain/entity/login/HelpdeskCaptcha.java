package com.insoft.helpdesk.application.domain.entity.login;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HelpdeskCaptcha {
    String secret;
    String response;
    String remoteip;
}
