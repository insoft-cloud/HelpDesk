import AdminHeaderComponent from 'component/admin/AdminHeaderComponent';
import AdminButtonComponent from 'component/admin/AdminButtonComponent';
import { useEffect} from 'react';
import { ButtonComponent } from 'component/button/ButtonComponent';
import TableCodeGroup from './TableCodeGroup';
import { API_ADMIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch} from 'utils/TokenContext';


function AdminCodeGroupList() {

  let dispatch = useTokenDispatch();

    useEffect(() => {
      dispatch({ type: 'SET_PAGE', page: "codeList"})
    }, []);


  return (
        <div className="container">
            <AdminHeaderComponent title="서비스 코드 관리" info="헬프 데스크 서비스 운영에 필요한 항목들을 분류하고 관리합니다."/>
              <div className="AdminCodeGroupList">
                <div className="d-flex justify-content-end">
                  <AdminButtonComponent className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="삭제" onEventHandler={testResult} />
                  <ButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 mb-3" btnName="추가" url={ContextPath.call('codeEdit',API_ADMIN_PATH.codeDetail)} />
                </div>
                <div>
                  <TableCodeGroup />
                </div>
              </div> 
        </div>
          
  );

  function testResult() {
    alert("이벤트!");
  };

}

export default AdminCodeGroupList;



