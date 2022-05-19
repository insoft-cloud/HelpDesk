package com.insoft.helpdesk.application.adapter.in.controller.auth;

import com.insoft.helpdesk.application.biz.auth.port.in.AuthInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import com.insoft.helpdesk.util.annotation.HelpDeskAdminRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
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
    final static String TAGNAME = "Auth";

    @Tag(name = TAGNAME)
    @Operation(summary = "권한 전체 조회", description = "권한 전체 조회")
    @GetMapping("/auths")
    public ResponseEntity getAuths(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return ResponseEntity.ok(authInPort.getAuths(HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams),pageable));
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "해당 권한 조회", description = "해당 id 권한 조회")
    @GetMapping("/auth/{id}")
    public ResponseEntity getAuth(@PathVariable String id){
        return ResponseEntity.ok(authInPort.getAuth(id));
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "권한 생성", description = "권한 생성")
    @PostMapping("/auth")
    public ResponseEntity createAuth(@RequestBody Auth auth){
        authInPort.createAuth(auth);
        return ResponseEntity.ok(auth);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "권한 수정", description = "해당 id 권한 수정")
    @PostMapping("/auth/{id}")
    public ResponseEntity updateAuth(@PathVariable String id, @RequestBody Auth auth){
        Auth authTemp = authInPort.getAuth(id).orElse(null);
        authTemp = authTemp.updateAuth(auth);
        authInPort.updateAuth(authTemp);
        return ResponseEntity.ok(authTemp);
    }
}
