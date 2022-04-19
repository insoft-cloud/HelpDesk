package com.insoft.helpdesk.application.biz.auth.port.in;

import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Optional;

public interface AuthInPort {
    Page<Auth> getAuths(Map<String,String> keyParams, Map<String,String> searchParams, Pageable pageable);
    Optional<Auth> getAuth(String id);
    Auth createAuth(Auth auth);
    Auth updateAuth(Auth auth);
    Auth deleteAuth(Auth auth);

}

