import AdminHeaderComponent from 'component/layout/AdminHeaderComponent';
import AdminButtonComponent from 'component/button/AdminButtonComponent';
import { useEffect, useState} from 'react';
import { API_ADMIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch, useTokenState} from 'utils/TokenContext';
import { procGetAxios } from 'axios/Axios';
import CheckTableComponent from 'component/table/CheckTableComponent';
import { useNavigate } from 'react-router-dom';

/**
 * @Project     : HelpDesk
 * @FileName    : AdminCodeGroupComponent.tsx
 * @Date        : 2021-01-17
 * @author      : 김수진
 * @description : 서비스코드그룹 리스트화면 컴포넌트
 */

function AdminCodeGroupComponent() {

  let dispatch = useTokenDispatch();
  const state = useTokenState();
  const [tableData,setTableData] = useState<Object>([]);
  const [contentType] = useState("application/json");
  const [url] = useState("/user/service/requests/test?day=all");
  const [chkArr, setChkArr] = useState<Set<number>>(new Set());
  const navigate = useNavigate();
  const [path] = useState('null');

  // console.log('-------여기-------')
  // console.log(adminYn);
 
    useEffect(() => {
      dispatch({ type: 'SET_PAGE', page: "codeGroup"})
      procGetAxios(url,state.token,contentType,getData);

    }, [url,contentType,state.token]);

    function getData(data) {
      setTableData(data.content)
    }

    const column = [
      { heading : '코드', value : 'id'},
      { heading : '항목', value : 'sysCd'},
      { heading : '등록자', value : 'ttl'},
      { heading : '등록일', value : 'registDt'},
      
    ]
    
    
    // useEffect(() => {
    //   if(tableData[1].requestAttachments[0].id){
    //     console.log(tableData[1].requestAttachments[0].id);
    //   }
    // },[tableData[1].requestAttachments[0].id]);

    
    

  return (
        <div className="container">
          <div className="card-body">
            <AdminHeaderComponent title="서비스 코드 관리" info="헬프 데스크 서비스 운영에 필요한 항목들을 분류하고 관리합니다."/>
                <div className="d-flex justify-content-end">
                  <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2  ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"} />
                  <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="추가" path={path} onEventHandler={add} url={"null"} />
                </div>
                <div>
                  <CheckTableComponent data={tableData} column={column} chkArr={chkArr} setChkArr={setChkArr}/>
                </div>
          </div>
        </div>
          
  );

  //삭제
  function del(){
    let arr = "";
    chkArr.forEach((index)=> {
      console.log(tableData[index])
      arr += tableData[index].id +", \n"
    })
    if(arr===""){alert('삭제번호 선택')}else{alert(arr)};
    
  }

  function add(){
    if(chkArr.size!==1){
      alert('하나 선택');
    }else{
      navigate(ContextPath(API_ADMIN_PATH.codeDetail));
    }
    // chkArr.forEach(e=>{
    //   console.log(e);
    //   setPath(tableData[e]);
    // })
    // console.log(tableData[checkNum]);
  }

  
}

export default AdminCodeGroupComponent;



