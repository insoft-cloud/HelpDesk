package com.insoft.helpdesk.application.biz.sms.service;

import com.insoft.helpdesk.application.biz.sms.port.in.TransmissionInPort;
import com.insoft.helpdesk.application.biz.sms.port.out.TransmissionOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import com.insoft.helpdesk.application.domain.jpa.repo.sms.TransmissionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransmissionService implements TransmissionInPort {

    final TransmissionRepo transmissionRepo;
    final TransmissionOutPort transmissionOutPort;

    @Override
    public Page<Transmission> getTransmissions(String recvId, Pageable pageable) {
        return transmissionOutPort.getTransmissions(transmissionRepo.findByRecvIdOrderByTrsmsDtDesc(recvId, pageable));
    }

    @Override
    public Transmission createTransmission(Transmission transmission) {
        return transmissionOutPort.createTransmission(transmissionRepo.save(transmission));
    }

    @Override
    public Transmission updateTransmission(Transmission transmission) {
        return transmissionOutPort.updateTransmission(transmission);
    }

    @Override
    public Transmission deleteTransmission(Transmission transmission) {
        return transmissionOutPort.deleteTransmission(transmission);
    }
}
