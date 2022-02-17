import { procGetAxios } from "axios/Axios";
import CheckTableComponent from "component/table/CheckTableComponent";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import "./Modal.css"
function Modal({open, close, header,modalSize}){
    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [tableData, setTableData] = useState([]);
    const [testdays,setTestDays] = useState("all"); //selectTest

    const [isSelected,setIsSelected] = useState('전체');
    const [chkNums, setChkNums] = useState<Array<number>>(new Array());
    
    const [word,setWord] = useState('');
    const [inputTxt,setInputTxt] = useState('');
    
    //체크박스
    const [chkArr, setChkArr] = useState<Array<number>>(new Array());
 
    useEffect(()=>{
        dispatch({ type: 'SET_PAGE', page: "codeGroup"})
        procGetAxios("/user/service/requests/test?day="+testdays,state.token,"application/json",getData);
        setChkNums(chkArr);
        setIsSelected(isSelected);
    },[isSelected,state.token,testdays,chkArr]);

    function getData(data) {
        setTableData(data.content)
      }

    //전체선택
    const allCheck = (e) =>{ 
    if(e){
        const checkedArray:number[] = [];
        tableData.forEach((element,index) => {
            if(index)
            checkedArray.push(index);
        });
        setChkArr(checkedArray);
    }else{
        setChkArr([]);
    }
    }
    //개별체크
    const changeHandler = useCallback( 
        (e,index) => {
        if(e){
            setChkArr([...chkArr,index])
        }else{
            setChkArr(chkArr.filter((i)=>i!==index))
        }
        
    },[chkArr])

    const search = () => {
        setWord(inputTxt);
    }

    const columns = useMemo(
        () => [
            {Header : "아이디",accessor: "ttl"},
            {Header : "이름",accessor: "cnts"},
            {Header : "직급",accessor: "tyCd"},
            //id,NM,RNK_CD
        ],[])

    const [chkValue,setValue] = useState('');
    const checkHandle = () => {
        if(chkNums.length===1){
            console.log(tableData[chkNums[0]]['id']);
            alert(tableData[chkNums[0]]['id']);
        }else{
            alert('한개 선택');
        }
    }
    return(
        <div className={open?'openModal modal' : 'modal'}>
            {open?(
                <section className={modalSize}>
                    <header>
                        <span>{header}</span>
                        <button className="close" onClick={close}>
                            {''} &times;{''}
                        </button>
                        
                        <hr />
                    </header>
                    <div>
                        <select onChange={(e) =>setIsSelected(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="기관명">기관명</option>
                            <option value="이름">이름</option>
                        </select>
                        <input type="text" onChange={(e)=>setInputTxt(e.target.value)} value={inputTxt}/>
                        <button className="searchBtn" onClick={search}>검색</button>
                    </div>
                    <div className="instBox">
                        <p>기관을 선택하면 우측에 이름이 표시됩니다</p>
                        <li className="list-unstyled"><input type="radio" name="inst" value="all" checked={chkValue==="all"} onChange={e=>{setValue(e.target.value); setTestDays(e.target.value)}}/>중소기업기술정보진흥원</li>
                        <li className="list-unstyled"><input type="radio" name="inst" value="month" checked={chkValue==="month"} onChange={e=>{setValue(e.target.value); setTestDays(e.target.value)}}/>가온아이</li>
                        <li className="list-unstyled"><input type="radio" name="inst" value="week" checked={chkValue==="week"} onChange={e=>{setValue(e.target.value); setTestDays(e.target.value)}}/>중소벤처기업부</li>
                    </div>
                    <div className="memBox">
                        <CheckTableComponent columns={columns} data={tableData}  limitCnt="3" word={word} changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr} isSelected={null}/>
                    </div>
                    <footer className="d-flex justify-content-center">
                        <button className="btn btn-xs ms-2" onClick={close}>닫기</button>
                        <button className="btn btn-xs ms-2" onClick={checkHandle}>선택 </button>
                    </footer>
                </section>
            ):null}
        </div>
    )

    
}

export default Modal;