import axios from 'axios';
import { procGetAxios } from 'axios/Axios';
import { ButtonComponent } from 'component/button/ButtonComponent'
import DayButtonComponent from 'component/button/DayButtonComponent';
import SortButtonComponent from 'component/button/SortButtonComponent';
import TittleComponent from 'component/div/TittleComponent';
import PagingComponent from 'component/list/PagingComponent';
import StatsModalComponent from 'component/modal/StatsModalComponent';
import { CountComponent } from 'component/service/ServiceCountComponent';
import TableComponent from 'component/table/TableComponent';
import moment from 'moment';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { CodeDetail } from 'utils/AdminCode';
import { txtDiv } from 'utils/CommonText';
import { API_DOMAIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';
import ServiceInfoComponent from './ServiceInfoComponent';



/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2022-01-25
 * @author      : 김지인
 * @description : 요청 현황 > 내 업무 화면 컴포넌트
 */

function MyWorkComponent() {    

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    let dispatch = useTokenDispatch();
    const [contentType] = useState("application/json");


    const state = useTokenState();
    const [rqstId, setRqstId] = useState();
    const [tableData, setTableData] = useState([]);
    const [day, setDay] = useState('?day=week');
    const [sort, setSort] = useState('&sort=registDt');

    const [isModalOpen,setIsModalOpen] = useState(false);

    const [page,setPage] = useState(0);
    const [pageSize] = useState(7);
    const [totalPages,setTotalPages] = useState(0);
    const [totaldata, setTotalData] = useState()

    const [prcsSttsCdCount, setPrcsSttsCdCount ] : any = useState([]);

    let table_sub_data;


    useEffect(() => {

        dispatch({ type: 'SET_PAGE', page: "myRequest"})
        
        procGetAxios("/user/service/requests/" + state.user + "/charges"+day+sort+"&page="+page+"&size="+pageSize, state.token, contentType, getTableData)
        procGetAxios("user/service/request/"+state.user+"/charge/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
        
    }, [state.user, day, rqstId, sort], );

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
        procGetAxios("admin/group/"+CodeDetail.prioritCd+"/details",state.token,"application.json", prioritCdAdminCode)
   }
   function prioritCdAdminCode(data){
        table_sub_data.forEach(tab => {
            data.content.forEach(e => {
                if(tab.priortCd===e.cdId){
                    tab.priortCd = e.name;
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
          id: 'index',
          accessor: (_row: any, i : number) => i + 1
        },
        {
            Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=tyCd'} btnName='유형'/>, 
            accessor: 'tyCd'
        },
        {
            Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=ttl'} btnName='제목'/>, id: 'ttl',
            accessor : a => <button className="btn btn-link" onClick={() =>setRqstId(a.id) }>{a.ttl}</button>

        },
        {
            Header : <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=registDt'} btnName='요청일'/>, id : 'registDt',
            accessor: a => <Fragment>{moment(a.registDt).format("YYYY.MM.DD")}</Fragment>
        },
        {
            Header : <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=priortCd'} btnName='우선순위'/>,
            accessor : 'priortCd'
        },
        {
            Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=goalDt'} btnName='목표일'/>, id : 'goalDt',
            accessor:  a => <Fragment>{ (a.goalDt) != null ? moment(a.goalDt).format("YYYY.MM.DD") : '-'}</Fragment>
          },
        {
            Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'&sort=prcsSttsCd'} btnName='상태'/>,
            accessor: 'prcsSttsCd'
          }
    ], [])

    const openModal= () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }  

    return (
        <section>
            <TittleComponent tittle={"서비스 요청 현황"} subTittle={"나의 업무 및 요청의 진행 현황을 확인할 수 있습니다."}/>           
            <div className="content_wrap">                
                <ul className="my_desk nav nav-pills mb-3 mt-5 justify-content-center">
                    <li className="nav-item">
                        <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myWork)} btnName='담당 업무' btnClassName='nav-link active' />
                    </li>
                    <li className='nav-item'>
                        <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myRequest)} btnName='내 요청' btnClassName='nav-link' />
                    </li>
                </ul>
                <div className="d-flex align-items-center justify-content-between">
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
                        
                        {isModalOpen && (<StatsModalComponent day={day} setDay={setDay} url={'myWork'} rqstId={rqstId} open={isModalOpen} close={closeModal}  />)}


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
                                <h3 className="mb-0">담당 업무 현황</h3>
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
export default MyWorkComponent