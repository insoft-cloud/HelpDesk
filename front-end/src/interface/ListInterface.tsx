//  테이블 정의서
// TB_HELP_SVC_RQST		서비스요청
// SVC_RQST_NO			서비스요청번호		
// RQSTR_ID			요청자 아이디		
// TY_CD			유형코드	(기능개선/장애)
// PRIORT_CD			우선순위코드(낮음/보통/높음/긴급)
// SYS_CD			시스템코드		
// TTL			제목		
// CNTS			내용		
// DEL_YN			삭제여부		
// REGIST_DT			등록일시		
// UPD_DT			수정일시		
// GOAL_DT			목표일시

interface ListInterface{
    SVC_RQST_NO : string  | undefined;
    TY_CD : string | undefined;
    PRIORT_CD : string | undefined;
    SYS_CD? : string | undefined;
    TTL : string | undefined;
    REGIST_DT? : string | undefined;
    UPD_DT? : string | undefined;
    GOAL_DT? : string | undefined;
}

//  const testData : any[] = [{
//     SVC_RQST_NO : 'hello',
//     TY_CD : 'world',
//     PRIORT_CD : '@test',
//     TTL : '제목',
//     REGIST_DT : '2020-10-10'
//  }


export default class ListModel implements ListInterface{
    public SVC_RQST_NO: string | undefined;
    public TY_CD: string | undefined;
    public PRIORT_CD: string | undefined;
    public SYS_CD: string | undefined;
    public TTL: string | undefined;
    public REGIST_DT?: string | undefined;
    public UPD_DT?: string | undefined;
    public GOAL_DT?: string | undefined;
}