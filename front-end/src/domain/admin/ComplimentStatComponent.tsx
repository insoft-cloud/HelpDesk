import TittleComponent from 'component/div/TittleComponent';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTokenDispatch, useTokenState} from "../../utils/TokenContext";
import {procGetAxios} from "../../axios/Axios";
import TableComponent from "../../component/table/TableComponent";
import moment from "moment";
import {BarChart} from "../../component/chart/ChartComponent";
import ExcelDownloadComponent from "../../component/admin/ExcelDownloadComponent";
import ComplimentStatModalComponent from "../../component/modal/ComplimentStatModalComponent";

function ComplimentStatComponent() {
    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const [sysData,setSysData] = useState<any[]>([]);
    const [contentType] = useState("application/json");
    const [year,setYear] = useState(moment().format('YYYY'));
    const [month,setMonth] = useState(moment().format('MM'));
    const [chkArr,setChkArr] = useState<any[]>([]);
    const [selectDt,setSelectDt] = useState('');
    const [selType,setSelType] = useState('');
    const [selCount,setSelCount] = useState('');
    const [selChk,setSelChk] = useState<any[]>([]);
    let pageSize;
    let sendData = {
        selDt : selectDt,
        selCnt : selCount,
        selSys : selChk,
        selChk : chkArr,
        selTy : selType
    }
    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "codeDetail" })
        getData();
        // return () => {
        //     // window.removeEventListener('beforeunload', alertUser)
        // }
    }, [state.token,chkArr]);
    useEffect(() => {
        search();
    }, [state.token]);
    //modal
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    function setting(date, type, cnt) {
        setSelectDt(date);
        setSelType(type);
        setSelCount(cnt);
        openModal();
    }
    // const alertUser = e => {
    //     e.preventDefault();
    //     e.returnValue = "새로고침"
    // }
    function getData() {
        procGetAxios("/admin/group/SYS/details/count",state.token,"application.json",getSys);
    }
    function getSys(data){
        pageSize = data;
        procGetAxios("admin/group/SYS/details?sort=name&size="+pageSize,state.token,"application.json",setSys);
    }
    function setData(data) {
        if(data.length>1){
            data.map(e=>{
                if(e.debug === null ) e.debug = 0;
                if(e.error === null ) e.error = 0;
                if(e.etc === null ) e.etc = 0;
                if(e.func === null ) e.func = 0;
                if(e.rqstdata === null ) e.rqstdata = 0;
                if(e.cnt === null ) e.cnt = 0;
                if(e.tech === null ) e.tech = 0;
                if(e.regist === null ) e.regist = "합계";
            })
            setTableData(data);

        }else{
            setTableData([]);
        }
    }
    function setSys(data){
        setSysData(data.content);
    }
    function yearRender() {
        const result : any[] = [];
        let nowYear = Number(moment().format("YYYY"));
        for(let i = 2019; i <= nowYear; ++i) {
            result.push(
                <option key={i} value={i}>{i}년</option>
            );
        }
        return result;
    }
    function monthRender() {
        const result : any[] = [];
        let end = 12;
        if(Number(moment().year())===Number(year)) end = moment().month()+1
        for(let i = 1; i <= end; ++i) {
            result.push(
                <option key={i} value={i<10?"0"+i:i}>{i}월</option>
            );
        }
        return result;
    }
    //전체체크
    const allCheck = (e) =>{
        if(e){
            let codes:any[] = [];
            let names:any[] = [];
            sysData.map(e=>{
                codes.push(e.cdId);
                names.push(e.name);
            })
            setChkArr(codes);
            setSelChk(names);
        }else{
            setChkArr([]);
            setSelChk([]);
        }
    }

    const checkHandler = useCallback(
        (on,value,name) => {
            if(on){
                setChkArr([...chkArr,value])
                setSelChk([...selChk,name])
            }else{
                setChkArr(chkArr.filter((e)=>e!==value))
                setSelChk(selChk.filter((e)=>e!==name))
            }
        },[chkArr,selChk])

    const setDate = useCallback(
        (y,m) =>{
            setYear(y);
            if(m<10 && m!==month){setMonth(m)
            }else{
                setMonth(m);
            }

    },[year,month])
    function search() {
        let dayForm = year+"/"+month+"/";
        let lastDay = new Date(Number(year),Number(month),0).getDate();
        let chks = chkArr;
        let url ="/user/service/request/tyCdRegist/count?items="+chks+"&startDay="+dayForm+"01&endDay="+dayForm+lastDay;
        procGetAxios(url, state.token, contentType, setData);
    }
    const columns = useMemo(
        () => [
            {
                Header: "날짜",
                accessor: a => <div>{a.regist==="합계"?a.regist:a.regist.slice(5,10)}</div>
            },
            {
                Header: "오류 수정",
                accessor: a => <button className="fr btn btn-xs btn-link small underline" onClick={(e) => { setting(a.regist,"debug",a.debug); }} >{a.debug}</button>
            },
            {
                Header: "기능 개선",
                accessor: a => <button className="fr btn btn-xs btn-link small underline" onClick={() => { setting(a.regist,"function",a.func) }} >{a.func}</button>
            },
            {
                Header: "기술 지원",
                accessor: a => <button className="fr btn btn-xs btn-link small underline" onClick={() => { setting(a.regist,"tech",a.tech) }} >{a.tech}</button>
            },
            {
                Header: "장애 처리",
                accessor: a => <button className="fr btn btn-xs btn-link small underline" onClick={() => { setting(a.regist,"error",a.error) }} >{a.error}</button>
            },
            {
                Header: "요청 자료",
                accessor: a => <button className="fr btn btn-xs btn-link small underline" onClick={() => { setting(a.regist,"rqstData",a.rqstdata) }} >{a.rqstdata}</button>
            },
            {
                Header: "기타",
                accessor: a => <button className="fr btn btn-xs btn-link small underline" onClick={() => { setting(a.regist,"etc",a.etc) }} >{a.etc}</button>
            },
            {
                Header: "일별 소계",
                accessor: a => <button className="fr btn btn-xs btn-link small underline" onClick={() => { setting(a.regist,"cnt",a.cnt) }} >{a.cnt}</button>
            }
        ], [])
    const testKey = useMemo(
        () => [
            {label: "날짜",key: "regist"},
            {label: "오류 수정",key: "debug"},
            {label: "기능 개선",key: "func"},
            {label: "기술 지원",key: "tech"},
            {label: "장애 처리",key: "error"},
            {label: "요청 자료",key: "rqstdata"},
            {label: "기타",key: "etc"},
            {label: "일별 소계",key: "cnt"},
        ], [])

  return (
    <section>
      <TittleComponent tittle={"민원통계"} subTittle={"중소벤처24 헬프데스크 내역을 통계로 확인할 수 있습니다."}/>
      <div className="position-relative">
        <div className="shape shape-bottom shape-fluid-x text-light">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
        <div className="content-wrap">
            <div className="d-flex justify-content-center mt-7">
                <div className="w-75 ">
                    <div className="d-flex flex-wrap bg-light mt-7 ml-0 border border-3 border-gray-300-soft rounded-3">
                        <div className="col-sm-auto ms-5">
                            <input type="checkbox" id="all" className="ms-4" checked={chkArr.length===sysData.length?true:false} onChange={a => {
                                allCheck(a.target.checked)
                            }}/>
                            <label  className="col-form-label" htmlFor="all">전체</label>
                        </div>
                        {sysData.map((e, i) => {
                            return (
                                <div key={i} className="col-sm-auto ms-5">
                                    <input key={e.cdId} type="checkbox" id={e.cdId} className="ms-4" checked={chkArr.includes(e.cdId)?true:false} onChange={a => {
                                        checkHandler(a.target.checked, a.target.id, e.name)
                                    }}/>
                                    <label key={e.id} className="col-form-label" htmlFor={e.cdId}>
                                        {e.name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>

                    <div className=" mt-8">
                            <div className="d-flex justify-content-end mb-2">
                                <select className="form-select-sm mr3 p-2" defaultValue={year}
                                        onChange={e => setDate(e.target.value, month)}>
                                    {yearRender()}
                                </select>
                                <select className="form-select-sm ms-3 p-2" defaultValue={month}
                                        onChange={e => setDate(year, e.target.value)}>
                                    {monthRender()}
                                </select>
                                <button className="btn btn-outline-primary btn-sm ms-3 " onClick={search}>조회</button>
                            </div>
                            <div className="d-flex justify-content-end mt-5 mb-2">
                                <ExcelDownloadComponent headers={testKey} data={tableData} title="민원통계" size="btn-xs"/>
                            </div>
                            <div className="table-responsive fs-sm">
                                <TableComponent columns={columns} data={tableData}/>
                            </div>

                            {tableData.length>0?
                                <div>
                                    <h5>{year}년 {month}월 01일 ~ {year}년 {month}월 {Number(moment().month()+1)===Number(month)?moment().date():new Date(Number(year),Number(month),0).getDate()}일</h5>
                                    <BarChart count={tableData.filter((e,i)=> i!=tableData.length).map(a => a.cnt)} labels={tableData.filter((e,i)=> i!=tableData.length-1).map(a => a.regist)}/>
                                </div>
                            :""}
                    </div>
                    <div>
                        {isModalOpen && (<ComplimentStatModalComponent open={isModalOpen} close={closeModal} header={sendData} modalSize="modal-md" />)}
                    </div>

                    <div className="card mt-5">
            <div className="card-footer justify-content-center">
            </div>
          </div>


            </div>
        </div>
        </div>


  </section>

  )
}
export default ComplimentStatComponent;