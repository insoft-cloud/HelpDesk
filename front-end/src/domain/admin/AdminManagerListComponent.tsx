import { useCallback, useEffect, useMemo, useState } from "react";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import { procGetAxios } from "axios/Axios";
import CheckTableComponent from "component/table/CheckTableComponent";
import Modal from "./Modal";

/**
 * @Project     : HelpDesk
 * @FileName    : AdminManagerListComponent.tsx
 * @Date        : 2022-01-27
 * @author      : 김수진
 * @description : 서비스운영자 리스트 컴포넌트
 */

function AdminManagerListComponent(){

    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [tableData, setTableData] = useState([]);
    const [chkNums, setChkNums] = useState<Array<number>>(new Array());
    //체크박스
    const [chkArr, setChkArr] = useState<Array<number>>(new Array()); 
    const [isModalOpen,setIsModalOpen] = useState(false);//전체체크
    const allCheck = (e) =>{ 
        if(e){
            const checkedArray:number[] = [];
            tableData.forEach((element,index) => {
                checkedArray.push(index);
            });
            setChkArr(checkedArray);
        }else{
            setChkArr([]);
        }}
    //개별체크
    const changeHandler = useCallback( 
        (e,index) => {
        if(e){
            setChkArr([...chkArr,index])
        }else{
            setChkArr(chkArr.filter((i)=>i!==index))
        }
        
    },[chkArr])

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "codeDetail"})
        procGetAxios("/user/service/requests/"+state.user+"?day=all", state.token,"application/json",getData);
        setChkNums(chkArr)
    }, [state.token,chkArr]);

    function getData(data) {
    setTableData(data.content)
    }

    const openModal= () => {
        setIsModalOpen(true);
     }

    const closeModal = () => {
      setIsModalOpen(false);
    }

    const columns = useMemo(
      () => [
        {Header : "코드",accessor: "keys"},
        {Header : "명칭",accessor: "tyCd"},
        {Header : "설명",accessor: "ttl"},
        {Header : "등록자",accessor: ""},
        {Header : "등록일",accessor: "registDt"},
      ],[])


    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 운영자 등록" info="서비스 운영 담당자를 관리할 수 있는 메뉴입니다."/>
                <div className="d-flex justify-content-end">
                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"}/>
                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="추가" onEventHandler={openModal} url={"null"} />
                </div>
            <div>
            <CheckTableComponent data={tableData} columns={columns} limitCnt="10" word="" changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr}/>
            </div>
            <div  >
                {isModalOpen && (<Modal open={isModalOpen} close={closeModal} header="운영자 추가" />)}
            </div>
        </div>
    )

    //삭제
 function del(){
   if(chkNums.length<=0){
     alert('삭제할 항목에 체크해주세요');
   }else{
    chkNums.forEach((index)=> {
      console.log(tableData[index])
    }) 
   }
  }
}

 

export default AdminManagerListComponent;