package com.insoft.helpdesk.application.adapter.out.db.auth;

import com.insoft.helpdesk.application.biz.auth.port.out.AuthOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthAdapter implements AuthOutPort {

    @Override
    public Page<Auth> getAuths(Page<Auth> auths) {
        return auths;
    }

    @Override
    public Optional<Auth> getAuth(Optional<Auth> auth) {
        return auth;
    }

    @Override
    public Auth createAuth(Auth auth) {
        return auth;
    }

    @Override
    public Auth updateAuth(Auth auth) {
        return auth;
    }

    @Override
    public Auth deleteAuth(Auth auth) {
        return auth;
    }
}
