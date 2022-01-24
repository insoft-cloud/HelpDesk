import { useState } from "react";
import Pagination from "./Pagination";

function TableCodeGroupDetail({tableClassName, tableData, arr} : any) {

    const limit = 10; // 표시될 컨텐츠 수
    // const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    return (
        <div>
            <table className="table table-sm table-responsive table-bordered border-dark text-center" >
                <thead className="table-secondary border-dark">
                    <tr>
                        <th scope="col" className="col-md-1">#</th>
                        <th scope="col" className="col-md-2">코드</th>
                        <th scope="col">항목</th>
                        <th scope="col" className="col-md-2">등록자</th>
                        <th scope="col" className="col-md-2">등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.slice(offset,offset+limit).map((table_data : any, index : number) => (
                        <tr key={index}>
                            <td scope="row">{index}</td>
                            <td>{table_data.CD_GRP_NO}</td>
                            <td>{table_data.CD_NM}</td>
                            <td>{table_data.USER_ID}</td>
                            <td>{table_data.REGIST_DT}</td>
                        </tr>
                    ))}
                </tbody>
            </table>                           

            {/* 페이징처리 */}
            <div className="justify-content-center">
               <Pagination total={tableData.length} limit={limit} page={page} setPage={setPage} />
            </div>            
        </div>
    );
}

TableCodeGroupDetail.defaultProps={
    tableClassName: 'table'
}

export default TableCodeGroupDetail;

