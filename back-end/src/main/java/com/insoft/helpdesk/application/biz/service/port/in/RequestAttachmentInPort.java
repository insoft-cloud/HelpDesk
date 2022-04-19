package com.insoft.helpdesk.application.biz.service.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RequestAttachmentInPort {

    Page<RequestAttachment> getRequestAttachments(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Page<RequestAttachment> getRequestAttachments(String reqId, Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Optional<RequestAttachment> getRequestAttachment(String id);
    Long countRequestAttachments(Map<String,String> keyParams, Map<String,String> searchParams);
    Long countRequestAttachments(String reqId, Map<String,String> keyParams, Map<String,String> searchParams);
    RequestAttachment createRequestAttachment(RequestAttachment requestAttachment);
    RequestAttachment updateRequestAttachment(RequestAttachment requestAttachment);
    RequestAttachment deleteRequestAttachment(RequestAttachment requestAttachment);
}
