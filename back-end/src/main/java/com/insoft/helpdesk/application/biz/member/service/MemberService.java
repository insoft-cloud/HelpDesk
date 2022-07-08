package com.insoft.helpdesk.application.biz.member.service;

import com.insoft.helpdesk.application.biz.auth.port.in.AuthInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.biz.member.port.out.MemberOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Auth;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.code.Detail;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService implements MemberInPort {

    final MemberOutPort memberOutPort;
    final MemberRepo memberRepo;
    final HelpDeskSearchExecutor helpDeskSearchExecutor;
    final AuthInPort authInPort;


    @Override
    public boolean existUserId(String userId) {
        return memberOutPort.existUserId(userId);
    }

    @Override
    public boolean existEmail(String email) {
        return memberOutPort.existEmail(email);
    }

    @Override
    public  String getMemberFindId(String email){ return  memberOutPort.getMemberFindId(email);}

    @Override
    public List<Map> getMentionMember(String userId){
        return memberOutPort.getMentionMember(memberRepo.findByUserIdAndAgencyCode(userId));
    }
    @Override
    public List<Map> getMention(){
        return memberOutPort.getMention(memberRepo.findByUserIdAndAuth());
    }
    @Override
    public String getTokenForFindId(String email){ return  memberOutPort.getTokenForFindId(email);}

    @Override
    public Page<Member> getMembers(Map keyParams, Map searchParams, Pageable pageable) {
        return memberOutPort.getMembers(memberRepo.findAll(helpDeskSearchExecutor.search(searchParams,keyParams), pageable));
    }
    @Override
    public Page<Member> getAdmins(Map keyParams, Map searchParams, Pageable pageable) {

        List<Member> members = memberRepo.findAll(helpDeskSearchExecutor.search(searchParams,keyParams));
        List<Member> admins =members.stream().filter(r -> "PIIO".equals(r.getAgencyCode()) && "정보화지원실".equals(r.getDepartmentName())).collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()),admins.size());
        Page<Member> pageMember = new PageImpl<>(admins.subList(start,end),pageable, admins.size());
        return memberOutPort.getAdmins(pageMember);
    }

    @Override
    public List<Member> getManagers(Map keyParams, Map searchParams) {
        List<Member> members = memberRepo.findAll(helpDeskSearchExecutor.search(searchParams,keyParams));
        List<Member> managers =members.stream().filter(r -> r.getAuth() != null && "manager".equals(r.getAuth().getCdId()) && "Y".equals(r.getJoinConfirmYN())).collect(Collectors.toList());

        return memberOutPort.getManagers(managers);
    }

    @Override
    public List<Member> getUsers(Map keyParams, Map searchParams) {
        List<Member> members = memberOutPort.getUsers(memberRepo.findAll(helpDeskSearchExecutor.search(searchParams,keyParams)));
        List<Member> userList = new ArrayList<>();
        for(Member mem : members){
            if(mem.getAuth()!=null){
                if("user".equals(mem.getAuth().getCdId()) && "Y".equals(mem.getJoinConfirmYN())){
                    userList.add(mem);
                }
            }
        }
        return userList;
    }

    @Override
    public Optional<Member> getMember(String id) { return memberOutPort.getMember(memberRepo.findById(id)); }
    
    @Override
    public Long countMembers(Map keyParams, Map searchParams) {
        return memberOutPort.countMembers(memberRepo.count(helpDeskSearchExecutor.search(searchParams, keyParams)));
    }

    @Override
    public Member createMember(Member member) { return memberOutPort.createMember(memberRepo.save(member)); }

    @Override
    public Member updateMember(Member member) { return memberOutPort.updateMember(memberRepo.save(member)); }

    @Override
    public Member deleteMember(Member member) {
        memberRepo.delete(member);
        return memberOutPort.deleteMember(member);
    }

    @Override
    public Optional<Member> getMemberByEmail(String email) {
        return memberOutPort.getMember(memberRepo.findByEmail(email));
    }

}
