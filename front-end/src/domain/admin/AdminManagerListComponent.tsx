import { useEffect, useMemo, useState } from "react";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import { procGetAxios } from "axios/Axios";
import CheckTableComponent from "component/table/CheckTableComponent";

/**
 * @Project     : HelpDesk
 * @FileName    : AdminManagerListComponent.tsx
 * @Date        : 2021-01-27
 * @author      : 김수진
 * @description : 서비스운영자 리스트 컴포넌트
 */

function AdminManagerListComponent(){

    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [tableData, setTableData] = useState([]);
    const [chkNums, setChkNums] = useState<Array<number>>(new Array());
    const [isModalOpen,setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "codeDetail"})
        procGetAxios("/user/service/requests/"+state.user+"?day=all", state.token,"application/json",getData);
    }, [state.token]);

    function getData(data) {
    setTableData(data.content)
    }

    const openModal= () => {
      setIsModalOpen(!isModalOpen);
      console.log('팝업창 오픈')
     }

    const columns = useMemo(
      () => [
        {Header : "코드",accessor: "priortCd"},
        {Header : "명칭",accessor: ""},
        {Header : "설명",accessor: "ttl"},
        {Header : "등록자",accessor: ""},
        {Header : "등록일",accessor: "registDt"},
        {Header : "삭제",accessor: ""},
      ],[])


    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 운영자 등록" info="서비스 운영 담당자를 관리할 수 있는 메뉴입니다."/>
                <div className="d-flex justify-content-end">
                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"}/>
                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="추가" onEventHandler={openModal} url={"null"}  />
                </div>
            <div>
            <CheckTableComponent data={tableData} columns={columns} setChkNums={setChkNums}/>
            </div>

            {/* <React.Fragment>
                <button onClick={openModal}>모달팝업</button>
                <Modal open={openModal} close={closeModal} header="Modal heading" children="팝업창입니다 쉽게만들수있어요" />
            </React.Fragment> */}
            
            {/* <Modal isOpen={isModalOpen} close={closeModal} /> */}
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
  
 

   // const [modalOpen, setModalOpen] = useState(false);
    // const openModal = () => {
    //     setModalOpen(true);
    // }
    // const closeModal = () => {
    //     setModalOpen(false);
    // }
}

 

export default AdminManagerListComponent;