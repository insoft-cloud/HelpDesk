import axios from "axios";
import Pagination from "component/list/Pagination";
import { MyWorkTableModel } from "interface/TableInterface";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";


/**
 * @Project     : HelpDesk
 * @FileName    : MyRequestTableComponent.tsx
 * @Date        : 2021-02-05
 * @author      : 김지인
 * @description : 요청현황 > 내요청 화면에 나오는 table 컴포넌트 (id에 따른 요청내역 조회)
 */


function MyRequestTableComponent( tableClassName : any) {

    const limit = 10; // 표시될 컨텐츠 수
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [tableData, setTableData] = useState([]);

    const state = useTokenState();   
    
    useEffect(() => {

        //todo : {userId}로 하면 데이터가 없음
        axios.get("/user/service/requests/test", {           
            headers: {
                'Content-Type' : "application/json",
                'X-AUTH-TOKEN' : state.token + ""
            }
        })
            .then(({data}) => {
                setTableData(data.requestList)
                console.log(data)                
                console.log(data.requestList)

            })
            .catch(function (error:any){
                console.log(error)
    
            });
        }, [state.token])


        return (
            <div className="card-body">
            <div>
                목록({tableData.length})
            </div>
                <div className='table-responsive'>
                    <table className="table table-sm table-responsive table-bordered border-dark text-center" >
                        <thead className="table-secondary border-dark">
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">유형</th>
                            <th scope="col">제목</th>
                            <th scope="col">요청일</th>
                            <th scope="col">담당자</th>
                            <th scope="col">목표일</th>
                            <th scope="col">상태</th>
                            <th scope="col">평가</th>
                        </tr>
                        </thead>
                        <tbody>
                        { tableData.slice(offset,offset+limit).map((table_data : MyWorkTableModel, index : number ) => (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{table_data.tyCd}</td>
                                <td>{table_data.ttl}</td>
                                <td>{table_data.registDt?.slice(5,10)}</td>                                
                                <td>{table_data.requestHistories.userId}</td> 
                                <td>{table_data.goalDt?.slice(5,10)}</td>
                                <td>{table_data.requestHistories.sttsCd}</td>
                                <td></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* 페이징처리 */}
                    <div className="justify-content-center">
                    <Pagination total={tableData.length} limit={limit} page={page} setPage={setPage} />
                    </div> 
               
                </div>
            </div>
        );
}

MyRequestTableComponent.defaultProps={
    tableClassName: 'myReqtable'
}

export default MyRequestTableComponent