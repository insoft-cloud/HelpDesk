package com.insoft.helpdesk.configuration;

import kr.go.smes.ems.EmsClient;
import kr.go.smes.ems.MockEmsClient;
import kr.go.smes.ems.SmesEmsClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmsConfiguration {
    @Value("${ems.linkName}")
    private String linkName;

    @Value("${ems.targetUrl}")
    private String targetUrl;

    @Value("${ems.DefaultFrom}")
    private String defaultFrom;

    @Value("${ems.DefaultCategory}")
    private String defaultCategory;

    @Bean
    public EmsClient emsClient() {
        return new MockEmsClient(linkName, targetUrl, defaultFrom, defaultCategory);
    }
}
