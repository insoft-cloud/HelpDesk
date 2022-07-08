package com.insoft.helpdesk.application.biz.common.service;


import com.insoft.helpdesk.application.biz.common.port.in.CommonInPort;
import com.insoft.helpdesk.application.biz.common.port.out.CommonOutPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommonService implements CommonInPort {

    final CommonOutPort commonOutPort;

    @Override
    public LocalDateTime startDataTime(String day) {
        return commonOutPort.startDataTime(day);
    }

    @Override
    public LocalDateTime endDataTime() {
        return commonOutPort.endDataTime();
    }
}
