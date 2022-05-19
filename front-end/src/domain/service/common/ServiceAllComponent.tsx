import moment from 'moment';
import TableComponent from "component/table/TableComponent";
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';
import TittleComponent from 'component/div/TittleComponent';
import "assets/css/libs.bundle.css";
import DayButtonComponent from 'component/button/DayButtonComponent';
import ServiceInfoComponent from './ServiceInfoComponent';
import { SelectPrcComponent } from 'component/select/SelectComponent';
import SortButtonComponent from 'component/button/SortButtonComponent';
import { CountComponent } from 'component/service/ServiceCountComponent';
import { AuthCode, CodeDetail } from 'utils/AdminCode';
import StatsModalComponent from 'component/modal/StatsModalComponent';
import PagingComponent from 'component/list/PagingComponent';
import { procGetAxios } from 'axios/Axios';
import {txtBlock} from "../../../utils/CommonText";
import {API_DOMAIN_PATH, ContextPath} from "../../../utils/ContextPath";
import {useNavigate} from "react-router-dom";

/**
 * @Project     : HelpDesk
 * @FileName    : ServiceAllComponent.tsx
 * @Date        : 2022-01-25
 * @author      : 김지인
 * @description : 전체 서비스 화면 컴포넌트
 */

 
function ServiceAllComponent() {

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    let dispatch = useTokenDispatch()
    const state = useTokenState();
    const [contentType] = useState("application/json");

    const [tableData, setTableData] = useState([]);
    const [rqstId, setRqstId] = useState();
    const [day, setDay] = useState('?day=week');
    const [sort, setSort] = useState('&sort=registDt,desc');
    const [prcsSttsCd, setPrcsSttsCd] = useState(null);

    const [search, setSearch] : any = useState('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchOption, setSearchOption] = useState('ttl');
   
    const [page,setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [pageSize] = useState(7);

    const [isModalOpen,setIsModalOpen] = useState(false);
    const [totaldata, setTotalData] : any = useState([])
    
    const [prcsSttsCdCount, setPrcsSttsCdCount ] : any = useState([]);

    const auth = state.auth;
    const [all] =  useState( (auth === AuthCode.Admin || auth === AuthCode.Manager) ? '&All=N' : '&All=Y' )
    
    let table_sub_data;

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "ServiceAll", actTime: new Date().getTime().toString()})

        if( auth === AuthCode.Admin || auth === AuthCode.Manager) {
            procGetAxios("user/service/request/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
        } else {
            procGetAxios("user/service/request/"+state.user+"/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
        }


         if(prcsSttsCd === null || prcsSttsCd === 'default' ){
            procGetAxios("/user/service/requests/"+state.user+"/serviceAll"+day+sort+search+all +"&page="+page+"&size="+pageSize, state.token, contentType, getAllData)
        } else {
            procGetAxios("/user/service/requests/"+state.user+"/"+prcsSttsCd+"/state"+day+sort+search+all+"&page="+page+"&size="+pageSize, state.token, contentType, getPrcsTableData)
        }


    }, [rqstId, day, sort, all, prcsSttsCd, search, page]);

    

function getAllData(data){
    table_sub_data = data.content;
    procGetAxios("admin/group/"+CodeDetail.prcsSttsCd+"/details",state.token,"application.json", prcsAdminCode)

    setTotalPages(data.totalPages)
    setTotalData(data.totalElements)
}

function getPrcsTableData(data){
    table_sub_data = data.content;

    procGetAxios("admin/group/"+CodeDetail.prcsSttsCd+"/details",state.token,"application.json", prcsAdminCode)
    procGetAxios("admin/group/"+CodeDetail.sysCd+"/details_list",state.token,"application.json", sysAdminCode)

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
    procGetAxios("admin/group/"+CodeDetail.sysCd+"/details_list",state.token,"application.json", sysAdminCode)
}

function sysAdminCode(data){
    table_sub_data.forEach(tab => {
        data.forEach(e => {
            if(tab.sysCd===e.cdId){
                tab.sysCd = e.name;
            }
        })
    })
    setTableData(table_sub_data);    
}

function searchClick(){
    let txt = '{"' + searchOption + '":"' + searchInput + '"}'
        setSearch('&search='+encodeURI(txt))
    setPage(0)
}

function getPrcsSttsCdCountData(data){
    setPrcsSttsCdCount(data)
}

function pressEnter(e) {
    if(e === 'Enter'){
        searchClick();
    }
}
const openModal= () => {
  setIsModalOpen(true);
}
const closeModal = () => {
    setIsModalOpen(false);
  }

  const columns = useMemo( () => [
    {
      Header: '번호',
      accessor: (_row: any, i : number) =>  (i + 1 ) + (page *pageSize) 
    },
    {
        Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=sysCd'} btnName='시스템'/>,  id : 'sysCd',
        accessor: 'sysCd'
    },
    {
      Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=ttl'} btnName='제목'/>, id : 'ttl',
      accessor : a => <span className="link-primary" style={{ cursor:'pointer' }} onClick={() =>setRqstId(a.id) }>{a.ttl.length < 35 ? a.ttl : a.ttl.slice(0, 35) + '...'}</span>
    },
    {
        Header : <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=registDt'} btnName='요청일'/>, id : 'registDt',
        accessor: a => <Fragment>{moment(a.registDt).format("YYYY.MM.DD")}</Fragment>
    },
    {
        Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=reqNm'} btnName='요청자'/>,  id : 'reqNm',
        accessor: 'reqNm',
      },
    {
        Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=chrgprNm'} btnName='담당자'/>, id : 'chrgprNm',
        accessor: a => <Fragment>{ (a.chrgprNm == null || a.chrgprNm === '') ? '-' : a.chrgprNm}</Fragment>,
    },
    {
        Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=prcsSttsCd'} btnName='상태'/>,  id : 'prcsSttsCd',
        accessor : 'prcsSttsCd'
      }
], [page, sort])
    
    return (
        <section>
            <TittleComponent tittle={"서비스 요청 목록"} subTittle={"서비스 관리자 및 운영자가 확인할 수 있는 전체 서비스 목록입니다."}/>
          <div className="content_wrap">
                <div className="d-flex align-items-center justify-content-between mt-3 mb-5">
                    <div className="fs-sm">
                        {nowTime} 업데이트
                    </div>
                    <div>
                       <DayButtonComponent day={day} setDay={setDay} />
                        <button type="button" className="btn btn-primary btn-xs mb-1" onClick={ openModal } >
                          <span data-bs-toggle="tooltip" data-placement="top" title="통계" >
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"/>
                                <path d="M5 19h15a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 112 0v15z" fill="#fff"/>
                                <path d="M8.73 14.684a1 1 0 11-1.46-1.368l3.75-4a1 1 0 011.38-.077l2.959 2.526 3.856-4.885a1 1 0 011.57 1.24l-4.5 5.7a1 1 0 01-1.434.14l-3.024-2.58-3.097 3.304z" fill="#fff" opacity=".6"/>
                            </g>
                            </svg>
                        </span>
                        </button>
                        {isModalOpen && (<StatsModalComponent day={day} setDay={setDay} url={'serviceAll'} rqstId={rqstId} open={isModalOpen} close={closeModal}  />)}                     
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="rounded shadow mb-4">
                        <div className="input-group input-group-lg">
                            <div className="col-auto ms-auto">
                                <select className="form-select form-select-lg" value={searchOption} data-choices onChange={e => setSearchOption(e.target.value)} >
                                    <option value={'ttl'}>제목</option>
                                    <option value={'reqNm'}>요청자</option>
                                    <option value={'chrgprNm'}>담당자</option>
                                </select>
                            </div>
                            <span className="input-group-text border-0 pe-1">
                                <i className="fe fe-search"></i>
                            </span>
                                <input className="form-control border-0 px-1" type="text" aria-label="Search our blog..." placeholder="검색어를 입력해주세요" onChange={(e) => setSearchInput(e.target.value)}  onKeyPress={ e => pressEnter(e.key)} value={searchInput}/>
                            <span className="input-group-text border-0 py-0 ps-1 pe-3">
                            <button className="btn btn-sm btn-primary" onClick={ searchClick}>
                                검색
                            </button>
                            </span>
                        </div>
                        </div>
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
                                <h3 className="mb-0">진행 사항</h3>
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
                                    <SelectPrcComponent urlData={CodeDetail.prcsSttsCd} onChange={(e) =>  {setPrcsSttsCd (e.target.value); setPage(0);}} />
                                    </div>
                                </div>

                                {prcsSttsCd === null || prcsSttsCd === 'default'
                                ? <TableComponent data={tableData} columns={columns} />
                                : <TableComponent data={tableData} columns={columns} />
                                }
                                <div className="d-flex justify-content-center">
                                <PagingComponent page={page} setPage={setPage} totalPages={totalPages} />
                            </div>                            
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
export default ServiceAllComponent
