import React, { useState } from "react";
import AdminButtonComponent from "./AdminButtonComponent";
import AdminHeaderComponent from "./AdminHeaderComponent";
import TableCodeGroupDetail from "./TableCodeGroupDetail";

function AdminCodeEditComponent() {
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
    }]

    function useConfirm(){
        if(window.confirm("입력하신 내용을 저장하시겠습니까?")){
            // <BrowserRouter>
            //     <Routes>
            //             <Route path={ContextPath("/admin")} element={<PrivateRoute component={AdminMainComponent} status={state}/>}/>
            //     </Routes>
            // </BrowserRouter>
            // useHref ("/admin");
            alert("오케");
        }else{
            <a href="/admin"></a>
        }
    }
    
    const [text,setText] = useState(testData[1].CD_NM)
    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 등록/수정" info="" />
            <div className="mt-7 mb-3">
                <ul className="nav">
                    <li className="col-10 align-self-center">항목 이름 <input className="bg-light border-1" value={text} onChange={(event) =>{setText(event.target.value)}} /></li>
                    <li className="col-2 text-end text-secondary align-self-center">데이트 : {testData[1].REGIST_DT}</li>
                </ul>
            </div>
            <div>
                <TableCodeGroupDetail tableData={testData} />
            </div>
            <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="저장" 
                  onClick={useConfirm}/>
                </div>
        </div>
    )
}

export default AdminCodeEditComponent;