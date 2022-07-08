package com.insoft.helpdesk.application.biz.sms.port.out;

import java.util.List;

public interface EmsOutPort {

    boolean sendEmail(String email, String title, String html, List<String> data);
}
