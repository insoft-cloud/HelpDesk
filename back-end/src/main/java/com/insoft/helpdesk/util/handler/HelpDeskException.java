package com.insoft.helpdesk.util.handler;

import com.insoft.helpdesk.util.content.HelpDeskErrorCode;

public class HelpDeskException extends Exception {
    private static final long serialVersionUID = 1802786474977675462L;

    private final String errMessage;

    public HelpDeskException(HelpDeskErrorCode code) {
        super(code.getMessageName());
        this.errMessage = code.getMessageName();
    }

    public String getErrMessage() {
        return errMessage;
    }
}
