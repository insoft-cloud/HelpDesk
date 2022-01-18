package com.insoft.helpdesk.application.domain.entity;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class HelpDeskResponseEntity<T> extends ResponseEntity<T> {
    public HelpDeskResponseEntity(T body, HttpStatus status) {
        super(body, status);
    }

    public HelpDeskResponseEntity OK(T body){
        return new HelpDeskResponseEntity(body, HttpStatus.OK);
    }

    public HelpDeskResponseEntity ACCEPTED(T body){
        return new HelpDeskResponseEntity(body, HttpStatus.ACCEPTED);
    }

    public HelpDeskResponseEntity CREATED(T body){
        return new HelpDeskResponseEntity(body, HttpStatus.CREATED);
    }

    public HelpDeskResponseEntity BAD_REQUEST(T body){
        return new HelpDeskResponseEntity(body, HttpStatus.BAD_REQUEST);
    }
}
