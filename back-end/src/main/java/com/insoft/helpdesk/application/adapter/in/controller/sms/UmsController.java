package com.insoft.helpdesk.application.adapter.in.controller.sms;

import com.insoft.helpdesk.application.biz.member.service.MemberService;
import com.insoft.helpdesk.application.biz.sms.service.TransmissionService;
import com.insoft.helpdesk.application.domain.jpa.entity.Member;
import com.insoft.helpdesk.application.domain.jpa.entity.sms.SmsInfo;
import com.insoft.helpdesk.application.domain.jpa.entity.sms.Transmission;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.go.smes.ums.UmsClient;
import kr.go.smes.ums.UmsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.text.MessageFormat;
import java.util.Optional;

@Tag(name = "UMS", description = "UMS 서비스")
@HelpDeskRestController
public class UmsController {
    @Autowired
    private transient UmsClient umsClient;
    @Autowired
    private transient TransmissionService transmissionService;
    @Autowired
    private transient MemberService memberService;

    @Tag(name = "UMS")
    @Operation(summary  = "SMS 전송", description  = "SMS 전송")
    @PostMapping("/sms/sendSms")
    public void send(HttpServletResponse response, @RequestBody SmsInfo smsInfo) {
        try(PrintWriter printWriter = response.getWriter()) {
            String contents = null;
            String statsKr = "hold".equals(smsInfo.getStats()) ? "보류"
                    : "complete".equals(smsInfo.getStats()) ? "완료"
                    : "";

            switch(smsInfo.getSmsType()) {
                case "charge" :
                    if(!"".equals(smsInfo.getReqTyCd()) && !"".equals(smsInfo.getReqTitle()) && !"".equals(smsInfo.getReqChargeName())) {
                        contents = MessageFormat.format("요청 서비스 [{0}] {1}\n{2}님이 담당자로 지정되었습니다.", smsInfo.getReqTyCd(), smsInfo.getReqTitle(), smsInfo.getReqChargeName());                    }
                    break;
                case "comment" :
                    if(!"".equals(smsInfo.getReqTyCd()) && !"".equals(smsInfo.getReqTitle()) && !"".equals(smsInfo.getComment())) {
                        contents = MessageFormat.format("요청 서비스 [{0}] {1}\n{2}", smsInfo.getReqTyCd(), smsInfo.getReqTitle(), smsInfo.getComment());
                    }
                    break;
                case "stats" :
                    if(!"".equals(smsInfo.getReqTyCd()) && !"".equals(smsInfo.getReqTitle()) && !"".equals(statsKr)) {
                        contents = MessageFormat.format("요청 서비스 [{0}] {1}\n요청 서비스의 처리가 {2}되었습니다.\n자세한 내용은 Help Desk를 확인해주세요.", smsInfo.getReqTyCd(), smsInfo.getReqTitle(), statsKr);
                    }
                    break;
                default :
            }


            for(String id : smsInfo.getIdList()) {
                Optional<Member> member = memberService.getMember(id);
                String phone = member.get().getPhoneNumber();
                if("Y".equals(member.get().getSmsRcptYN())){
                    UmsResponse result = umsClient.send(phone, "[중소벤처24 헬프데스크]", contents);
                    String status = result.isSuccess() ? "SUCCESS" : "FAIL";
                    if("SUCCESS".equals(status)) {
                        Transmission transmission = new Transmission();
                        transmission.setRecvId(member.get().getUserId());
                        transmission.setTtl(smsInfo.getReqTitle());
                        transmission.setCnts(contents);
                        transmission.setTrsmsTyCd("sms");
                        transmission.setTyCd(smsInfo.getReqTyCd());
                        transmissionService.createTransmission(transmission);
                    }
                    printWriter.println("<html><head><title>SmsTest Result!</title></head><body><h1>" + status + "</h1><h2>" + result.getErrorCode() + "</h2></body></html>");
                }

            }
            printWriter.flush();
//            printWriter.close();
        }
        catch (Exception ex) {
            ex.printStackTrace();
            String message = ex.getMessage();
            try(PrintWriter printWriter = response.getWriter()) {

                printWriter.println("<html><head><title>FAIL!</title></head><body><h1>" + message + "</h1></body></html>");
                printWriter.flush();
//                printWriter.close();
            }
            catch (Exception exx) {
                exx.printStackTrace();
            }
        }
    }
}
