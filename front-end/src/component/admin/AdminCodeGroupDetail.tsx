import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch } from "utils/TokenContext";
import AdminButtonComponent from "./AdminButtonComponent";
import AdminHeaderComponent from "./AdminHeaderComponent";
import TableCodeGroupDetail from "./TableCodeGroupDetail";

function AdminCodeGroupDetail() {
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', page: "codeDetail"})
}, []);


   const testData : any[] = [
        {//코드번호,코드명,코드설명,코드그룹번호,삭제여부,사용자아이디,등록일시,수정일시
          CD_NO: 'A-1',
          CD_NM: '낮음',
          CD_EXPLNT:'급하지 않은 업무 처리 건',
          CD_GRP_NO: 'A',
          DEL_YN : 'N',
          USER_ID : '관리자',
          REGIST_DT : '2021.01.12',
          UPD_DT : '2022.01.18',
        },{
          CD_NO: 'A-2',
          CD_NM: '보통',
          CD_EXPLNT:'',
          CD_GRP_NO: 'A',
          DEL_YN : 'N',
          USER_ID : '관리자',
          REGIST_DT : '2021.01.12',
          UPD_DT : '2022.01.20',
        },{
          CD_NO: 'A-3',
          CD_NM: '높음',
          CD_EXPLNT:'',
          CD_GRP_NO: 'A',
          DEL_YN : 'N',
          USER_ID : '관리자',
          REGIST_DT : '2021.01.12',
          UPD_DT : '2022.01.23',
        },{
          CD_NO: 'A-4',
          CD_NM: '긴급',
          CD_EXPLNT:'긴급을 요하는 중요 업무 처리 건',
          CD_GRP_NO: 'A',
          DEL_YN : 'N',
          USER_ID : '관리자',
          REGIST_DT : '2021.01.12',
          UPD_DT : '2022.01.25',
        },
      ]

    function useConfirm(){
        if(window.confirm("입력하신 내용을 저장하시겠습니까?")){
            alert("저장되었습니다");
        }else{
            navigate(ContextPath(API_ADMIN_PATH.codeGroup));
        }
    }

    // window.onbeforeunload = function () {
    //   return "내용이 안바뀌는데요?";
    // };

    // window.onpageshow = function(event){
    //   if(event.persisted || (window.performance && window.performance.navigation.type == 2)) {
    //     alert("감지");
    //   } 
    // }

    // window.onhashchange = function() {
    //   return "내용이 안바뀌는데요?";
    //  }

    const target = document.getElementsByClassName('nav');

    // 감시자 인스턴스 만들기
    let observer = new MutationObserver((mutations) => {
        // 노드가 변경 됐을 때의 작업
        alert('DOM 변경 감지');
    })

    // 감시자의 설정
    let option = {
        attributes: true,
        childList: true,
        characterData: true
    };

    // 대상 노드에 감시자 전달
    // observer.observe(target,option);


    const [text,setText] = useState(testData[1].CD_NM)
    return(
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 등록/수정" info="" />
            <div className="mt-7 mb-3">
                <ul className="nav">
                    <li className="col-9 align-self-center">항목 이름 <input className="bg-light border-1 text-secondary" value={text} onChange={(event) =>{setText(event.target.value)}} /></li>
                    <li className="col-3 text-end text-secondary align-self-center">업데이트 : {testData[1].REGIST_DT}</li>
                </ul>
            </div>
            <div>
                <TableCodeGroupDetail tableData={testData} />
            </div>
            <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="저장" onEventHandler={useConfirm}/>
                </div>
        </div>
    )
}

export default AdminCodeGroupDetail;