import {procPostAxios} from "../axios/Axios";

// SMS Object
/* obj_SMS {
    // 필수 입력 값
    smsType : "", // 문자 유형 (charge - 담당자 지정, comment - 댓글 등록, stats - 상태 변경(보류/완료))
    idList : [], // 문자를 발송할 계정 목록 - 배열
    reqTyCd : "", // 유형 코드
    reqTitle : "", // 요청 제목

    // smsType 이 charge (담당자 지정) 일 때 필수 입력 값
    reqChargeName : "", // 담당자 이름

    // smsType 이 comment (댓글 등록) 일 때 필수 입력 값
    comment : "", // 댓글 내용

    // smsType 이 stats (상태 변경(보류/완료)) 일 때 필수 입력 값
    // 기획 상, 보류(hold) 또는 완료(complete) 상태일 때에만 문자가 발송되어야 합니다.
    stats : "" // 상태(hold/complete)
  }
*/

/*
let obj_SMS: { reqTyCd: string; stats: string; smsType: string; reqTitle: string; reqChargeName: string; comment: string; idList: any };
obj_SMS = {
    smsType: "",
    idList: [],
    reqTyCd: "",
    reqTitle: "",
    reqChargeName: "",
    comment: "",
    stats: ""
}
*/

function SendUms(obj : object, state, contentType) {
    const url = "/user/sms/sendSms"

    return procPostAxios(url, state.token, contentType, obj, ok, error)

    function ok() {
    }
    function error(error) {
        alert(error)
    }
}

export default SendUms;
