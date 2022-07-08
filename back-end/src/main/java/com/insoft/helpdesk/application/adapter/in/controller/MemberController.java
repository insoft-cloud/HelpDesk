package com.insoft.helpdesk.application.adapter.in.controller;


import com.insoft.helpdesk.application.biz.auth.port.in.AuthInPort;
import com.insoft.helpdesk.application.biz.code.port.in.CodeDetailInPort;
import com.insoft.helpdesk.application.biz.code.port.in.CodeGroupInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.repo.code.DetailRepo;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Tag(name = "Member", description = "멤버 API")
@HelpDeskRestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberInPort memberInPort;
    private final CodeGroupInPort codeGroupInPort;
    private final CodeDetailInPort codeDetailInPort;
    private final AuthInPort authInPort;
    private final PasswordEncoder passwordEncoder;
    private final DetailRepo detailRepo;
    final static String TAGNAME = "Member";
    final static String KEY = "key";
    final static String SEARCH = "search";

    @Tag(name = TAGNAME)
    @Operation(summary  = "멤버 조회", description  = "멤버 한명의 데이터를 조회합니다.")
    @GetMapping("/member/{id}")
    public ResponseEntity getMember(@PathVariable String id){
        return ResponseEntity.ok(memberInPort.getMember(id));
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "멤버 전체 조회", description  = "멤버 데이터 리스트 전체를 조회합니다.")
    @GetMapping("/members")
    public ResponseEntity getMembers(@RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams, Pageable pageable){

        Map map =  HelpDeskMapperUtils.mapToJson(searchParams);
        if(map.containsKey("agencyCode") && !map.get("agencyCode").toString().isEmpty()){
            List<Detail> details = detailRepo.findAllByCdGroupNo(codeGroupInPort.getCodeGroup("SYS").get());
            String filter = map.get("agencyCode").toString();
            map.remove("agencyCode");
            List<Detail> newDetails = details.stream().filter(r -> r.getName().toLowerCase(Locale.getDefault()).indexOf(filter.toLowerCase(Locale.getDefault())) > -1).collect(Collectors.toList());
            if(newDetails.isEmpty()){
                if(map.isEmpty()){
                    map.put("agencyCode", "-1");
                    return ResponseEntity.ok(memberInPort.getMembers(HelpDeskMapperUtils.mapToJson(keyParams),map, pageable));
                }
                return ResponseEntity.ok(memberInPort.getMembers(HelpDeskMapperUtils.mapToJson(keyParams),map, pageable));
            }
            map.put("agencyCode" ,newDetails.stream().map(r -> r.getCdId()).collect(Collectors.joining(",")));
            if(log.isInfoEnabled()) {
                log.info("##############################################################");
                log.info(map.toString());
            }
        }
        return ResponseEntity.ok(memberInPort.getMembers(HelpDeskMapperUtils.mapToJson(keyParams),map, pageable));
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "멤버 관리자 조회", description  = "멤버 관리자 리스트 전체를 조회합니다.")
    @GetMapping("/members/admin")
    public ResponseEntity getAdmins(@RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams, Pageable pageable){

        Map map =  HelpDeskMapperUtils.mapToJson(searchParams);
        if(map.containsKey("agencyCode") && !map.get("agencyCode").toString().isEmpty()){
            List<Detail> details = detailRepo.findAllByCdGroupNo(codeGroupInPort.getCodeGroup("SYS").get());
            String filter = map.get("agencyCode").toString();
            map.remove("agencyCode");
            List<Detail> newDetails = details.stream().filter(r -> r.getName().toLowerCase(Locale.getDefault()).indexOf(filter.toLowerCase(Locale.getDefault())) > -1).collect(Collectors.toList());
            if(newDetails.isEmpty()){
                if(map.isEmpty()){
                    map.put("agencyCode", "-1");
                    return ResponseEntity.ok(memberInPort.getAdmins(HelpDeskMapperUtils.mapToJson(keyParams),map, pageable));
                }
                return ResponseEntity.ok(memberInPort.getAdmins(HelpDeskMapperUtils.mapToJson(keyParams),map, pageable));
            }
            map.put("agencyCode" ,newDetails.stream().map(r -> r.getCdId()).collect(Collectors.joining(",")));
            if(log.isInfoEnabled()) {
                log.info("##############################################################");
                log.info(map.toString());
            }
        }
        return ResponseEntity.ok(memberInPort.getAdmins(HelpDeskMapperUtils.mapToJson(keyParams),map, pageable));
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "매니저 조회", description  = "매니저 리스트를 조회합니다.")
    @GetMapping("/members/manager")
    public ResponseEntity getManagers(@RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams){
        return ResponseEntity.ok(memberInPort.getManagers(HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams)));
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "사용자 조회", description  = "가입 승인된 사용자 리스트를 조회합니다.")
    @GetMapping("/members/user")
    public ResponseEntity getUsers(@RequestParam(value = KEY, required = false) String keyParams, @RequestParam(value = SEARCH, required = false) String searchParams){
        Map map =  HelpDeskMapperUtils.mapToJson(searchParams);
        if(map.containsKey("agencyCode") && !map.get("agencyCode").toString().isEmpty()){
            List<Detail> details = detailRepo.findAllByCdGroupNo(codeGroupInPort.getCodeGroup("SYS").get());
            String filter = map.get("agencyCode").toString();
            map.remove("agencyCode");
            List<Detail> newDetails = details.stream().filter(r -> r.getName().toLowerCase(Locale.getDefault()).indexOf(filter.toLowerCase(Locale.getDefault())) > -1).collect(Collectors.toList());
            if(newDetails.isEmpty()){
                if(map.isEmpty()){
                    map.put("agencyCode", "-1");
                    return ResponseEntity.ok(memberInPort.getManagers(HelpDeskMapperUtils.mapToJson(keyParams),map));
                }
                return ResponseEntity.ok(memberInPort.getManagers(HelpDeskMapperUtils.mapToJson(keyParams),map));
            }
            map.put("agencyCode" ,newDetails.stream().map(r -> r.getCdId()).collect(Collectors.joining(",")));
            if(log.isInfoEnabled()) {
                log.info("##############################################################");
                log.info(map.toString());
            }
        }
        return ResponseEntity.ok(memberInPort.getManagers(HelpDeskMapperUtils.mapToJson(keyParams),map));
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "멤버 수", description  = "멤버 데이터 리스트의 갯수를 조회합니다.")
    @GetMapping("/members/count")
    public ResponseEntity countMembers(@RequestParam(value=KEY, required = false) String keyParams, @RequestParam(value=SEARCH, required = false) String searchParams){
        return ResponseEntity.ok(memberInPort.countMembers(HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams)));
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "사용자용 멘션 멤버 리스트", description = "사용자용 멘션 멤버 리스트")
    @GetMapping("/members/mention/{userId}")
    public List<Map> getMentionMember(@PathVariable String userId){
        return memberInPort.getMentionMember(userId);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "운영&관리자용 멘션 멤버 리스트", description = "운영&관리자용 멘션 멤버 리스트")
    @GetMapping("/members/mention")
    public List<Map> getMention(){
        return memberInPort.getMention();
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "멤버 생성", description  = "멤버 데이터를 생성합니다.")
    @PostMapping("/member")
    public ResponseEntity createMember(@RequestBody Member member){
        memberInPort.createMember(member);
        return ResponseEntity.ok(member);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "멤버 수정", description  = "멤버 데이터를 수정합니다.")
    @PostMapping("/member/{id}")
    public ResponseEntity updateMember(@PathVariable String id, @RequestBody Member member){
        if(member.getAuth()!=null){
            member.setAuth(authInPort.getAuth(member.getAuth().getCdId()).orElse(null));
        }
        if(member.getPassword()!=null){
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        Member memberTemp = (Member) memberInPort.getMember(id).orElse(null);
        memberTemp = memberTemp.updateMember(member);
        memberInPort.updateMember(memberTemp);
        return ResponseEntity.ok(memberTemp);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "멤버 탈퇴", description  = "멤버를 삭제합니다.")
    @PostMapping("/member/{id}/delete")
    public ResponseEntity deleteMember(@PathVariable String id, @RequestBody Member member){
        if(member.getAuth()!=null){
            member.setAuth(authInPort.getAuth(member.getAuth().getCdId()).orElse(null));
        }
        if(member.getPassword()!=null){
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        Member memberTemp = (Member) memberInPort.getMember(id).orElse(null);
        memberTemp = memberTemp.updateMember(member);
        memberInPort.deleteMember(memberTemp);
        return ResponseEntity.ok(memberTemp);
    }



    @Tag(name = TAGNAME)
    @Operation(summary  = "비밀번호 찾기", description  = "이메일, 아이디로 비밀번호 재설정")
    @PostMapping("/members/findPw/{id}")
    public ResponseEntity resetPassword(@PathVariable String id, @RequestBody Member member) {
        if (member.getPassword() != null) {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        Member memberTemp = (Member) memberInPort.getMember(id).orElse(null);
        memberTemp = memberTemp.updateMember(member);
        memberInPort.updateMember(memberTemp);
        return ResponseEntity.ok(memberTemp);
    }

}
