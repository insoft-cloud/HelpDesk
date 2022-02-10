import { procGetAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import AddRowTableComponent from "component/table/AddRowTableComponent";
import moment from "moment";
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
    const [tableData, setTableData] = useState<Object>([]);
    const [viewData,setViewData] = useState(new Set());
    const [delData,setDelData] = useState<Set<number>>(new Set());
    const [text,setText] = useState('');
    const [date,setDate] = useState(moment().format('YYYY.MM.DD HH:mm'));
    
    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "codeDetail"})
        procGetAxios("/user/service/requests/test?day=all", state.token,"application/json",getData);
        window.onbeforeunload = function () {
            return '메세지 내용';
        };
        window.onhashchange = function() {
            return "안바뀌나봐";
        }
    }, [state.token]);

    function getData(data) {
    setTableData(data.content)
    }

    const column = [
        { heading : '코드', value : 'cnts',class: "col-md-2 bg-gray"},
        { heading : '명칭', value : 'ttl',class: "col-md-2 bg-gray"},
        { heading : '설명', value : 'id',class: "col-md-3 bg-gray"},
        { heading : '등록자', value : 'reqId',class: "col-md-2 bg-gray"},
        { heading : '등록일', value : 'registDt',class: "col-md-1 bg-gray"},

      ]

    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 등록/수정" info="" />
            <div className="mt-7 mb-3">
                <ul className="nav">
                    <li className="col-9 align-self-center">항목 이름 <input className="bg-light border-1 text-secondary" value={text} onChange={(event) =>{setText(event.target.value)}} /></li>
                    <li className="col-3 text-end text-secondary align-self-center">업데이트 : {date}</li>
                </ul>
            </div>
            <div>
            <AddRowTableComponent data={tableData} column={column} setViewData={setViewData} delData={delData} setDelData={setDelData} />
            </div>
            <div className="d-flex justify-content-end">
                  <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="저장" onEventHandler={useConfirm} url="null"/>
                </div>
        </div>
    )

    function useConfirm(){
        let data = "";
        delData.forEach((element) => {
            data += element+"\n"
          });
      if(window.confirm("입력하신 내용을 저장하시겠습니까?")){
         console.log(data);
         setDate(moment().format('YYYY.MM.DD HH:mm'));
          alert("저장되었습니다");
      }else{
          navigate(ContextPath(API_ADMIN_PATH.codeGroup));
      }
    }
}

export default AdminCodeDetailComponent;