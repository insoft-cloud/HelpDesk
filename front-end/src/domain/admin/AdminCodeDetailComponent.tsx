import { procGetAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import TableComponent from "component/table/TableComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";

/**
 * @Project     : HelpDesk
 * @FileName    : AdminCodeGroupComponent.tsx
 * @Date        : 2021-01-24
 * @author      : 김수진
 * @description : 서비스코드상세 리스트화면 컴포넌트
 */

function AdminCodeDetailComponent() {
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const state = useTokenState();
    const [text,setText] = useState('')
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "codeDetail"})
        procGetAxios("/user/service/requests/test?day=all", state.token,"application/json",getData);
    }, [state.token]);

    function getData(data) {
    setTableData(data.content)
    }

    const column = [
        { heading : '코드', value : 'priortCd'},
        { heading : '명칭', value : 'sysCd'},
        { heading : '설명', value : 'ttl'},
        { heading : '등록자', value : 'registDt'},
        { heading : '등록일', value : ''},
        { heading : '삭제', value : ''},
      ]

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
            <TableComponent data={tableData} column={column}/>
            </div>
            <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="저장" onEventHandler={useConfirm}/>
                </div>
        </div>
    )

    function del(){
        console.log('del버튼');
      }

    function useConfirm(){
      if(window.confirm("입력하신 내용을 저장하시겠습니까?")){
          alert("저장되었습니다");
      }else{
          navigate(ContextPath(API_ADMIN_PATH.codeGroup));
      }
    }
}

export default AdminCodeDetailComponent;

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