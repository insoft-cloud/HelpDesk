package com.insoft.helpdesk.application.adapter.in.controller.auth;

import com.insoft.helpdesk.application.biz.auth.port.in.AuthInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.util.annotation.HelpDeskAdminRestController;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name= "Auth", description = "auth API")
@HelpDeskAdminRestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthInPort authInPort;

    @Tag(name = "Auth")
    @Operation(summary = "권한 조회", description = "권한 전체 조회")
    @GetMapping("/auths")
    public ResponseEntity getAuths(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return ResponseEntity.ok(authInPort.getAuths(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams),pageable));
    }

    @Tag(name = "Auth")
    @Operation(summary = "권한 조회", description = "권한 전체 조회")
    @GetMapping("/auth/{id}")
    public ResponseEntity getAuth(@PathVariable String id){
        return ResponseEntity.ok(authInPort.getAuth(id));
    }

    @Tag(name = "Auth")
    @PostMapping("/auth")
    public ResponseEntity createAuth(@RequestBody Auth auth){
        authInPort.createAuth(auth);
        return ResponseEntity.ok(auth);
    }

    @Tag(name = "Auth")
    @PostMapping("/auth/{id}")
    public ResponseEntity updateAuth(@PathVariable String id, @RequestBody Auth auth){
        Auth _auth = authInPort.getAuth(id).orElse(null);
        _auth = _auth.updateAuth(auth);
        authInPort.updateAuth(_auth);
        return ResponseEntity.ok(_auth);
    }
//
//    @Tag(name = "Auth")
//    @DeleteMapping("/auth/{id}")
//    public ResponseEntity deleteAuth(@PathVariable String id){
//        Auth _auth = authInPort.getAuth(id).orElse(null);
//        if(_auth == null){
//            return ResponseEntity.badRequest().build();
//        }
//        authInPort.deleteAuth(_auth);
//        return ResponseEntity.ok(_auth);
//    }
}
