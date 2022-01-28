

//todo : API 나오면 맞춰서 수정 필요
export type ServiceTableModel = {
    
    registDt: string | undefined,
    UPD_DT?: string | undefined,
    GOAL_DT?: string | undefined,
    SVC_RQST_NO : string,

    svcReqNo : {
        priortCd : string | undefined, //우선순위
        sysCd : string | undefined, //시스템명(ex 중소벤처)
        ttl : string | undefined,
        tyCd : string | undefined, //유형
        updateDt? : "2022-01-24T14:49:09.447047"
        reqId? : string, //요청자
    }
    //조인해야하는 항목
    userId? : string | undefined, //담당자
    SST? : string | undefined //상태

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
        updateDt? : "2022-01-24T14:49:09.447047"
        reqId? : string, //요청자
    }
    //조인해야하는 항목
    userId? : string | undefined, //담당자
    SST? : string | undefined //상태

}

