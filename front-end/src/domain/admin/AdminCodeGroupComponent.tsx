import AdminHeaderComponent from 'component/layout/AdminHeaderComponent';
import AdminButtonComponent from 'component/button/AdminButtonComponent';
import { useEffect, useState} from 'react';
import { ButtonComponent } from 'component/button/ButtonComponent';
import { API_ADMIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch, useTokenState} from 'utils/TokenContext';
import { procGetAxios } from 'axios/Axios';
import CheckTableComponent from 'component/table/CheckTableComponent';

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
  const [tableData,setTableData] = useState([]);

    useEffect(() => {
      dispatch({ type: 'SET_PAGE', page: "codeGroup"})
      procGetAxios("/user/service/requests/test?day=all", state.token,"application/json",getData);
    }, [state.token]);

    function getData(data) {
      setTableData(data.content)
    }

    const column = [
      { heading : '코드', value : 'id'},
      { heading : '항목', value : 'sysCd'},
      { heading : '등록자', value : 'ttl'},
      { heading : '등록일', value : 'registDt'},
    ]

  return (
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 관리" info="헬프 데스크 서비스 운영에 필요한 항목들을 분류하고 관리합니다."/>
                <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="삭제" onEventHandler={del} />
                  <ButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="추가" url={ContextPath(API_ADMIN_PATH.codeDetail)} />
                </div>
                <div>
                <CheckTableComponent data={tableData} column={column} del={del}/>
                </div>
              
        </div>
          
  );

 
  function del(){
    console.log('del버튼');
  }
}

export default AdminCodeGroupComponent;



