package com.insoft.helpdesk.application.biz.sms.service;

import com.insoft.helpdesk.application.biz.member.port.in.MemberInPort;
import com.insoft.helpdesk.application.biz.member.service.MemberService;
import com.insoft.helpdesk.application.biz.sms.port.in.EmsInPort;
import com.insoft.helpdesk.application.biz.sms.port.out.EmsOutPort;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import com.insoft.helpdesk.util.properties.HelpDeskProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class EmsService implements EmsInPort {

    @Qualifier("EmsAdapter")
    final EmsOutPort emsOutPort;

    final MemberInPort memberInPort;

    final JwtTokenProvider jwtTokenProvider;

    final HelpDeskProperties helpDeskProperties;

    final MemberService memberService;

    final TransmissionService transmissionService;

    @Override
    public boolean sendPasswordEmail(String email) {
        try {
            String html = getHtml(helpDeskProperties.getPasswordTemplate());
            String title = getHtml(helpDeskProperties.getPasswordTitle());
            emsOutPort.sendEmail(email, title, html, Arrays.stream(new String[] {memberInPort.getTokenForFindId(email), helpDeskProperties.getUri(), getPasswordToken(memberInPort.getTokenForFindId(email))}).collect(Collectors.toList()));

            Member member = memberService.getMemberByEmail(email).get();
            Transmission transmission = new Transmission();
            transmission.setRecvId(member.getUserId());
            transmission.setTtl("???????????? ?????????");
            transmission.setCnts("???????????? ????????? ????????? ?????? ???????????????.");
            transmission.setTrsmsTyCd("mail");
            transmission.setTyCd("????????????");
            transmissionService.createTransmission(transmission);
        } catch (IOException e) {
            return false;
        }
        return true;
    }


    private String getHtml(String path) throws IOException {
        ClassPathResource classPathResource = new ClassPathResource(path);
        byte[] htmlString = FileCopyUtils.copyToByteArray(classPathResource.getInputStream());
        return new String(htmlString, helpDeskProperties.getCharSet());
    }

    private String getPasswordToken(String email){

        ArrayList<GrantedAuthority> auth = new ArrayList<>();
        auth.add(new SimpleGrantedAuthority("USER"));


        return jwtTokenProvider.createPasswordToken(email, auth);
    }

}
