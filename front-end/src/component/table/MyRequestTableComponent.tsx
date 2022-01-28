import axios from "axios";
import Pagination from "component/list/Pagination";
import { MyWorkTableModel } from "interface/TableInterface";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";


function MyRequestTableComponent( tableClassName : any) {

    const limit = 10; // 표시될 컨텐츠 수
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [tableData, setTableData] = useState([]);

    const state = useTokenState();   
    
    useEffect(() => {

        axios.get("/user/service/req-attachs/test", {
            headers: {
                'Content-Type' : "application/json",
                'X-AUTH-TOKEN' : state.token + ""
            }
        })
            .then(function (response){
                setTableData(response.data)
            })
            .catch(function (error:any){
                console.log(error)
    
            });
        }, [])


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
                                <td>{table_data.svcReqNo.tyCd}</td>
                                <td>{table_data.svcReqNo.ttl}</td>
                                <td>{table_data.registDt?.slice(5,10)}</td>                                
                                <td></td> 
                                <td></td>
                                <td></td>
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