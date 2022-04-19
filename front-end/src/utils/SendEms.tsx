import {procPostAxios} from "../axios/Axios";

// ※ 타입별 필수 입력 데이터가 전달되지 않았으면 모든 상황에서 제목없음 오류를 발생하도록 처리되어 있습니다.

// EMS Object Info
/* obj_EMS {
    // 필수 입력 값
    mailType : "", // 메일 유형 (charge - 담당자 지정, pwdReset - 임시 비밀번호 발급, auth - 회원가입 승인, stats - 상태 변경(보류/완료))
    userName : "", // 사용자 이름
    idList : [], // 메일을 발송할 계정 목록 - 배열
    reqTyCd : "", // 유형 코드
    reqTitle : "", // 요청 제목

    // mailType 이 charge (담당자 지정) 일 때 필수 입력 값
    reqChargeName : "", // 담당자 이름

    // mailType 이 pwdReset (임시 비밀번호 발급) 일 때 필수 입력 값
    tmpPwd : "", // 임시 비밀번호

    // mailType 이 auth (회원가입 승인) 일 때 필수 입력 값
    authDate : "", // 승인 날짜

    // mailType 이 stats (상태 변경(보류/완료)) 일 때 필수 입력 값
    // 기획 상, 보류(hold) 또는 완료(complete) 상태일 때에만 메일이 발송되어야 합니다.
    stats : "", // 상태(hold/complete)

    // mailType 이 comment (댓글 등록) 일 때 필수 입력 값
    comment : "" // 댓글 내용
}
*/

/*
let obj_EMS: { reqTyCd: string; authDate: string; mailType: string; reqTitle: string; reqChargeName: string; tmpPwd: string; idList: any; userName: string, stats: string, comment: string }
obj_EMS = {
    mailType : "",
    userName : "",
    idList : [],
    reqTyCd : "",
    reqTitle : "",
    reqChargeName : "",
    tmpPwd : "",
    authDate : "",
    stats : "",
    comment : ""
}
*/

function SendEms(obj : object, state, contentType) {
    const url = "/user/ems/sendEms"

    return procPostAxios(url, state.token, contentType, obj, ok, error)

    function ok() {
    }
    function error(error) {
        alert(error)
    }
}

export default SendEms;
