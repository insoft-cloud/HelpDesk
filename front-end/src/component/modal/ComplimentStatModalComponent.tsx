import {useTokenState} from "../../utils/TokenContext";
import React, {useEffect, useMemo, useState} from "react";
import {procGetAxios} from "../../axios/Axios";
import TableComponent from "../table/TableComponent";
import ServiceDetailComponent from "../../domain/service/detail/ServiceDetailComponent";
import ExcelDownloadComponent from "../admin/ExcelDownloadComponent";

export default function ComplimentStatModalComponent({open,close,header,modalSize}) {

    let date = header.selDt.split("/");
    const [type,setType] = useState('');
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [detailData, setDetailData] = useState<any[]>([]);
    const [subDetailData, setSubDetailData] = useState<any[]>([]);
    const [rqstId,setRqstId] = useState('');
    let table_sub_data;
    function getData(){
        procGetAxios("admin/group/SYS/details/count", state.token, contentType, getSystem);
        if(header.selChk!==null){
            let url = "/user/service/request/tyCdRegist?selectDate="+header.selDt+"&selectType="+header.selTy+"&items="+header.selChk;
            if(header.selTy==="cnt"){
                url = "/user/service/request/tyCdRegist/excTyCd?selectDate="+header.selDt+"&items="+header.selChk
            }if(header.selDt.includes("~")){
                url = "/user/service/request/tyCdRegist/excDate?selectType="+header.selTy+"&items="+header.selChk
            }
            procGetAxios(url,state.token,"application.json",setDetail);
        }
        procGetAxios("admin/group/SVC_TY/details?sort=cdId",state.token,"application.json",getType);
    }
    function getSystem(data){
        procGetAxios("admin/group/SYS/details?sort=cdId&size="+data,state.token,"application.json",getSys);
    }
    function setDetail(data){
        table_sub_data = data;
        setDetailData(data);
    }
    function getSys(data){
        table_sub_data.map(e=>{
            data.content.map(a=>{
                if(e.sys_cd === a.cdId){
                    e.sys_cd = a.name;
                }
            })
        })
        setSubDetailData(table_sub_data)
    }
    function getType(data){
        data.content.map(e=>{
            if(e.cdId === header.selTy){
                setType(e.name);
            }
        })
    }
    useEffect(() => {
        getData();
    },[state.token,contentType])

    const testKey = useMemo(
        () => [
            {label: "시스템",key: "sys_cd"},
            {label: "문의 제목",key: "ttl"},
            {label: "접수 담당자",key: "chrgpr_nm"}
        ], [])
    const columns = useMemo(
        () => [
            {Header : "시스템", accessor: 'sys_cd'},
            {Header : "문의 제목",
                accessor: a => <span className="link-primary" style={{width:'40%', cursor:'pointer' }} onClick={() =>setRqstId(a.svc_rqst_no) }>{a.ttl}</span>},
            {Header : "접수 담당자", accessor: 'chrgpr_nm'},
        ]
        ,[])
    return(
        <div className={open?'openModal modal' : 'modal'}>
            {open?(
                <section className={modalSize}>
                    <header>
                        <h4>민원 통계 상세 내용</h4>
                        <button className="close" onClick={close}>
                            {''} &times;{''}
                        </button>

                        <hr />
                    </header>
                    <div className="m-3 mb-8">
                        <h5 className="text-black">{date[0]}년 {date[1]}월 {date[2]}일</h5>
                        <div className="bg-light p-3 small">
                                <div className="pb-1">유형 : {type===""?"전체":type} </div>
                                <div className="break-word">시스템 : {header.selSys.map((e,i)=>i!==header.selSys.length-1? e+", ":e)}
                                </div>
                        </div>
                    </div>
                    <div className="m-3 d-flex justify-content-between">
                        <h5 className="text-danger">{header.selCnt}건</h5>
                        <ExcelDownloadComponent headers={testKey} data={detailData} title={"민원상세"} size="btn-xs"/>
                    </div>
                    <TableComponent columns={columns} data={subDetailData} />
                    <div className="card-body m-3 border border-3  bg-light rounded-4 justify-center">
                        {rqstId===""?
                            '목록에서 개별 요청건을 선택하면 상세 정보가 표시됩니다.':
                            <ServiceDetailComponent rqstId ={ rqstId } />
                        }

                    </div>



                </section>
            ):null}
        </div>
    )
}