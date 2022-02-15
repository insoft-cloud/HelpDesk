import axios from "axios";
import { ButtonComponent } from "component/button/ButtonComponent";
import moment from "moment"
import TableComponent from "component/table/TableComponent";
import { Fragment, useEffect, useMemo, useState } from "react";
import { API_DOMAIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import ServiceDetailComponent from "component/service/ServiceDetailComponent";
import "assets/css/libs.bundle.css";
import './MyRequestComponent.css';
import TittleComponent from "component/div/TittleComponent";
import DayButtonComponent from "component/button/DayButtonComponent";


/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2022-01-25
 * @author      : 김지인
 * @description : 요청 현황 > 내 요청 화면 컴포넌트
 */

 function MyRequestComponent() {
    let dispatch = useTokenDispatch()
    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    const state = useTokenState();
    const [id, setId] = useState();
    const [tableData, setTableData] = useState([]);
    const [day, setDay] = useState('?day=all');


    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "myRequest"})
        axios.get("/user/service/requests/"+state.user+`${day}`, {
            headers: {
                'Content-Type' : "application/json",
                'X-AUTH-TOKEN' : state.token + ""
            }
        })
            .then(({data}) => {
                setTableData(data.content)

            })
            .catch(function (error:any){
                console.log(error)
    
            }); 
    }, [state.user, day], );

    const columns = useMemo( () => [
        {
          Header: '번호',
          id: 'index',
          accessor: (_row: any, i : number) => i + 1
        },
        {
            Header: '유형',
            accessor: 'tyCd',
        },
        {
          Header: '제목', id: 'ttl',
          accessor : a => <button className="btn btn-link" onClick={() =>setId(a.id) }>{a.ttl}</button>

        },
        {
            Header : '요청일', id : 'registDt',
            accessor: a => <Fragment >{moment(a.registDt).format("MM/DD")}</Fragment>
        },
        {
            Header: '목표일', id : 'goalDt',
            accessor:  a => <Fragment>{ (a.goalDt) != null ? moment(a.goalDt).format("MM/DD") : null}</Fragment>
          },
        {
            Header: '상태',
            accessor: data => 
                data.requestHistories.map( (item, index) => (
                    <Fragment key={index}>{item.sttsCd === 'n' 
                        ? '신규' 
                        : (item.sttsCd === 's'
                        ? '완료'
                        : (item.sttsCd === 't'
                        ? '진행'
                        : '보류'))}</Fragment>
                ))
          },
        {
            Header: '평가',
            accessor: '',
        }
    ], [])
    

    return (
        <section>
            <TittleComponent tittle={"서비스 요청 현황"} subTittle={"나의 업무 및 요청의 진행 현황을 확인할 수 있습니다."}/>      
            
            
        <div className="content_wrap">
                
                    <ul className="my_desk nav nav-pills mb-3 mt-5 justify-content-center">
                        <li className="nav-item">
                            <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myWork)} btnName='담당 업무' btnClassName='nav-link' />
                        </li>
                        <li className='nav-item'>
                            <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myRequest)} btnName='내 요청' btnClassName='nav-link active' />
                        </li>
                    </ul>
            

                <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-sm">
                        {nowTime} 업데이트
                    </div>
                    <div>
                        <DayButtonComponent setDay={setDay} />
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
                        <div className="scroll_y pd30 pt00" >
                            <div className="card shadow">
                            <ServiceDetailComponent id ={ id } />
                            </div>
                        </div>
                    </div>
                </div>                        
        </div>
        </section>
    )
}
export default MyRequestComponent