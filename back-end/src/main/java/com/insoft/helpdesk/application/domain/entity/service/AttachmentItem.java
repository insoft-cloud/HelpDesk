package com.insoft.helpdesk.application.domain.entity.service;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AttachmentItem {

    String reqId;
    String fileName;

}
