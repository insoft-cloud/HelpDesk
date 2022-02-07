import { ButtonComponent } from "component/button/ButtonComponent";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import AdminButtonComponent from "./AdminButtonComponent";
import AdminHeaderComponent from "./AdminHeaderComponent";
import TableManagerList from "./TableManagerList";
import { useState } from "react";
import Modal from "./Modal";

function AdminManagerList(){

    const testData : any[] = [
        {//TB_HELP_MBR
        //이름 담당업무 소속기관명 소속부서 등록일???
        USER_ID: 'AAA',
        NM: '홍길동',
        JOB_CD: 'Call',
        PSITN_INSTT_CD: '중소기술정보진흥원',
        PSITN_DEPT_NM: '정보화지원실',
        REGIST_DT : '2021.01.12',
        }
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

   const closeModal = () => {
       setIsModalOpen(!isModalOpen);
   }

    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 운영자 등록" info="서비스 운영 담당자를 관리할 수 있는 메뉴입니다."/>
                <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="삭제" onEventHandler={testResult} />
                  <ButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="추가" url={ContextPath.call('codeEdit',API_ADMIN_PATH.codeDetail)} />
                </div>
            <div>
                <TableManagerList tableData={testData} />
            </div>

            {/* <React.Fragment>
                <button onClick={openModal}>모달팝업</button>
                <Modal open={openModal} close={closeModal} header="Modal heading" children="팝업창입니다 쉽게만들수있어요" />
            </React.Fragment> */}
            <button onClick={openModal}>Modal Open</button>
            <Modal isOpen={isModalOpen} close={closeModal} />
        </div>
    )
}

function testResult() {
    alert("이벤트!");
  };

export default AdminManagerList;