import axios from 'axios';
import moment from 'moment';
import TableComponent from "component/table/TableComponent";
import { Fragment, useEffect, useState } from 'react';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';
import TittleComponent from 'component/div/TittleComponent';

/**
 * @Project     : HelpDesk
 * @FileName    : ServiceAllComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 전체 서비스 화면 컴포넌트
 */

 
function ServiceAllComponent() {

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    let dispatch = useTokenDispatch()
    const state = useTokenState();

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "ServiceAll"})
 
        //todo:전체조회로 변경 필요
        axios.get("/user/service/requests/"+state.user+"?day=all", {
            headers: {
                'Content-Type' : "application/json",
                'X-AUTH-TOKEN' : state.token + ""
            }
        })
            .then(({data}) => {
                setTableData(data.content)

                console.log(data)                
                console.log(data.content)

            })
            .catch(function (error:any){
                console.log(error)
    
            }); 
    }, []);

    const columns = [
        {
          Header: '번호',
          id: 'index',
          accessor: (_row: any, i : number) => i + 1 
        },
        {
            Header: '시스템',
            accessor: 'sysCd',
        },
        {
          Header: '제목',
          accessor: 'ttl',
        },
        {
            Header : '요청일', id : 'registDt',
            accessor: a => <Fragment>{moment(a.registDt).format("MM/DD")}</Fragment>
        },
        {
            Header: '요청자',
            accessor: 'reqId',
          },
        {
            Header: '담당자',
            id:'requestHistories',
            accessor: data => 
                data.requestHistories.map( (item, index) => (
                    <Fragment key={index}>{item.userId}</Fragment>
                ))        
        },
        {
            Header: '상태',
            accessor: data => 
                data.requestHistories.map( (item, index) => (
                    <Fragment key={index}>{item.sttsCd}</Fragment>
                ))
          }
    ]
    
    
    return (
        <section>
            <TittleComponent tittle={"서비스 요청 목록"} subTittle={"서비스 관리자 및 운영자가 확인할 수 있는 전체 서비스 목록입니다."}/>

          <div className="content_wrap">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-sm">
                        {nowTime} 업데이트
                    </div>
                    <div>
                        <button className="btn btn-outline-primary btn-xs mb-1">오늘</button>
                        <button className="btn btn-outline-primary btn-xs mb-1">1주일</button>
                        <button className="btn btn-outline-primary btn-xs mb-1">1개월</button>
                        <button className="btn btn-outline-primary btn-xs mb-1">전체</button>
                        <button type="button" className="btn btn-primary btn-xs mb-1">
                          <span data-bs-toggle="tooltip" data-placement="top" title="통계">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"/>
                                <path d="M5 19h15a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 112 0v15z" fill="#fff"/>
                                <path d="M8.73 14.684a1 1 0 11-1.46-1.368l3.75-4a1 1 0 011.38-.077l2.959 2.526 3.856-4.885a1 1 0 011.57 1.24l-4.5 5.7a1 1 0 01-1.434.14l-3.024-2.58-3.097 3.304z" fill="#fff" opacity=".6"/>
                            </g>
                            </svg>
                        </span>
                        </button>
                    </div>
                </div>

                {/* todo : 검색 */}
                <div className="row justify-content-center">
                    <div className="col-6">

                        <form className="rounded shadow mb-4">
                        <div className="input-group input-group-lg">
                            <div className="col-auto ms-auto" >

                            <select className="form-select form-select-lg" data-choices>
                                <option selected>전체</option>
                            </select>
                            </div>
                            <span className="input-group-text border-0 pe-1">
                            
                            </span>

                            <input className="form-control border-0 px-1" type="text" aria-label="Search our blog..." placeholder="키워드 혹은 일련번호를 입력해주세요" />

                            <span className="input-group-text border-0 py-0 ps-1 pe-3">
                            </span>

                        </div>
                        </form>
                        
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

                        <div className="d-flex card shadow">
                        <div className="card-footer">
                            <div className="col_5 text-center">
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-primary">{tableData.length}</h3>
                                <p className="mb-0 fs-sm text-muted">전체</p>
                            </div>
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-primary-desat">0</h3>
                                <p className="mb-0 fs-sm text-muted">신규</p>
                            </div>
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-success">0</h3>
                                <p className="mb-0 fs-sm text-muted">진행</p>
                            </div>
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-danger">0</h3>
                                <p className="mb-0 fs-sm text-muted">완료</p>
                            </div>
                            <div className="cursor-pointer">
                                <h3 className="fs-1 text-muted">0</h3>
                                <p className="mb-0 fs-sm text-muted">보류</p>
                            </div>
                            </div>
                        <div>
                        </div>
                        </div>
                        </div>
                    
                    


                    <div className="card mt-3">
                        <div className="card-body">
                            <TableComponent data={tableData} columns={columns}/>
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
                        <div className="scroll_y pd30 pt00">
                            <div className="card shadow">
                                {/* <ServiceDetailComponent id ={ id } /> */}
                            </div>
                        </div>
                    </div>
                </div>                        
        </div>
        
        </section>
    )

    
}
export default ServiceAllComponent