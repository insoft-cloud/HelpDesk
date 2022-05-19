package com.insoft.helpdesk.application.domain.common;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {
    Integer count;
    Object data;
    String errorMessage;
}
