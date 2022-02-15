import AdminHeaderComponent from 'component/layout/AdminHeaderComponent';
import AdminButtonComponent from 'component/button/AdminButtonComponent';
import { useEffect, useState,useMemo, useCallback} from 'react';
import { API_ADMIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch, useTokenState} from 'utils/TokenContext';
import { procGetAxios } from 'axios/Axios';
import CheckTableComponent from 'component/table/CheckTableComponent';
import { useNavigate } from 'react-router-dom';


/**
 * @Project     : HelpDesk
 * @FileName    : AdminCodeGroupComponent.tsx
 * @Date        : 2022-01-17
 * @author      : 김수진
 * @description : 서비스코드그룹 리스트화면 컴포넌트
 */

function AdminCodeGroupComponent() {

  let dispatch = useTokenDispatch();
  const state = useTokenState();
  // const [tableData,setTableData] = useState<Object>([]);
  const [tableData, setTableData] = useState([]);
  const [contentType] = useState("application/json");
  const [url] = useState("/user/service/requests/test?day=all");
  const [chkNums, setChkNums] = useState<Array<number>>(new Array());
  const navigate = useNavigate();
  const [path] = useState('null');
  //체크박스
  const [chkArr, setChkArr] = useState<Array<number>>(new Array()); 
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
      dispatch({ type: 'SET_PAGE', page: "codeGroup"})
      procGetAxios(url,state.token,contentType,getData);
      setChkNums(chkArr)
    }, [url,contentType,state.token,chkArr]);

    function getData(data) {
      setTableData(data.content)
    }

    const columns = useMemo(
      () => [
        {Header : "코드",accessor: "id"},
        {Header : "항목",accessor: "sysCd"},
        {Header : "등록자",accessor: "ttl"},
        {Header : "등록일",accessor: "registDt"},
      ],[])

  return (
        <div className="container">
          <div className="card-body">
            <AdminHeaderComponent title="서비스 코드 관리" info="헬프 데스크 서비스 운영에 필요한 항목들을 분류하고 관리합니다."/>
                <div className="d-flex justify-content-end">
                  <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2  ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"} />
                  <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="추가" path={path} onEventHandler={add} url={"null"} />
                </div>
                <div>
                  <CheckTableComponent data={tableData} columns={columns} limitCnt="5" word="" changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr}/>
                </div>
          </div>
        </div>
          
  );

  //삭제
  function del(){
    let arr = "";

    chkNums.forEach((index)=> {
      console.log(tableData[index])
      arr += tableData[index]['id'] +", \n"
    })
    if(arr===""){alert('삭제번호 선택')}else{alert(arr)};
    
  }
  //추가
  function add(){
    if(chkNums.length!==1){
      alert('하나 선택');
    }else{
      let ttl:string = tableData[chkNums[0]]['ttl']
      navigate(ContextPath(API_ADMIN_PATH.codeDetail),{
        state: {cdNM : ""+ttl},
      });
    }
  }

  
}

export default AdminCodeGroupComponent;



