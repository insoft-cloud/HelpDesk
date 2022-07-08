import AdminButtonComponent from 'component/button/AdminButtonComponent';
import { useEffect, useState, useMemo, useCallback } from 'react';
import {API_ADMIN_PATH, API_DOMAIN_PATH, ContextPath} from 'utils/ContextPath';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';
import { procGetAxios, procPostAxios } from 'axios/Axios';
import CheckTableComponent from 'component/table/CheckTableComponent';
import {Link, useNavigate} from 'react-router-dom';
import moment from 'moment';
import InputEditComponent from 'component/input/InputEditComponent';
import TittleComponent from 'component/div/TittleComponent';
import CodeAddModalComponent from 'component/modal/CodeAddModalComponent';
import CheckPagingComponent from "../../component/list/CheckPagingComponent";
import {txtBlock, txtButton} from "../../utils/CommonText";
import {AuthCode} from "../../utils/AdminCode";



/**
 * @Project     : HelpDesk
 * @FileName    : AdminCodeGroupComponent.tsx
 * @Date        : 2022-01-17
 * @author      : 김수진
 * @description : 서비스코드그룹 리스트화면 컴포넌트
 */

function AdminCodeGroupComponent() {
  let dispatch = useTokenDispatch();
  let editCdNm = "";
  const state = useTokenState();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [contentType] = useState("application/json");
  const [path] = useState('null');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cdNo, setCdNo] = useState('');
  const [cdNm, setCdNm] = useState('');
  let editBtn: any[] = []; //수정
  let delId: "";
  //페이징
  const [pageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPages,setTotalPages] = useState(0);
  let nowPage = 0;
  //체크박스
  const [chkArr, setChkArr] = useState<Array<number>>(new Array());
  const checkedArray: number[] = [];
  const [chkNums, setChkNums] = useState<Array<number>>(new Array());
  useEffect(() => {
    if(state.auth!==AuthCode.Admin){
      alert(txtBlock.authBlock);
      navigate(ContextPath(API_DOMAIN_PATH.main));
    }
    dispatch({ type: 'SET_PAGE', page: "codeGroup", actTime: new Date().getTime().toString() })
    getData();
    setChkNums(chkArr);
  }, [contentType, state.token,chkArr, editCdNm,page]);
  function getData() {
    procGetAxios("/admin/groups?sort=registDt&page="+page+"&size="+pageSize, state.token, contentType, setData);
    procGetAxios("/admin/groups/count", state.token, contentType, getCount);
  }
  function setData(data) {
    setTableData(data.content);
    setTotalPages(data.totalPages);
    nowPage = page;
  }
  function getCount(data){
    setTotal(data);
  }
  function error() {
    console.log(error)
  }
  //modal
  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setCdNo('');
    setCdNm('');
  }
  //전체체크
  const allCheck = (e) =>{
    if(e){
      let end = pageSize;
      if(page+1===totalPages){
        end = total%pageSize;
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
  //cdNm 수정
  const getValue = (text) => {
    editCdNm = text;
  }

  const columns = useMemo(
    () => [
      { Header: "코드", id: "id", accessor: a => <Link to={ContextPath(API_ADMIN_PATH.codeDetail)} state={{ data: (a.id) }}>{a.id}</Link> },
      { Header: "항목", accessor: (a, index) => editBtn[page*pageSize+index] ? <InputEditComponent value={a.name} getValue={getValue} id="" idx={page*pageSize+index}/> : a.name },
      { Header: "등록자", accessor: "userId" },
      { Header: "등록일", id: "registDt", accessor: a => <span>{a.registDt.substring(0, 10)}</span> },
      {
        Header: "수정",
        accessor: (a, index) => <AdminButtonComponent btnName={editBtn[page*pageSize+index] ? txtButton.save : txtButton.edit} btnClassName="btn btn-xs btn-secondary" onEventHandler={() => edit(page*pageSize+index, a.id, a.name)} url={"null"} />
      },
    ], [page,editCdNm]);

  return (
    <section>
      <TittleComponent tittle={"서비스 코드 관리"} subTittle={"헬프 데스크 서비스 운영에 필요한 항목들을 분류하고 관리합니다."} />
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
                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2  ml-3 mb-3" btnName="삭제" onEventHandler={del} url={"null"} />
                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName="추가" path={path} onEventHandler={openModal} url={"null"} />
              </div>
            </div>
            <div className="table-responsive fs-sm">
              <CheckTableComponent data={tableData} columns={columns} limit={page+1===totalPages?total%pageSize===0?pageSize:total%pageSize:pageSize} changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr} />
            </div>
            <div>
              {isModalOpen && (<CodeAddModalComponent open={isModalOpen} close={closeModal} header="코드그룹 추가"
                modalSize="md-sm" event={add} cdNo={cdNo} setCdNo={setCdNo} cdNm={cdNm} setCdNm={setCdNm} />)}
            </div>
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation example">
                <CheckPagingComponent page={page} setPage={setPage} totalPages={totalPages} setChkArr={setChkArr} />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  //post
  function add(e) {
    e.preventDefault();
    let body = {
      id: cdNo,
      name: cdNm,
      delYn: 'N',
      registDt: moment(),
      userId: state.user,
    }
    procPostAxios("/admin/group", state.token, contentType, body, getData, error)
    closeModal();
    setPage(totalPages-1)
  }
  //patch

  function edit(index, groupId, name) {
    editBtn.forEach((e,i)=>{
      if(i!==index){
        editBtn[i] = false;
      }
    })
    if (editBtn[index] === undefined) {
      editBtn[index] = true;
    } else {
      editBtn[index] = !editBtn[index];
    }
    if (editCdNm === "") {editCdNm = name;}
    let body = {
      name: editCdNm,
      updateDt: moment(),
    }
    if (!editBtn[index]) {
      procPostAxios("/admin/group/" + groupId, state.token, contentType, body, getData, error);
      alert('수정되었습니다');

    }
    else {
      getData()
    }
    editCdNm = "";
  }
  //delete
  function del() {

    if (chkNums.length >= 1) {
    if(window.confirm("삭제하시겠습니까?\n(해당 코드의 하위항목이 모두 삭제됩니다.)")){
         // Promise.all(
          chkNums.forEach(async index => {
            delId = tableData[index]['id'];
            await procGetAxios("/admin/group/" + delId + "/details",state.token,contentType,getDetails)
          })
        // )
      if (page === 0) { setPage(0) }
      let remain;
      if(page+1===totalPages){
        remain = total%pageSize;
      }else{
        remain = pageSize;
      }
      if (remain <= chkNums.length && page!==0) {
        setPage(page - 1)
      }
      setChkNums([]);
      allCheck(false);
      alert('삭제되었습니다');

    }

    }else{
      alert('삭제할 항목에 체크해주세요')
    }
  }
  function getDetails(data){
    let details = data.content;
    let ids:any[] = [];
    details.forEach(e => {
        ids.push(e)
    });
    let body = {
      updateDetail: [],
      createDetail: [],
      deleteDetail: ids
  };
    procPostAxios("/admin/group/" + delId + "/details",state.token,contentType,body,delGrp,error);
  }

  function delGrp(){
          chkNums.map(index=>{
            let body = {
              id : tableData[index]['id'],
              delYn : "Y"
            }
            procPostAxios("/admin/group/" + tableData[index]['id'], state.token, contentType, body, getData, error);
          })
  }
}

export default AdminCodeGroupComponent;



