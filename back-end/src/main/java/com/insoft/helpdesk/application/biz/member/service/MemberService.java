package com.insoft.helpdesk.application.biz.member.service;

import com.insoft.helpdesk.application.biz.auth.port.in.AuthInPort;
import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.biz.member.port.out.MemberOutPort;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.repo.member.MemberRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public Page<Member> getMembers(Map keyParams, Map searchParams, Pageable pageable) {
        return memberOutPort.getMembers(memberRepo.findAll(helpDeskSearchExecutor.Search(searchParams,keyParams), pageable));
    }

    @Override
    public List<Member> getManagers(Map keyParams, Map searchParams) {
        List<Member> members = memberOutPort.getManagers(memberRepo.findAll(helpDeskSearchExecutor.Search(searchParams,keyParams)));
        List<Member> managerList = new ArrayList<>();
        for(Member mem : members){
            if(mem.getAuth()!=null){
                if(mem.getAuth().getCdId().equals("manager") && mem.getJoinConfirmYN().equals("Y")){
                    managerList.add(mem);
                }
            }
        }
        return managerList;
    }

    @Override
    public List<Member> getUsers(Map keyParams, Map searchParams) {
        List<Member> members = memberOutPort.getUsers(memberRepo.findAll(helpDeskSearchExecutor.Search(searchParams,keyParams)));
        List<Member> userList = new ArrayList<>();
        for(Member mem : members){
            if(mem.getAuth()!=null){
                if(mem.getAuth().getCdId().equals("user") && mem.getJoinConfirmYN().equals("Y")){
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
        return memberOutPort.countMembers(memberRepo.count(helpDeskSearchExecutor.Search(searchParams, keyParams)));
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

}
