package com.insoft.helpdesk.application.biz.auth.service;

import com.insoft.helpdesk.application.biz.auth.port.in.AuthInPort;
import com.insoft.helpdesk.application.biz.auth.port.out.AuthOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import com.insoft.helpdesk.application.domain.jpa.repo.AuthRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthInPort {

    final AuthOutPort authOutPort;

    final AuthRepo authRepo;

    final HelpDeskSearchExecutor helpDeskSearchExecutor;

    @Override
    public Page<Auth> getAuths(Map keyParams, Map searchParams, Pageable pageable) {
        return authOutPort.getAuths(authRepo.findAll(helpDeskSearchExecutor.Search(searchParams,keyParams), pageable));
    }

    @Override
    public Optional<Auth> getAuth(String id) {
        return authOutPort.getAuth(authRepo.findById(id));
    }

    @Override
    public Auth createAuth(Auth auth) {
        return authOutPort.createAuth(authRepo.save(auth));
    }

    @Override
    public Auth updateAuth(Auth auth) {
        return authOutPort.updateAuth(authRepo.save(auth));
    }

    @Override
    public Auth deleteAuth(Auth auth) {
        authRepo.delete(auth);
        return authOutPort.deleteAuth(auth);
    }
}
