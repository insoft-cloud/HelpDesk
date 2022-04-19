package com.insoft.helpdesk.application.biz.common.port.out;

import java.time.LocalDateTime;

public interface CommonOutPort {

    LocalDateTime startDataTime(String day);
    LocalDateTime endDataTime();
}
