package com.insoft.helpdesk.application.biz.common.port.in;

import java.time.LocalDateTime;

public interface CommonInPort {
    LocalDateTime startDataTime(String day);
    LocalDateTime endDataTime();
}
