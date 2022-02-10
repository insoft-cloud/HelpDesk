import axios from 'axios';
import moment from 'moment';
import TableComponent from "component/table/TableComponent";
import { Fragment, useEffect, useState } from 'react';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';

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
        <section className='pt-4 pt-md-11'>
          <div className="container">
           <div className="row align-items-center">
            
            <div>
                <h1>서비스 요청 목록</h1>
                <hr></hr>
                <p>나의 업무 및 요청의 진행 현황을 확인할 수 있습니다.</p>
            </div>

            <div>
                <div>
                    {nowTime} 업데이트
                </div>
                <hr></hr>
                <div>
                    <label>검색:</label>
                    
                    <input placeholder="제목 검색" type="text" />
                </div>
                <div>    
                    <div>
                        <h4>진행 사항</h4>
                    </div>
                    <div>
                        <div></div>
                        <TableComponent data={tableData} columns={columns}/>
                    </div>
                    <div>
                         {/* <ServiceDetailComponent data={tableData} /> */}
                    </div>
                </div>
            </div>
           </div>
          </div>
        </section>
    )

    
}
export default ServiceAllComponent