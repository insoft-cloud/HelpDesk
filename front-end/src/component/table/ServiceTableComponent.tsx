import axios from "axios";
import Pagination from "component/list/Pagination";
import { ServiceTableModel } from "interface/TableInterface";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";

function ServiceTableComponent( tableClassName : any) {

    const [limit] = useState(10); // 표시될 컨텐츠 수
    const [page, setPage] = useState(1);
    const [offset] = useState(+limit * (page - 1));

    const [tableData, setTableData] = useState([]);
    const [search, setSearch] = useState("")

    const state = useTokenState();   

    useEffect(() => {

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
                <div style={{ margin: '0 auto', marginTop: '10%' }}>
                    <label>검색:</label>
                    
                    <input placeholder="제목 검색" type="text" onChange={event => setSearch(event.target.value)} />
                
                </div>
            </div>
            <div>
                목록({tableData.length})
            </div>
                <div className='table-responsive'>
                    <table className="table table-sm table-responsive table-bordered border-dark text-center" >
                        <thead className="table-secondary border-dark">
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">시스템</th>
                            <th scope="col">제목</th>
                            <th scope="col">요청일</th>
                            <th scope="col">요청자</th>
                            <th scope="col">담당자</th>
                            <th scope="col">상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        { tableData
                        .filter((searchR : ServiceTableModel, index : number) => {
                if (search === '') {
                return searchR;
                } else if (searchR.ttl?.includes(search)) {
                return searchR;
                }
            })
            .map((table_data : ServiceTableModel, index : number ) => (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{table_data.sysCd}</td>
                                <td>{table_data.ttl}</td>
                                <td>{table_data.registDt?.slice(5,10)}</td>                                
                                <td>{table_data.reqId}</td> 
                                <td></td>
                                <td></td>
                            </tr>
                        )).slice(offset,offset+limit)}
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

ServiceTableComponent.defaultProps={
    tableClassName: 'table'
}

export default ServiceTableComponent