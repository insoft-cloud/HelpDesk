package com.insoft.helpdesk.util.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class HelpDeskExceptionController {
    @ExceptionHandler(HelpDeskException.class)
    public ResponseEntity exceptionHandler(HelpDeskException e) {
        return new ResponseEntity(e.getErrMessage(), HttpStatus.BAD_REQUEST);
    }
}
