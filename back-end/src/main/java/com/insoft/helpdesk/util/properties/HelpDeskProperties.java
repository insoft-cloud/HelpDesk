package com.insoft.helpdesk.util.properties;

import lombok.Data;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "helpdesk")
@Data
@ToString
public class HelpDeskProperties {

    String uri;
    String passwordTemplate;
    String passwordTitle;
    String charSet;
}