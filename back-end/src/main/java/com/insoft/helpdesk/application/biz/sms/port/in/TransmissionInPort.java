package com.insoft.helpdesk.application.biz.sms.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransmissionInPort {
    Page<Transmission> getTransmissions(String recvId, Pageable pageable);

    Transmission createTransmission(Transmission transmission);
    Transmission updateTransmission(Transmission transmission);
    Transmission deleteTransmission(Transmission transmission);
}
