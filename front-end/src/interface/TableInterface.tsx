

//todo : 상세조회 연결까지 작업 필요
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


//todo : 누락된 내용(=평가 컬럼) 추가되면 재확인 필요
export type MyWorkTableModel = {
    
    cnts : string | undefined, //내용
    priortCd : string | undefined, //우선순위
    ttl : string | undefined, //제목
    registDt: string | undefined, //등록일
    updateDt? : string | undefined, //수정일
    tyCd : string | undefined, //유형
    sysCd : string | undefined, //시스템명(ex 중소벤처)
    reqId : string | undefined, //등록자(=요청자) 아이디
    goalDt : string | undefined, //목표일

    requestAttachments : {
        fileNm? : string | undefined, //담당자id
        userNm? : string | undefined, //담당자이름
        sttsCd? : string | undefined //상태(?)
    }

}

