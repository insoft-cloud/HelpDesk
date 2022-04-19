import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import { procGetAxios, procPostAxios } from "axios/Axios";
import CheckTableComponent from "component/table/CheckTableComponent";
import TittleComponent from "component/div/TittleComponent";
import ManagerModalComponent from "component/modal/ManagerModalComponent";
import moment from "moment";
import CheckPagingComponent from "../../component/list/CheckPagingComponent";

/**
 * @Project     : HelpDesk
 * @FileName    : AdminManagerListComponent.tsx
 * @Date        : 2022-01-27
 * @author      : 김수진
 * @description : 서비스운영자 리스트 컴포넌트
 */

function ServiceManagerListComponent() {

  let dispatch = useTokenDispatch();
  const state = useTokenState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentType] = useState("application/json");
  const [auth,setAuth] = useState([]);
  let job: any[] = [];
  const [tableData, setTableData] = useState<any[]>([]);
  let table_sub_data;
  //페이징
  const [pageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPages,setTotalPages] = useState(0);
  //체크박스
  const [chkArr, setChkArr] = useState<Array<number>>(new Array());
  const checkedArray: number[] = [];
  const [chkNums, setChkNums] = useState<Array<number>>(new Array());
  const [remain,setRemain] = useState(pageSize);
  let offsetRemain = pageSize;
  //전체체크
  const allCheck = (e) =>{
    if(e){
      let end = pageSize;
      if(page+1===totalPages){
        end = tableData.length%pageSize;
      }
      if(end===0) end=pageSize;
      for(let i=0; i<end; i++){
        checkedArray.push(i);
      }
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
  useEffect(() => {
    dispatch({ type: 'SET_PAGE', page: "serviceManager" })
    getData();
    setChkNums(chkArr)
  }, [state.token, chkArr,page]);

  function getData() {
    procGetAxios("/admin/auths?sort=cdId", state.token, contentType, getAuth)
    procGetAxios("/admin/group/JOB_CD/details",state.token,contentType,getJob);
    procGetAxios("/user/members/manager", state.token,contentType, setData);
  }

  function setData(data) {
    let arr:any[]=[];
    data.map((e,i)=>{
      if(Math.floor(i/pageSize)===page){
        arr.push(e)
      }
    })
    table_sub_data = arr;
    procGetAxios("/admin/group/SYS/details", state.token,contentType, setSys);
    setTotalPages(Math.ceil(data.length/pageSize));
  }
  function getAuth(data) {
    setAuth(data.content);
}
  function getJob(data){
    job = data.content;
  }
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    getData();
  }
  function setJob(id, value) {
    // if (window.confirm("권한을 변경하시겠습니까?")) {
        let body = {
            userId: id,
            updateDt: moment(),
            jobCode: value
        }
        procPostAxios("/user/member/" + id, state.token, contentType, body, getData, error);
        alert('수정되었습니다');
    // } else {

    // }
}
function setSys(data){
  table_sub_data.forEach(table => {
    data.content.forEach(r => {
      if(table.agencyCode ===r.cdId){
        table.cdId = r.name;
      }
    });
  });

  setTableData(table_sub_data);
}
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "userId" },
      { Header: "이름", accessor: "username" },
      { Header: "소속기관", accessor: "cdId"},
      { Header: "소속부서", accessor: "departmentName" },
      { Header: "담당업무", accessor: (a,i) =>
      <select key={i} className="form-control-sm" value={a.jobCode !== undefined ? a.jobCode : "none"} onChange={e => { setJob(a.userId, e.target.value) }}>
        <option value="none" hidden>업무선택</option>
            {job.map(e=>{
                return <option key={e.cdId} value={e.name}>{e.name}</option>
            })}
        </select>
      },
      { Header: "등록일",  accessor: a => <div>{a.updateDt.slice(0,10)}</div>},
    ], []);
  return (
    <section>
            <TittleComponent tittle={"서비스 담당자 등록"} subTittle={"서비스 운영 담당자를 관리할 수 있는 메뉴입니다."} />
            <div className="position-relative">
                <div className="shape shape-bottom shape-fluid-x text-light">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <div className="content-wrap">
              <div className="d-flex justify-content-center mt-7">
                <div className="w-75">
                  <div className="d-flex justify-content-between mb-2 align-items-center">
                    <div className="col-auto ms-auto fs-sm text-muted">
                        <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"} />
                        <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="추가" onEventHandler={openModal} url={"null"} />
                      </div>
                    </div>
                    <div>
                      <CheckTableComponent data={tableData} columns={columns} limit={page+1===totalPages?tableData.length%pageSize===0?pageSize:tableData.length%pageSize:pageSize} changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr} />
                    </div>
                    <div className="d-flex justify-content-center">
                      <nav aria-label="Page navigation example">
                        <CheckPagingComponent page={page} setPage={setPage} totalPages={totalPages} setChkArr={setChkArr} />
                      </nav>
                    </div>
                    <div>
                      {isModalOpen && (<ManagerModalComponent open={isModalOpen} close={closeModal} header="운영자 추가" modalSize="modal-md" />)}
                    </div>      
                  </div>  
                </div>
            </div>      
    </section>
  )
  function error(data){
    console.log(data)
  }
  //delete
  function del() {
      if (chkNums.length >= 1) {
        if (window.confirm("삭제하시겠습니까?")) {
          if (offsetRemain === 0) { offsetRemain = pageSize }
        chkNums.forEach((index) => {
          let delId = tableData[index]['userId'];
          let body = {
            userId : delId,
            auth : auth[2],
            jobCode : null
          }
            procPostAxios("/user/member/"+delId,state.token,contentType,body,getData,error);
        })
        if (page === 1) { setPage(1) }
          if (offsetRemain <= chkNums.length && page!==0) {
          setPage(page - 1)
        }

      alert('삭제되었습니다');
      setChkNums([]);
      allCheck(false);
    }
    }else{
      alert('삭제할 항목에 체크해주세요')
    }
  }
}



export default ServiceManagerListComponent;