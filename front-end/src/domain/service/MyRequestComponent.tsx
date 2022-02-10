import axios from "axios";
import { ButtonComponent } from "component/button/ButtonComponent";
import moment from "moment"
import TableComponent from "component/table/TableComponent";
import { Fragment, useEffect, useState } from "react";
import { API_DOMAIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenState } from "utils/TokenContext";


/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 요청 현황 > 내 요청 화면 컴포넌트
 */

 function MyRequestComponent() {    

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    const state = useTokenState();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {

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
    }, [state]);


    const columns = [
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
          Header: '제목',
          accessor: 'ttl',
        },
        {
            Header : '요청일', id : 'registDt',
            accessor: a => <Fragment>{moment(a.registDt).format("MM/DD")}</Fragment>
        },
        {
            Header: '목표일',
            accessor:  a => <Fragment>{moment().format("MM/DD")}</Fragment>
          },
        {
            Header: '상태',
            accessor: data => 
                data.requestHistories.map( (item, index) => (
                    <Fragment key={index}>{item.sttsCd}</Fragment>
                ))
          },
        {
            Header: '평가',
            accessor: '',
        }
    ]

    

    return (
        <section className='pt-4 pt-md-11'>
          <div className="container">
           <div className="row align-items-center">
            
            <div>
                <h1>서비스 요청 현황</h1>
                <hr></hr>
                <p>나의 업무 및 요청의 진행 현황을 확인할 수 있습니다.</p>
            </div>

            <div>
                <div>
                    <ul className='list mb-0 list-group list-group-horizontal'>
                        <li className='list-group-item'>
                            <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myWork)} btnName='담당 업무' btnClassName='list-link' />
                        </li>
                        <li className='list-group-item'>
                            <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myRequest)} btnName='내 요청' btnClassName='list-link' />
                        </li>
                    </ul>
                </div>
                <div>
                    <div>
                        {nowTime} 업데이트
                    </div>
                    <div>
                        <div>
                            <TableComponent data={tableData} columns={columns}/>
                        </div>
                    </div>
                </div>
            </div>
           </div>
          </div>
        </section>
    )
}
export default MyRequestComponent