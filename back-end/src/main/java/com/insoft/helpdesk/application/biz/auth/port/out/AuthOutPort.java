package com.insoft.helpdesk.application.biz.auth.port.out;

import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Optional;

public interface AuthOutPort {
    Page<Auth> getAuths(Page<Auth> auths);
    Optional<Auth> getAuth(Optional<Auth> auth);
    Auth createAuth(Auth auth);
    Auth updateAuth(Auth auth);
    Auth deleteAuth(Auth auth);
}
