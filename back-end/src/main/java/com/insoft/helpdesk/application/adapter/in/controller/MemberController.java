package com.insoft.helpdesk.application.adapter.in.controller;


import com.insoft.helpdesk.application.biz.auth.port.in.AuthInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.repo.AuthRepo;
import com.insoft.helpdesk.util.annotation.HelpDeskAdminRestController;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Member", description = "멤버 API")
@HelpDeskRestController
@RequiredArgsConstructor

public class MemberController {

    private final MemberInPort memberInPort;
    private final AuthInPort authInPort;
    private final PasswordEncoder passwordEncoder;

    @Tag(name = "Member")
    @Operation(summary  = "멤버 조회", description  = "멤버 한명의 데이터를 조회합니다.")
    @GetMapping("/member/{id}")
    public ResponseEntity getMember(@PathVariable String id){
        return ResponseEntity.ok(memberInPort.getMember(id));
    }

    @Tag(name = "Member")
    @Operation(summary  = "멤버 조회", description  = "멤버 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/members")
    public ResponseEntity getMembers(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable){
        return ResponseEntity.ok(memberInPort.getMembers(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams), pageable));
    }

    @Tag(name = "Member")
    @Operation(summary  = "멤버 조회", description  = "매니저 리스트를 조회합니다.")
    @GetMapping("/members/manager")
    public ResponseEntity getManagers(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return ResponseEntity.ok(memberInPort.getManagers(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams)));
    }

    @Tag(name = "Member")
    @Operation(summary  = "멤버 조회", description  = "가입 승인된 사용자 리스트를 조회합니다.")
    @GetMapping("/members/user")
    public ResponseEntity getUsers(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams){
        return ResponseEntity.ok(memberInPort.getUsers(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams)));
    }

    @Tag(name = "Member")
    @Operation(summary  = "멤버 수", description  = "멤버 데이터 리스트의 갯수를 조회합니다.")
    @GetMapping("/members/count")
    public ResponseEntity countMembers(@RequestParam(value="key", required = false) String keyParams, @RequestParam(value="search", required = false) String searchParams){
        return ResponseEntity.ok(memberInPort.countMembers(HelpDeskMapper.mapToJson(keyParams),HelpDeskMapper.mapToJson(searchParams)));
    }

    @Tag(name = "Member")
    @Operation(summary  = "멤버 생성", description  = "멤버 데이터를 생성합니다.")
    @PostMapping("/member")
    public ResponseEntity createMember(@RequestBody Member member){
        memberInPort.createMember(member);
        return ResponseEntity.ok(member);
    }

    @Tag(name = "Member")
    @Operation(summary  = "멤버 수정", description  = "멤버 데이터를 수정합니다.")
    @PostMapping("/member/{id}")
    public ResponseEntity updateMember(@PathVariable String id, @RequestBody Member member){
        if(member.getAuth()!=null){
            member.setAuth(authInPort.getAuth(member.getAuth().getCdId()).orElse(null));
        }
        if(member.getPassword()!=null){
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        Member _member = (Member) memberInPort.getMember(id).orElse(null);
        _member = _member.updateMember(member);
        memberInPort.updateMember(_member);
        return ResponseEntity.ok(_member);
    }
//
//    @Tag(name = "Member")
//    @Operation(summary  = "멤버 삭제", description  = "멤버 데이터를 삭제합니다.")
//    @DeleteMapping("/member/{id}")
//    public ResponseEntity deleteMember(@PathVariable String id){
//        Member _member = (Member) memberInPort.getMember(id).orElse(null);
//        if(_member == null){
//            return ResponseEntity.badRequest().build();
//        }
//        memberInPort.deleteMember(_member);
//        return ResponseEntity.ok(_member);
//    }
}
