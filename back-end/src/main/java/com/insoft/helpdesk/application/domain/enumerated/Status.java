package com.insoft.helpdesk.application.domain.enumerated;

import lombok.Getter;

@Getter
public enum Status {

    Y("1",true),
    N("0",true);

    private String stringValue;
    private boolean booleanValue;

    Status(String stringValue, boolean booleanValue) {
        this.stringValue = stringValue;
        this.booleanValue = booleanValue;
    }
}
