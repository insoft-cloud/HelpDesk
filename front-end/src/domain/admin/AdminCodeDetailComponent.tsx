
import { procGetAxios, procPostAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import TittleComponent from "component/div/TittleComponent";
import InputEditComponent from "component/input/InputEditComponent";
import AddRowTableComponent from "component/table/AddRowTableComponent";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ADMIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import {txtAlert, txtButton} from "../../utils/CommonText";

/**
 * @Project     : HelpDesk
 * @FileName    : AdminCodeGroupComponent.tsx
 * @Date        : 2022-01-24
 * @author      : 김수진
 * @description : 서비스코드상세 리스트화면 컴포넌트
 */

function AdminCodeDetailComponent() {
    const location = useLocation();
    const response = location.state as string;
    const text = response['data'];
    const limitCnt = 5;
    let dispatch = useTokenDispatch();
    let code = new Set();
    let name = new Set();
    let cdExplnt = new Set();
    const navigate = useNavigate();
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [tableData, setTableData] = useState<Object[]>([]);
    const [addRow, setAddRow] = useState(0);
    const date = useState(moment().format('YYYY.MM.DD HH:mm'));
    let editDataList: any[] = [];
    let editBtn = false;
    const [btnNm,setBtnNm] = useState(0);
    const [addDataList, setAddDataList] = useState<any[]>([]);
    const [delDataList, setDelDataList] = useState<Object[]>([]);
    //페이징
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limitCnt;
    const numPages = Math.ceil(tableData.length / limitCnt);
    let pageSize = 0;
    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "codeDetail" })
        getSysCnt();
        window.addEventListener('beforeunload', alertUser);

        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    }, [state.token]);
    const alertUser = e => {
        e.preventDefault();
        e.returnValue = "새로고침"
    }

    function getSysCnt() {
        procGetAxios("admin/group/"+text+"/details/count", state.token, contentType, getData);
    }
    function getData(data) {
        procGetAxios("/admin/group/" + text + "/details?sort=registDt&size="+data, state.token, contentType, setData);
    }
    function setData(data) {
        setTableData(data.content)
    }
    function error(value) {
        console.log(value)
    }
    const getCode = useCallback(
        (text, index, id) => {
            code[index] = text
            editDataList[index] = { id: id, cdId: text, name: name[index], cdExplnt: cdExplnt[index] };
            setAddDataList(editDataList)
        }, [addDataList])

    const getName = useCallback(
        (text, index, id) => {
            name[index] = text;
            editDataList[index] = { id: id, cdId: code[index], name: text, cdExplnt: cdExplnt[index] };

            setAddDataList(editDataList)
        }, [addDataList])

    const getCdExplnt = useCallback(
        (text, index, id) => {
            cdExplnt[index] = text;
            editDataList[index] = { id: id, cdId: code[index], name: name[index], cdExplnt: text };
            setAddDataList(editDataList)
        }, [addDataList])
    const columns = useMemo(
        () => [
            {
                Header: "코드",
                id: "cdId",
                accessor: (a, index) => editBtn ? <InputEditComponent key={a.id} value={a.cdId} getValue={getCode} idx={index} id={a.id} />:a.cdId,
                className: "align-middle text-center col-md-2",
            },
            {
                Header: "명칭",
                id: "name",
                accessor: (a, index) => editBtn ? <InputEditComponent key={a.name} value={a.name} getValue={getName} idx={index} id={a.id} />:a.name,
                className: "align-middle text-center col-md-2",
            },
            {
                Header: "설명",
                id: "cdExplnt",
                accessor: (a, index) => editBtn ? <InputEditComponent key={a.cdExplnt} value={a.cdExplnt} getValue={getCdExplnt} idx={index} id={a.id} />:a.cdExplnt,
                className: "align-middle text-center col-md-4",

            },
            {
                Header: "등록자",
                id: "userId",
                accessor: "userId",
                className: "align-middle text-center col-md-1",
            },
            {
                Header: "등록일",
                id: "registDt",
                accessor: a => <div className="text-secondary">{a.registDt.slice(0, 10)}</div>,
                className: "align-middle text-center col-md-1",
            },
        ], [])
    //행삭제
    function delEvent(data) {
        setDelDataList([...delDataList, data])
        if (tableData.length % limitCnt === 1) {
            if (numPages !== 1) {
                setPage(numPages - 1)
            }
        }
    }
    //행추가
    function add() {
        const inputData = {
            id: "new",
            cdId: "",
            cdExplnt: "",
            delYn: false,
            name: "",
            registDt: "",
            userId: state.user,
        }
        setTableData([...tableData, inputData]);
        if ((tableData.length % limitCnt) === 0) {
            setPage(numPages + 1)
        } else {
            setPage(numPages)
        }
        setAddRow(addRow + 1)
    }
    function useConfirm() {
        let create: any[] = [];
        let update: any[] = [];
        let del: any[] = [];
        if (window.confirm("입력하신 내용을 저장하시겠습니까?")) {
            let idCheck = 0;
            addDataList.map((editdata, i) => {
                create.map(e => {
                    if (e['cdId'] === editdata['cdId']) {
                        alert('중복된 코드값 입력')
                        idCheck++;
                        return
                    }
                })
                if (editdata['id'] === "new" && idCheck === 0) {
                    let id = text + "_" + editdata['cdId'];
                    tableData.map(e => {
                        if (e['id'] === id) {
                            alert('이미 존재하는 아이디 입니다.');
                            idCheck++;
                            return;
                        }
                    })
                    editdata['id'] = id;
                    editdata['delYn'] = false;
                    editdata['userId'] = state.user;
                    create.push(editdata)
                } else {
                    update.push(editdata)
                }
            })
            if (idCheck === 0) {
                del = [...new Set(delDataList)];
                let data = {
                    updateDetail: update,
                    createDetail: create,
                    deleteDetail: del
                };
                procPostAxios("/admin/group/" + text + "/details", state.token, contentType, data, getData, error)
                alert(txtAlert.save);
                setAddDataList([])
                setDelDataList([])
                editForm()
                setBtnNm(btnNm+1)
            }
        } else {
            navigate(ContextPath(API_ADMIN_PATH.codeGroup));
        }
    }
    const editForm = useCallback(
       ()=> {
            editBtn = !editBtn
           getSysCnt();
           setDelDataList([])
    },[])

    return (
        <section>
            <TittleComponent tittle={"서비스 코드 세부 관리"} subTittle={" "} />
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
                        <div className="card mt-5">
                            <div className="d-flex justify-content-between mb-2 align-items-center">
                                <div className="col-auto ms-auto fs-sm text-muted">
                                    <AdminButtonComponent btnClassName="btn btn-outline-dark btn-xs rounded-1 ms-2  ml-3" btnName="목록" onEventHandler={useConfirm} url={ContextPath(API_ADMIN_PATH.codeGroup)} />
                                    <AdminButtonComponent btnClassName="btn btn-outline-dark btn-xs rounded-1 ms-2 ml-3" btnName={btnNm%2===0?txtButton.edit:txtButton.cancel} onEventHandler={()=>{editForm(); setBtnNm(btnNm+1)}} url="null" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-2 align-items-center mt-2">
                                <div className="col-6 d-flex">
                                    <label>항목 이름 </label>
                                    <input type="text" className="text-secondary ms-3" value={text} disabled />
                                </div>
                                <div className="col-auto ms-auto fs-sm text-muted">업데이트 : {date}</div>
                            </div>
                            <div className="table-responsive fs-sm">
                                <AddRowTableComponent data={tableData} columns={columns} offset={offset} limit={limitCnt} delEvent={delEvent} add={add} addData={addRow} delList={delDataList} editStat={btnNm%2===0}/>
                            </div>
                        </div>
                        {btnNm%2===0?
                        "":<div className="card-footer pt-0">
                                <div className="mb-5 text-end">
                                    <AdminButtonComponent btnClassName="btn btn-primary btn-sm" btnName={txtButton.save} onEventHandler={useConfirm} url="null" />
                                </div>
                            </div>
                        }

                            {/* 
                                <div className="d-flex justify-content-center">
                                    <nav aria-label="Page navigation example">
                                        <Pagination numPages={numPages} page={page} setPage={setPage} setChkArr="" />
                                    </nav>
                                </div> 
                            */}
                    </div>
                </div>
            </div>
        </section>
    )





}

export default AdminCodeDetailComponent;