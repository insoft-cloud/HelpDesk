package com.insoft.helpdesk.configuration;

import kr.go.smes.ums.UmsClient;
import kr.go.smes.ums.SmesUmsClient;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class UmsConfiguration {
    @Value("${ums.userId}")
    private String userId;

    @Value("${ums.targetUrl}")
    private String targetUrl;

    @Value("${ums.DefaultFrom}")
    private String defaultFrom;

    @Bean
    public UmsClient umsClient() {
        return new SmesUmsClient(userId, targetUrl, defaultFrom);
    }
}
