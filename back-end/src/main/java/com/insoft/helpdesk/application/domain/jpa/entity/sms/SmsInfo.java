package com.insoft.helpdesk.application.domain.jpa.entity.sms;

import lombok.Data;

import java.util.ArrayList;

@Data
public class SmsInfo {
    // 필수 전달 정보 (문자 유형, 연락처, 유형 코드, 요청 제목)
    private String smsType; // 문자 유형 (smsType : charge, comment, stats)
    private ArrayList<String> idList;
    private String reqTyCd;
    private String reqTitle;

    // 문자 유형 별 필수 전달 데이터 목록
    // 담당자 지정 안내 문자 (담당자 이름)
    private String reqChargeName;
    // 댓글 등록 안내 문자 (댓글 내용)
    private String comment;
    // 상태 변경 안내 문자 (보류 or 완료 상황일 때에만 발송해야 함)
    private String stats;

    SmsInfo() {
        smsType = "";
        idList = new ArrayList<>();
        reqTyCd = "";
        reqTitle = "";
        reqChargeName = "";
        comment = "";
        stats = "";
    }
}
