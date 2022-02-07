import { procGetAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import TableCodeGroupDetail from "component/table/TableCodeGroupDetail";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";

function AdminCodeDetailComponent() {
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const state = useTokenState();
    const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', page: "codeDetail"})
    procGetAxios("/user/service/requests/test", state.token,"application/json",show);
}, [state.token]);

function show(data) {
  setTableData(data.content)
}


    function useConfirm(){
        if(window.confirm("입력하신 내용을 저장하시겠습니까?")){
            alert("저장되었습니다");
        }else{
            navigate(ContextPath(API_ADMIN_PATH.codeGroup));
        }
    }

    // 감시자 인스턴스 만들기
    // let observer = new MutationObserver((mutations) => {
    //     // 노드가 변경 됐을 때의 작업
    //     alert('DOM 변경 감지');
    // })

    // 감시자의 설정
    // let option = {
    //     attributes: true,
    //     childList: true,
    //     characterData: true
    // };

    // 대상 노드에 감시자 전달
    // observer.observe(target,option);


    const [text,setText] = useState('')
    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 등록/수정" info="" />
            <div className="mt-7 mb-3">
                <ul className="nav">
                    <li className="col-9 align-self-center">항목 이름 <input className="bg-light border-1 text-secondary" value={text} onChange={(event) =>{setText(event.target.value)}} /></li>
                    <li className="col-3 text-end text-secondary align-self-center">업데이트 : '2022-02-07'</li>
                </ul>
            </div>
            <div>
                <TableCodeGroupDetail tableData={tableData} />
            </div>
            <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="저장" onEventHandler={useConfirm}/>
                </div>
        </div>
    )
}

export default AdminCodeDetailComponent;