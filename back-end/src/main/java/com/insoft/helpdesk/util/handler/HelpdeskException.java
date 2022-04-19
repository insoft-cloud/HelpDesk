package com.insoft.helpdesk.util.handler;

import com.insoft.helpdesk.util.content.HelpDeskErrorCode;
import org.apache.catalina.Session;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.web.bind.support.SessionAttributeStore;

public class HelpDeskException extends Exception {
    private final String errMessage;

    public HelpDeskException(HelpDeskErrorCode code) {
        super(code.getMessageName());
        this.errMessage = code.getMessageName();
    }

    public String getErrMessage() {
        return errMessage;
    }
}
