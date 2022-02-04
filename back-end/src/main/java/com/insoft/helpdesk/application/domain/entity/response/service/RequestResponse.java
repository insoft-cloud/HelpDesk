package com.insoft.helpdesk.application.domain.entity.response.service;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "요청")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestResponse {

    @Schema(description = "요청 리스트")
    List<Request> requestList;

    @Schema(description = "개수")
    long count;
}
