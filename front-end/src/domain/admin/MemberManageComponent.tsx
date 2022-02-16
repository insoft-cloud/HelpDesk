import { procGetAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import InputComponent from "component/input/InputComponent";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import CheckTableComponent from "component/table/CheckTableComponent";
import { DivType } from "interface/label/LabelType";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import Modal from "./Modal";

function MemberManageComponent(){
    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [tableData, setTableData] = useState([]);
    const [isSelected,setIsSelected] = useState('');
    const [inputTxt,setInputTxt] = useState('');
    const [chkNums, setChkNums] = useState<Array<number>>(new Array());
    const [word,setWord] = useState('');
    const [isModalOpen,setIsModalOpen] = useState(false);
   
     //페이징
     const limit = 5; 
     const [page, setPage] = useState(1);
     const offset = (page - 1) * limit;

    function getData(data) {
        setTableData(data.content)
    }

    const search = () => {
        setWord(inputTxt);
    }

    //체크박스
    const [chkArr, setChkArr] = useState<Array<number>>(new Array()); 
    const allCheck = (e) =>{ 
        if(e){
            const checkedArray:number[] = [];
            for(let i =0; i<limit; i++)

                checkedArray.push(i+offset);
            
            setChkArr(checkedArray);
        }else{
            setChkArr([]);
    }}
    const changeHandler = useCallback( 
        (e,index) => {
        if(e){
            setChkArr([...chkArr,index])
            
        }else{
            setChkArr(chkArr.filter((i)=>i!==index))
        }
        
    },[chkArr])

    useEffect(()=>{
        dispatch({ type: 'SET_PAGE', page: "codeGroup"})
        procGetAxios("/user/service/requests/test?day=all",state.token,"application/json",getData);
        setIsSelected(isSelected);
        setChkNums(chkArr)
    },[chkArr,isSelected,state.token]);

      //삭제
  function del(){
    let arr = "";
    chkNums.forEach((index)=> {
      console.log(tableData[index])
      arr += tableData[index]['id'] +", \n"
    })
    if(arr===""){alert('삭제번호 선택')}else{alert(arr)};
  }

  //모달
    const openModal= () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const columns = useMemo(
        () => [
        {
            Header : "ID",
            accessor: a => <div>{a.id.substring(0,6)}</div>
        },
        {
            Header : "이름",
            accessor: a=> <div>{a.ttl}</div>

        },
        {
            Header : "소속기관",
            accessor: "ttl"
        },
        {
            Header : "소속부서/팀",
            accessor: "id"
        },
        {
            Header : "이메일",
            accessor: a => <div>{a.registDt.substring(0,10)}</div>
        },
        {
            Header : "휴대폰",
            accessor: "reqId"
        },
        {
            Header : "가입일",
            accessor: "tyCd"
        },
        {
            Header : "권한그룹",
            accessor: a=> 
            <select>
                <option value="전체">전체</option>
                <option value="이름">이름</option>
                <option value="소속기관">소속기관</option>
            </select>
        },
        {
            Header : "설정",
            accessor: a => <span className="text-decoration-underline" onClick={openModal} >설정</span>
        },
        {
            Header : "승인",
            accessor:"delYn"

        },
        ],[])

    return(
        <div className="container">
            <AdminHeaderComponent title="회원 관리" info="중소벤처24 헬프데스크에 가입한 회원들의 가입 승인 및 권한 부여를 할 수 있습니다."/>
            <div className="d-flex justify-content-center mb-5">
                <select className="ml-3 mb-3 p-2" onChange={(e) =>setIsSelected(e.target.value)}>
                    <option value="">전체</option>
                    <option value="id">이름</option>
                    <option value="ttl">소속기관</option>
                </select>
                <input type="search" className="border border-secondary form-control p-2 ms-2 ml-3 mb-3 w-50" onChange={(e)=>setInputTxt(e.target.value)} value={inputTxt}/>
                <button className="btn btn-s btn-secondary ms-2 ml-3 mb-3" onClick={search}>검색</button>
            </div>
            <div className="d-flex justify-content-between">
                <p>{tableData.length}명</p>   
                <AdminButtonComponent btnClassName=" fr btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"}/>
            </div>
            <div>
            <CheckTableComponent data={tableData} columns={columns} limitCnt="10" word={word} changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr} isSelected={isSelected}/>
            </div>
            <div>
                {isModalOpen && (<Modal open={isModalOpen} close={closeModal} header="운영자 추가" modalSize="md-lg"/>)}
            </div>
        </div>
    )
}
export default MemberManageComponent;