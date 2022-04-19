package com.insoft.helpdesk.application.adapter.out.common;

import com.insoft.helpdesk.application.biz.common.port.out.CommonOutPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@RequiredArgsConstructor
@Service
public class CommonAdapter implements CommonOutPort {
    @Override
    public LocalDateTime startDataTime(String day) {
        LocalDateTime startDatetime = null;
        switch (day){
            case "day" : startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0,000000)); break;
            case "week" : startDatetime = LocalDateTime.of(LocalDate.now().minusWeeks(1), LocalTime.of(0,0,0,000000)); break;
            case "month" : startDatetime = LocalDateTime.of(LocalDate.now().minusMonths(1), LocalTime.of(0,0,0,000000)); break;
            default : startDatetime = LocalDateTime.of(LocalDate.of(2020,1,1), LocalTime.of(0,0,0,000000)); break;
        }
        return startDatetime;
    }

    @Override
    public LocalDateTime endDataTime() {
        return LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59,000000));
    }
}
