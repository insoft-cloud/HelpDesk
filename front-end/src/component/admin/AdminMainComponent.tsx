import AdminHeaderComponent from 'component/admin/AdminHeaderComponent';
import AdminButtonComponent from 'component/admin/AdminButtonComponent';
import React, { useEffect, useState } from 'react';
import { ButtonComponent } from 'component/button/ButtonComponent';
import TableCodeGroup from './TableCodeGroup';
import AOS from 'aos';
import { API_ADMIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch } from 'utils/TokenContext';


function AdminMainComponent() {

  //header나옴..
  let dispatch = useTokenDispatch()

  useState( () => {AOS.init(); AOS.refresh();});

  useEffect(() => {
      dispatch({ type: 'SET_PAGE', page: "HOME"})
  }, []);

    
  //등록 순서대로 정렬된다 , 최근순?? 등록일순?? 업데이트순??
  //SELECT * FROM public.tb_help_cd_grp_test order by regist_dt desc
  const testData : any[] = [
    {
      CD_GRP_NO: 'A',
      CD_NM : '우선순위',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.18',
      UPD_DT : '2022.01.18',
    },{
      CD_GRP_NO: 'B',
      CD_NM : '서비스 유형',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.18',
      UPD_DT : '2022.01.18',
    },{
      CD_GRP_NO: 'C',
      CD_NM : '처리 상태',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.18',
      UPD_DT : '2022.01.18',
    },{
      CD_GRP_NO: 'D',
      CD_NM : '운영 기관',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.18',
      UPD_DT : '2022.01.18',
    },{
      CD_GRP_NO: 'E',
      CD_NM : '서비스 영역',
      DEL_YN : 'N',    
      USER_ID : '관리자',
      REGIST_DT : '2022.01.18',
      UPD_DT : '2022.01.18',
    },{
      CD_GRP_NO: 'F',
      CD_NM : '우선순위',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.19',
      UPD_DT : '2022.01.19',
    },{
      CD_GRP_NO: 'G',
      CD_NM : '서비스 유형',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.19',
      UPD_DT : '2022.01.19',
    },{
      CD_GRP_NO: 'H',
      CD_NM : '처리 상태',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.19',
      UPD_DT : '2022.01.19',
    },{
      CD_GRP_NO: 'I',
      CD_NM : '운영 기관',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.19',
      UPD_DT : '2022.01.19',
    },{
      CD_GRP_NO: 'J',
      CD_NM : '서비스 영역',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.19',
      UPD_DT : '2022.01.19',
    },{
      CD_GRP_NO: 'K',
      CD_NM : '우선순위',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.20',
      UPD_DT : '2022.01.20',
    },{
      CD_GRP_NO: 'L',
      CD_NM : '서비스 유형',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.20',
      UPD_DT : '2022.01.20',
    },{
      CD_GRP_NO: 'M',
      CD_NM : '처리 상태',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.20',
      UPD_DT : '2022.01.20',
    },{
      CD_GRP_NO: 'N',
      CD_NM : '운영 기관',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.20',
      UPD_DT : '2022.01.20',
    },{
      CD_GRP_NO: 'E',
      CD_NM : '서비스 영역',
      DEL_YN : 'N',
      USER_ID : '관리자',
      REGIST_DT : '2022.01.20',
      UPD_DT : '2022.01.20',
    }
  ]

  function testResult() {
    alert("이벤트!");
  };

  function testResult2() {
    alert("이벤트삭제!");
  };

  

  return (
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 관리" info="헬프 데스크 서비스 운영에 필요한 항목들을 분류하고 관리합니다."/>
              <div className="AdminMainComponent">
                <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="삭제" onEventHandler={testResult} />
                  <ButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="추가" url={ContextPath.call('codeEdit',API_ADMIN_PATH.codeDetail)} />
                  
                </div>
                <div>
                  <TableCodeGroup  />
                </div>
              </div> 
        </div>
          
  );
}

export default AdminMainComponent;



