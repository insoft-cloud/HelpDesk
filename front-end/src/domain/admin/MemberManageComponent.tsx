import { procGetAxios, procPostAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import TittleComponent from "component/div/TittleComponent";
// import MemberModalComponent from "component/modal/MemberModalComponent";
import CheckTableComponent from "component/table/CheckTableComponent";
import moment from "moment";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import CheckPagingComponent from "../../component/list/CheckPagingComponent";
import sendEms from "../../utils/SendEms";
import {AuthCode} from "../../utils/AdminCode";
import {txtAlert, txtButton, txtConfirm} from "../../utils/CommonText";
import TableComponent from "../../component/table/TableComponent";

function MemberManageComponent() {
    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [category,setCategory] = useState<any[]>([]);
    // const [name, setName] = useState('');
    // const [agency, setAgency] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const preInputTxt = useRef<HTMLInputElement>(null);
    const preSelected = useRef<HTMLSelectElement>(null);
    const [event, setEvent] = useState(false);
    let table_sub_data;
    let authArr:object[];
    let auth = state.auth;
    let searchTxt;
    //페이징
    const [pageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    //체크박스
    const [chkArr, setChkArr] = useState<Array<number>>(new Array());
    const checkedArray: number[] = [];
    const [chkNums, setChkNums] = useState<Array<number>>(new Array());
    let offsetRemain = pageSize;

    useEffect(() => {
        procGetAxios("/admin/group/SEAR_CATE/details",state.token, contentType,setCate);
    }, [])

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "memberManage", actTime: new Date().getTime().toString() });
        search();
        setChkNums(chkArr);
    }, [state.token, chkArr, page, event]);

    function setData(data) {
        let sortTable = data.content.sort((a,b) => a.joinConfirmYN.localeCompare(b.joinConfirmYN));
        table_sub_data = sortTable;
        setTotalPages(data.totalPages);
        setTotal(data.totalElements);
        procGetAxios("admin/group/SYS/details",state.token,"application.json",setSys);
    }
    function setCate(data){
        setCategory(data.content);
    }
    function error() {
        console.log(error)
    }
    function search(){
        searchTxt = "{";
        if (preSelected.current?.value === 'all') {
            category.map((e, i) => {
                searchTxt += '"' + e.cdId+ '":"' + preInputTxt.current?.value + '"'
                if (i !== category.length - 1) { searchTxt += ',' }
            })
        } else {
            searchTxt += '"' + preSelected.current?.value + '":"' + preInputTxt.current?.value + '"}'
        }

        searchTxt += "}"
        if(auth === AuthCode.superAdmin){
            procGetAxios("/user/members/admin?sort=joinConfirmYN&search="+encodeURI(searchTxt)+"&page="+page+"&size="+pageSize,state.token,"application/json",setData);
        }else{
            procGetAxios("/user/members?sort=joinConfirmYN,userId&search="+encodeURI(searchTxt)+"&page="+page+"&size="+pageSize,state.token,"application/json",setData);
        }

        procGetAxios("/admin/auths?sort=id", state.token, contentType, getAuth);
    }
    function getAuth(data) {
        authArr = data.content;
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

    //permit
    function permit(id, name,getAuth) {
        let obj_EMS: { reqTyCd: string; authDate: string; mailType: string; reqTitle: string; reqChargeName: string; tmpPwd: string; idList: any; userName: string, stats: string, comment: string }
        obj_EMS = {
            mailType : "auth",
            userName : name,
            idList : [id],
            reqTyCd : "",
            reqTitle : "",
            reqChargeName : "",
            tmpPwd : "",
            authDate : moment().format("YYYY-MM-DD"),
            stats : "",
            comment : ""
        }
        let setAuth:object = getAuth;
        if(setAuth===undefined){
            authArr.map(e=>{
                    if(e['cdId']===AuthCode.User){
                        setAuth = e
                    }
                })
        }
        let body = {
            userId: id,
            updateDt: moment(),
            auth : setAuth,
            joinConfirmYN: "Y",
        }
        procPostAxios("/user/member/" + id, state.token, contentType, body, search, error);
        alert('승인처리 되었습니다.');
        sendEms(obj_EMS, state, contentType)
    }
    //delete
    function del() {
        if (chkNums.length >= 1) {
        if(window.confirm(txtConfirm.deleteMember)){
            if (offsetRemain === 0) { offsetRemain = pageSize }
                chkNums.forEach((index) => {
                    let delId = tableData[index].userId
                    let body = {
                        userId: delId,
                        delYn: "Y",
                        udateDt: moment()
                    }
                    procPostAxios("user/member/" + delId, state.token, contentType, body, search, error);
                })
                if (page === 0) { setPage(0) }
                if (offsetRemain <= chkNums.length && page!==0) {
                    setPage(page - 1)
                }
                alert(txtAlert.delete);
                setChkNums([]);
                allCheck(false);
        }else{
            alert('삭제할 항목에 체크해주세요')
        }
        }
    }
    //modal
    // const openModal = () => {
    //     setIsModalOpen(true);
    // }
    // const closeModal = () => {
    //     setIsModalOpen(false);
    // }

    function changeAuth(id, value) {

        if (window.confirm("권한을 변경하시겠습니까?")) {
            let getAuth;
            authArr.map(e=>{
                if(e['cdId']===value){
                    getAuth = e;
                }
            })
            let body = {
                userId: id,
                updateDt: moment(),
                auth: getAuth
            }
            procPostAxios("/user/member/" + id, state.token, contentType, body, useEffectEvent, error);
            alert(txtAlert.edit);
        }
    }

    function useEffectEvent(){
        setEvent(current => !current);
    }

    function onKeyPress(e) {
        if(e==='Enter'){
            search();
            setPage(0)
        }
    }
    function setSys(data){
        table_sub_data.forEach(tab => {
            data.content.forEach(r => {

                if(tab.agencyCode===r.cdId){
                    tab.cdId = r.name;
                }
            })
        })
        setTableData(table_sub_data);
    }
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: a => <div>{a.userId}</div>
            },
            {
                Header: "이름",
                accessor: a => <div>{a.username}</div>
            },
            {
                Header: "소속기관",
                accessor: "cdId"
            },
            {
                Header: "소속부서/팀",
                accessor: "departmentName"
            },
            {
                Header: "담당업무",
                accessor: "jobCode"
            },
            {
                Header: "이메일",
                accessor: a => <div>{a.email}</div>
            },
            {
                Header: "휴대폰",
                accessor: "phoneNumber"
            },
            {
                Header: "가입일",
                accessor: a => <span>{a.joinDt.slice(0, 10)}</span>
            },
            {
                Header: "권한그룹",
                accessor: (a, i) =>
                    auth===AuthCode.superAdmin?
                        <select key={i} className="form-control-sm" value={a.auth !== undefined ? a.auth.cdId : a.joinConfirmYN === "N" ? "none" : "user"} onChange={e => { changeAuth(a.userId, e.target.value) }}>
                            <option value="none">권한없음</option>
                            <option value={AuthCode.Admin}>관리자</option>
                        </select>
                        : auth===AuthCode.Admin?
                        <select key={i} className="form-control-sm" value={a.auth !== undefined ? a.auth.cdId : a.joinConfirmYN === "N" ? "none" : "user"} onChange={e => { changeAuth(a.userId, e.target.value) }}>
                            <option value="none" hidden>권한선택</option>
                            {authArr.filter(e=>e['cdId']!==AuthCode.superAdmin).map(e=>{
                                return <option key={e['cdId']} value={e['cdId']}>{e['name']}</option>
                            })}
                        </select>
                        : auth === AuthCode.Manager?
                        <select key={i} className="form-control-sm" value={a.auth !== undefined ? a.auth.cdId : a.joinConfirmYN === "N" ? "none" : "user"} onChange={e => { changeAuth(a.userId, e.target.value) }}>
                            <option value="none" hidden>권한선택</option>
                            {authArr.filter(e=>e['cdId']!==AuthCode.superAdmin).filter(a=>a['cdId']!==AuthCode.Admin).map(e=>{
                                return <option key={e['cdId']} value={e['cdId']}>{e['name']}</option>
                            })}
                        </select>
                        :<></>
            },
            {
                Header: "승인",
                accessor: a => a.joinConfirmYN === "N" ? <div><div>대기</div> {auth!==AuthCode.Manager?<button className="fr btn btn-xs btn-outline-primary" onClick={e => permit(a.userId, a.username,a.auth)}>승인</button>:""}</div> : <div>완료</div>
            },
        ], [])
    return (
        <section>
            <TittleComponent tittle={"회원 관리"} subTittle={"중소벤처24 헬프데스크에 가입한 회원들의 가입 승인 및 권한 부여를 할 수 있습니다."} />
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
                        <div className="d-flex justify-content-center mt-7">
                            <select ref={preSelected} className="ml-3 mb-3 p-2" >
                                <option value="all">전체</option>
                                {category.map(e=>{
                                    return <option key={e.cdId} value={e.cdId}>{e.name}</option>
                                })}
                            </select>
                            <input ref={preInputTxt} type="search" className="border border-secondary form-control p-2 ms-2 ml-3 mb-3 w-50" onKeyPress={e=>onKeyPress(e.key)}  />
                            <button className="btn btn-s btn-secondary ms-2 ml-3 mb-3" onClick={() => {search(); setPage(0)}}>{txtButton.search}</button>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p>{total}명</p>
                            {auth === AuthCode.superAdmin ?
                                ""
                                :
                                <AdminButtonComponent btnClassName="fr btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3 mb-3" btnName={txtButton.delete} onEventHandler={del} url={"null"}/>
                            }
                        </div>
                        <div>
                            {auth === AuthCode.superAdmin ?
                                <TableComponent data={tableData} columns={columns} />
                                :
                                <CheckTableComponent data={tableData} columns={columns} limit={page+1===totalPages?total%pageSize===0?pageSize:total%pageSize:pageSize} changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr} />
                            }
                        </div>
                        {/*<div>*/}
                        {/*    {isModalOpen && (<MemberModalComponent open={isModalOpen} close={closeModal} header={name + "(" + agency + ")"} modalSize="modal-md" />)}*/}
                        {/*</div>*/}
                        <div className="d-flex justify-content-center">
                            <nav aria-label="Page navigation example">
                                <CheckPagingComponent page={page} setPage={setPage} totalPages={totalPages} setChkArr={setChkArr} />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MemberManageComponent;
