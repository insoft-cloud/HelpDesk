package com.insoft.helpdesk.application.biz.sms.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import org.springframework.data.domain.Page;

public interface TransmissionOutPort {
    Page<Transmission> getTransmissions(Page<Transmission> transmissions);

    Transmission createTransmission(Transmission transmission);
    Transmission updateTransmission(Transmission transmission);
    Transmission deleteTransmission(Transmission transmission);
}
