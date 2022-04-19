package com.insoft.helpdesk.application.adapter.in.controller.sms;

import com.insoft.helpdesk.application.biz.sms.port.in.TransmissionInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "Transmission", description = "전송 내역 API")
@HelpDeskRestController
@RequiredArgsConstructor
public class TransmissionController {
    final TransmissionInPort transmissionInPort;

    @Tag(name = "Transmission")
    @Operation(summary  = "전송 내역 조회", description  = "사용자별 전송 내역 조회")
    @GetMapping("/transmissions/{recvId}")
    public Page<Transmission> getTransmissions(@PathVariable String recvId, Pageable pageable) {
        return transmissionInPort.getTransmissions(recvId, pageable);
    }
}
