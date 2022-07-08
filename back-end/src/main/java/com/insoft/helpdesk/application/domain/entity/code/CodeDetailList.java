package com.insoft.helpdesk.application.domain.entity.code;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CodeDetailList {
    List<Detail> updateDetail;
    List<Detail> createDetail;
    List<Detail> deleteDetail;
}
