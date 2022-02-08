import { ButtonComponent } from "component/button/ButtonComponent";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useEffect, useState } from "react";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import CheckTableComponent from "component/table/CheckTableComponent";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import { procGetAxios } from "axios/Axios";

function AdminManagerListComponent(){

    let dispatch = useTokenDispatch();
    const state = useTokenState();
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

    // const [modalOpen, setModalOpen] = useState(false);
    // const openModal = () => {
    //     setModalOpen(true);
    // }
    // const closeModal = () => {
    //     setModalOpen(false);
    // }

   const [isModalOpen,setIsModalOpen] = useState(false);

   const openModal= () => {
    setIsModalOpen(!isModalOpen);
   }

//    const closeModal = () => {
//        setIsModalOpen(!isModalOpen);
//    }

    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 운영자 등록" info="서비스 운영 담당자를 관리할 수 있는 메뉴입니다."/>
                <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="삭제" onEventHandler={testResult} />
                  <ButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="추가" url={ContextPath.call('codeEdit',API_ADMIN_PATH.codeDetail)} />
                </div>
            <div>
            <CheckTableComponent data={tableData} column={column} del={testResult}/>
            </div>

            {/* <React.Fragment>
                <button onClick={openModal}>모달팝업</button>
                <Modal open={openModal} close={closeModal} header="Modal heading" children="팝업창입니다 쉽게만들수있어요" />
            </React.Fragment> */}
            <button onClick={openModal}>Modal Open</button>
            {/* <Modal isOpen={isModalOpen} close={closeModal} /> */}
        </div>
    )
}

function testResult() {
    alert("이벤트!");
  };

export default AdminManagerListComponent;