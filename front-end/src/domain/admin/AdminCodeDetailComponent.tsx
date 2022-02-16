import { procGetAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import AddRowTableComponent from "component/table/AddRowTableComponent";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";

/**
 * @Project     : HelpDesk
 * @FileName    : AdminCodeGroupComponent.tsx
 * @Date        : 2022-01-24
 * @author      : 김수진
 * @description : 서비스코드상세 리스트화면 컴포넌트
 */

function AdminCodeDetailComponent() {
    const location = useLocation();
    const response  = location.state as string;
    const [text,setText] = useState(response['cdNM']);
    console.log(text);
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const state = useTokenState();
    const [tableData, setTableData] = useState<any>([]);
    // const [viewData,setViewData] = useState(new Set())
    const [delData,setDelData] = useState<Set<number>>(new Set());
    const [date,setDate] = useState(moment().format('YYYY.MM.DD HH:mm'));
    const [idTest,setIdTest] = useState(['','','','','','','','','','']);
    const [cdExplntTest,setCdExplntTest] = useState(['','','','','','','','','','']);
    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "codeDetail"})
        procGetAxios("/admin/details", state.token,"application/json",getData);
        // window.onbeforeunload = null;
    }, [state.token]);

    function getData(data) {
    setTableData(data.content)
    }
    console.log(tableData)
    const columns = useMemo(
    () => [
        {
            Header : "코드",
            accessor: "id",
        },
        {
            Header : "명칭",
            accessor:"name",
        },
        {
            Header : "설명",
            id: "cdExplnt",
            accessor: a=> <input name="id" className="form-control" type="text" value={a.id} readOnly/>,
        },
        {
            Header : "등록자",
            id: "userId",
            accessor: "userId",
        },
        {
            Header : "등록일",
            id: "registDt",
            accessor: a=> <div className="text-secondary">{a.registDt.substring(0,10)}</div>,
        },
    ],[])

    //행삭제
    function delEvent(id) {
        setDelData(delData.add(id));
        setTableData(tableData.filter(del => del.id !== id))
       }
    //행추가
    function add(){
    const tbody = document.querySelector('tbody');
    let row = tbody?.insertRow(tbody.rows.length-1);
    row?.insertCell(0);
    let cell2 = row?.insertCell(1);
    let cell3 = row?.insertCell(2);
        row?.insertCell(3);
        row?.insertCell(4);
        row?.insertCell(5);
    let inputCD_NM = document.createElement('input');
    inputCD_NM.setAttribute("class","form-control");
    let inputCD_EXPLNT = document.createElement('input');
    inputCD_EXPLNT.setAttribute("class","form-control");
    cell2?.appendChild(inputCD_NM);
    cell3?.appendChild(inputCD_EXPLNT);
    }
    
    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 등록/수정" info="" />
            <div className="mt-7 mb-3">
                <ul className="nav">
                    <li className="col-9 align-self-center">항목이름 <input className="bg-light border-1 text-secondary" value={text} onChange={(event) =>{setText(event.target.value)}} /></li>
                    <li className="col-3 text-end text-secondary align-self-center">업데이트 : {date}</li>
                </ul>
            </div>
            <div>
            <AddRowTableComponent data={tableData} columns={columns}  delData={delData} setDelData={setDelData} limitCnt="5" setTableData={setTableData} delEvent={delEvent} add={add} test={idTest} setTest={setIdTest} cdExplntTest={cdExplntTest} setCdExplntTest={setCdExplntTest}/>
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
         setDate(moment().format('YYYY.MM.DD HH:mm'));
          alert("저장되었습니다");
      }else{
          navigate(ContextPath(API_ADMIN_PATH.codeGroup));
      }
    }
}

export default AdminCodeDetailComponent;