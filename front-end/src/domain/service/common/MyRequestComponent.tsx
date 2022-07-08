import { ButtonComponent } from "component/button/ButtonComponent";
import moment from "moment"
import TableComponent from "component/table/TableComponent";
import { Fragment, useEffect, useMemo, useState } from "react";
import { API_DOMAIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import "assets/css/libs.bundle.css";
import './MyRequestComponent.css';
import TittleComponent from "component/div/TittleComponent";
import DayButtonComponent from "component/button/DayButtonComponent";
import ServiceInfoComponent from "./ServiceInfoComponent";
import SortButtonComponent from "component/button/SortButtonComponent";
import { AuthCode, CodeDetail } from "utils/AdminCode";
import { procGetAxios } from "axios/Axios";
import PagingComponent from "component/list/PagingComponent";
import {txtBlock, txtDiv} from "utils/CommonText";
import { CountComponent } from "component/service/ServiceCountComponent";
import {useNavigate} from "react-router-dom";


/**
 * @Project     : HelpDesk
 * @FileName    : MyRequestComponent.tsx
 * @Date        : 2022-01-25
 * @author      : 김지인
 * @description : 요청 현황 > 내 요청 화면 컴포넌트
 */

 function MyRequestComponent() {
    let dispatch = useTokenDispatch()
    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [rqstId, setRqstId] = useState();
    const [tableData, setTableData] = useState([]);
    const [day, setDay] = useState('?day=week');
    const [sort, setSort] = useState('&sort=registDt');
     
    const [page,setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [pageSize] = useState(7);
    const [totaldata, setTotalData] : any = useState([])

    const [prcsSttsCdCount, setPrcsSttsCdCount ] : any = useState([]);

    const auth = state.auth;

    let table_sub_data;

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "myRequest", actTime: new Date().getTime().toString()})

        procGetAxios("/user/service/requests/" + state.user +day+sort + "&page=" + page + "&size=" + pageSize, state.token, contentType, getTableData )
        procGetAxios("user/service/request/"+state.user+"/myRequest/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
    }, [contentType, state.token, state.user, day, rqstId, sort, page, pageSize] );
    
    function getPrcsSttsCdCountData(data){
        setPrcsSttsCdCount(data)
    }
    function getTableData(data){
        table_sub_data = data.content;
        procGetAxios("admin/group/"+CodeDetail.prcsSttsCd+"/details",state.token,"application.json", prcsAdminCode)
        setTotalPages(data.totalPages)
        setTotalData(data.totalElements)
    }
    function prcsAdminCode(data){
        table_sub_data.forEach(tab => {
            data.content.forEach(e => {
                if(tab.prcsSttsCd===e.cdId){
                    tab.prcsSttsCd = e.name;
                }
            })
        })
        procGetAxios("admin/group/"+CodeDetail.evl+"/details",state.token,"application.json", evlAdminCode)
   }
   function evlAdminCode(data){
        table_sub_data.forEach(tab => {
            data.content.forEach(e => {
                if(tab.evl===e.cdId){
                    tab.evl = e.name;
                }
            })
        })
        procGetAxios("admin/group/"+CodeDetail.tyCd+"/details",state.token,"application.json", tyCdAdminCode)
    } 
   function tyCdAdminCode(data){
       table_sub_data.forEach(tab => {
           data.content.forEach(e => {
               if(tab.tyCd===e.cdId){
                   tab.tyCd = e.name;
               }
           })
       })
       setTableData(table_sub_data);    
   }

    const columns = useMemo( () => [
        {
          Header: '번호',
          accessor: (_row: any, i : number) => (i + 1 ) + (page *pageSize) 
        },
        {
            Header:  <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=tyCd'} btnName='유형'/>,
            accessor: 'tyCd'
        },
        {
          Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=ttl'} btnName='제목'/>, id: 'ttl',
          accessor : a => <span className="link-primary" style={{ cursor:'pointer' }} onClick={() =>setRqstId(a.id) }>{a.ttl.length < 35 ? a.ttl : a.ttl.slice(0, 35) + '...'}</span>
        },
        {
            Header : <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=registDt'} btnName='요청일'/>, id : 'registDt',
            accessor: a => <Fragment >{moment(a.registDt).format("YYYY.MM.DD")}</Fragment>
        },
        {
            Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=goalDt'} btnName='목표일'/>, id : 'goalDt',
            accessor:  a => <Fragment>{ (a.goalDt) != null ? moment(a.goalDt).format("YYYY.MM.DD") : '-'}</Fragment>
          },
        {
            Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=prcsSttsCd'} btnName='상태'/>, 
            accessor: 'prcsSttsCd'
          },
        {
            Header: '평가', id: 'evl',
            accessor: a =><Fragment key={a.id}>{a.prcsSttsCd === '완료' && a.evl == null ? '평가' : a.evl }</Fragment>                        
        }
    ], [page, sort])
    

    return (
        <section>
            <TittleComponent tittle={"서비스 요청 현황"} subTittle={"나의 업무 및 요청의 진행 현황을 확인할 수 있습니다."}/>                  
            <div className="content_wrap">
                    <ul className="my_desk nav nav-pills mb-3 mt-5 justify-content-center">
                        {auth === AuthCode.Admin || auth === AuthCode.Manager
                        ?
                        <li className="nav-item">
                            <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myWork)} btnName='담당 업무' btnClassName='nav-link' />
                        </li>
                        : <></>
                        }
                        <li className='nav-item'>
                            <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myRequest)} btnName='내 요청' btnClassName='nav-link active' />
                        </li>
                    </ul>            
                <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-sm">
                        {nowTime} 업데이트
                    </div>
                    <div>
                        <DayButtonComponent day={day} setDay={setDay}/>
                    </div>
                </div>
                <div className="row mt-7 help_desk">
                    <div className="col-12 col-md-6 border-right">
                        <div className="row mb-3 align-items-center">
                        <div className="col-auto">
                            <div className="icon-circle bg-primary text-white">
                            <i className="fe fe-chevrons-right"></i>
                            </div>
                        </div>
                            <div className="col ms-n5">
                                <h3 className="mb-0">나의 요청 현황</h3>
                            </div>
                        </div> 
                        <CountComponent data={prcsSttsCdCount}/>
                        <div className="card mt-3">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>
                                        목록({totaldata})
                                    </span>
                                    <div className="col-auto ms-auto">
                                    </div>
                            </div>                                                                        
                                {tableData.length === 0 ? txtDiv.tableData :
                                <>
                                <TableComponent data={tableData} columns={columns} /> 
                                <div className="d-flex justify-content-center">
                                    <PagingComponent page={page} setPage={setPage} totalPages={totalPages} />
                                </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                    <div  className="col-12 col-md-6 pl00">
                        <div className="row mb-3 align-items-center pl30">
                            <div className="col-auto">
                                <div className="icon-circle bg-primary text-white">
                                <i className="fe fe-chevrons-right"></i>
                                </div>
                            </div>
                            <div className="col ms-n5">
                                <h3 className="mb-0">서비스 요청 상세 정보</h3>
                            </div>
                        </div>
                        <ServiceInfoComponent rqstId={rqstId} />
                    </div>
                </div>                        
            </div>
        </section>
    )
}
export default MyRequestComponent
