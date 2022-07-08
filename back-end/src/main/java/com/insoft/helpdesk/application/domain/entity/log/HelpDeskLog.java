package com.insoft.helpdesk.application.domain.entity.log;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HelpDeskLog {
    String user;
    String requestUrl;
    String method;
    String body;

    @Override
    public String toString() {

        return "\n" +"HelpDeskLog {" + "\n" +
                (user == null ? "" : "user='" + user + "\n" + ", ") +
                "requestUrl='" + requestUrl + "\n" +
                ", method='" + method + "\n" +
                (body == null || body.isEmpty() ? "" : ", body='" + body) +
                '}';
    }
}
