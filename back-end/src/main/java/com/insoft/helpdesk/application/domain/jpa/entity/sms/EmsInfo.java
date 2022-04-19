package com.insoft.helpdesk.application.domain.jpa.entity.sms;

import lombok.Data;

import java.util.ArrayList;

@Data
public class EmsInfo {
    // 필수 전달 정보 (메일 유형, 사용자 이름, 이메일, 유형 코드, 요청 제목)
    private String mailType; // 메일 유형 (mailType : charge, pwdReset, auth, stats, comment)
    private String userName;
    private ArrayList<String> idList;
    private String reqTyCd;
    private String reqTitle;

    // 메일 유형 별 필수 전달 데이터 목록
    // 담당자 지정 안내 메일 (담당자 이름)
    private String reqChargeName;
    // 비밀번호 재설정 안내 메일 (임시 비밀번호)
    private String tmpPwd;
    // 회원가입 승인 안내 메일 (승인 날짜)
    private String authDate;
    // 상태 변경 안내 메일 (hold : 보류 / complete : 완료)
    private String stats;
    // 댓글 입력 안내 메일
    private String comment;

    EmsInfo() {
        mailType = "";
        userName = "";
        idList = new ArrayList<>();
        reqTyCd = "";
        reqTitle = "";
        reqChargeName = "";
        tmpPwd = "";
        authDate = "";
        stats = "";
        comment = "";
    }
}
