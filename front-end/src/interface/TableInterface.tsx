

//todo : API 나오면 맞춰서 수정 필요
export type ServiceTableModel = {
    
    cnts : string | undefined, //내용
    priortCd : string | undefined, //우선순위
    ttl : string | undefined, //제목
    registDt: string | undefined, //등록일
    updateDt? : string | undefined, //수정일
    tyCd : string | undefined, //유형
    sysCd : string | undefined, //시스템명(ex 중소벤처)
    reqId : string | undefined //등록자(=요청자) 아이디

}


//todo : 누락된 내용 추가되면 재확인 필요
export type MyWorkTableModel = {
    
    registDt: string | undefined,
    UPD_DT?: string | undefined,
    GOAL_DT?: string | undefined,

    svcReqNo : {
        priortCd : string | undefined, //우선순위
        sysCd : string | undefined, //시스템명(ex 중소벤처)
        ttl : string | undefined,
        tyCd : string | undefined, //유형
        updateDt? : string,
        reqId? : string, //요청자
    }
    //조인해야하는 항목
    userId? : string | undefined, //담당자

}

