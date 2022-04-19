package com.insoft.helpdesk.util.content;

public enum HelpDeskErrorCode {
    NAME_DUPLICATE_ERROR("중복된 이름입니다."),
    LOGIN_VALIDATE_ERROR("아이디 또는 비밀번호가 잘못되었습니다."),
    SIGNIN_ERROR("로그인이 실패했습니다."),
    REGULAR_EXPRESSION_ERROR("정규식 오류가 발생했습니다."),
    TOKEN_ERROR("토큰이 없거나 만료되었습니다."),
    WITHDRAWAL_MEMBER("탈퇴한 계정으로 로그인 할 수 없습니다."),
    UNAUTHORIZED_USER("가입 승인되지 않은 계정은 로그인 할 수 없습니다.");

    final private String messageName;

    public String getMessageName(){
        return messageName;
    }

    HelpDeskErrorCode(String messageName) {
        this.messageName = messageName;
    }
}
