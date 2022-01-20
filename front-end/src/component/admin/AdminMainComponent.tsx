import AdminHeaderComponent from 'component/admin/AdminHeaderComponent';
import AdminButtonComponent from 'component/admin/AdminButtonComponent';
import FooterComponent from 'component/layout/FooterComponent';
import React from 'react';
import GraphComponent from './GraphComponent';
import propTypes from 'prop-types';


function AdminMainComponent() {
    
  
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
    CD_GRP_NO: 'A',
    CD_NM : '우선순위',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.19',
    UPD_DT : '2022.01.19',
  },{
    CD_GRP_NO: 'B',
    CD_NM : '서비스 유형',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.19',
    UPD_DT : '2022.01.19',
  },{
    CD_GRP_NO: 'C',
    CD_NM : '처리 상태',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.19',
    UPD_DT : '2022.01.19',
  },{
    CD_GRP_NO: 'D',
    CD_NM : '운영 기관',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.19',
    UPD_DT : '2022.01.19',
  },{
    CD_GRP_NO: 'E',
    CD_NM : '서비스 영역',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.19',
    UPD_DT : '2022.01.19',
  },{
    CD_GRP_NO: 'A',
    CD_NM : '우선순위',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.20',
    UPD_DT : '2022.01.20',
  },{
    CD_GRP_NO: 'B',
    CD_NM : '서비스 유형',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.20',
    UPD_DT : '2022.01.20',
  },{
    CD_GRP_NO: 'C',
    CD_NM : '처리 상태',
    DEL_YN : 'N',
    USER_ID : '관리자',
    REGIST_DT : '2022.01.20',
    UPD_DT : '2022.01.20',
  },{
    CD_GRP_NO: 'D',
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
  }]
  
  // const testData2 : any[] = [{
  //   firstname: 'hello4',
  //   lastname : 'world4',
  //   testValue : '@test4'
  // },
  //   {
  //     firstname: 'hello5', 
  //     lastname : 'world5',
  //     testValue : '@test5'
  //   },
  //   {
  //     firstname: 'hello6',
  //     lastname : 'world6',
  //     testValue : '@test6'
  //   }
  // ];

  function testResult() {
    alert("ddd");
  }

  function testResult2() {
    alert("이벤트삭제!");
  };

  return (
        <div className="card-body m-5">
            <AdminHeaderComponent/>
              <div>
                <div className="d-flex justify-content-end mb-3">
                  <AdminButtonComponent btnName="추가" onEventHandler={testResult} />
                  <AdminButtonComponent btnName="삭제" onEventHandler={testResult2} />
                  </div>
                  <div className="mh-100">
                  <GraphComponent tableClassName="asdarbenrfbv" tableData={testData}  />
                </div>
              </div> 
        </div>
          
  );
}

export default AdminMainComponent;



