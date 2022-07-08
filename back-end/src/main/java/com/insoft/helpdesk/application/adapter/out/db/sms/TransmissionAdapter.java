package com.insoft.helpdesk.application.adapter.out.db.sms;

import com.insoft.helpdesk.application.biz.sms.port.out.TransmissionOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TransmissionAdapter implements TransmissionOutPort {
    @Override
    public Page<Transmission> getTransmissions(Page<Transmission> transmissions) {
        return transmissions;
    }

    @Override
    public Transmission createTransmission(Transmission transmission) {
        return transmission;
    }

    @Override
    public Transmission updateTransmission(Transmission transmission) {
        return transmission;
    }

    @Override
    public Transmission deleteTransmission(Transmission transmission) {
        return transmission;
    }
}
