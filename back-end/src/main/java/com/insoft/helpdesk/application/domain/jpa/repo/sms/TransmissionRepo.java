package com.insoft.helpdesk.application.domain.jpa.repo.sms;

import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TransmissionRepo extends JpaRepository<Transmission, String>, JpaSpecificationExecutor<Transmission> {
    Page<Transmission> findByRecvIdOrderByTrsmsDtDesc(String recvId, Pageable pageable);
}
