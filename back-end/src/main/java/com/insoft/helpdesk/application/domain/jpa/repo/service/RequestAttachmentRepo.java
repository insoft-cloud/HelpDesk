package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface RequestAttachmentRepo extends JpaRepository<RequestAttachment, String>, JpaSpecificationExecutor<RequestAttachment> {


}