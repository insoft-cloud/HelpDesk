import { procGetAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import AdminHeaderComponent from "component/layout/AdminHeaderComponent";
import CheckTableComponent from "component/table/CheckTableComponent";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";

function MemberManageComponent(){
    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [tableData, setTableData] = useState([]);
    const [isSelected,setIsSelected] = useState('전체');
    const [inputTxt,setInputTxt] = useState('');
    const [chkNums, setChkNums] = useState<Array<number>>(new Array());
    const [word,setWord] = useState('');
   
    function getData(data) {
        setTableData(data.content)
    }

    const search = () => {
        setWord(inputTxt);
    }

    //체크박스
    const [chkArr, setChkArr] = useState<Array<number>>(new Array()); 
    // const [isModalOpen,setIsModalOpen] = useState(false);//전체체크
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
            accessor: a => <Link to={ContextPath(API_ADMIN_PATH.managerRegist)} target="_self" rel="noopener noreferrer">설정</Link>
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
                    <option value="전체">전체</option>
                    <option value="이름">이름</option>
                    <option value="소속기관">소속기관</option>
                </select>
                <input type="search" className="border border-secondary form-control p-2 ms-2 ml-3 mb-3 w-50" onChange={(e)=>setInputTxt(e.target.value)} value={inputTxt}/>
                <button className="btn btn-s btn-secondary ms-2 ml-3 mb-3" onClick={search}>검색</button>
            </div>
            <div className="d-flex justify-content-between">
                <p>{tableData.length}명</p>   
                <AdminButtonComponent btnClassName=" fr btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"}/>
            </div>
            <div>
            <CheckTableComponent data={tableData} columns={columns} limitCnt="10" word={word} changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr}/>
            </div>
        </div>
    )
}
export default MemberManageComponent;