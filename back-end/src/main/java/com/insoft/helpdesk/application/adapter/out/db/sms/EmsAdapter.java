package com.insoft.helpdesk.application.adapter.out.db.sms;

import com.insoft.helpdesk.application.biz.sms.port.out.EmsOutPort;
import kr.go.smes.ems.EmsClient;
import kr.go.smes.ems.EmsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class EmsAdapter implements EmsOutPort {

    private final EmsClient emsClient;

    @Override
    public boolean sendEmail(String email, String title, String html, List<String> data) {

        try {
            if(log.isInfoEnabled()) {
                log.info(email);
                log.info(title);
                log.info(html);
                log.info(data.toString());
                log.info(emsClient.toString());
            }
            EmsResponse result = emsClient.send(email,title, MessageFormat.format(html, data.toArray()));

            return result.getStatus();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
