import Pagination from "component/list/Pagination";
import { useState } from "react";


function TableCodeGroup({tableData, column}) {

    const limit = 5; // 표시될 컨텐츠 수
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    
    // function remove(select_data) {
    //     let chkNum = select_data
    // }

    function chk(index){
        console.log(index);
    }

    return (
        <div>
            <table className="table table-sm table-responsive table-bordered border-dark text-center" >
                <thead className="table-secondary border-dark">
                    <tr>{column.map((data,index) =>{
                        <TableHeader data={data} key={index} />
                    })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((table_data: any, index: number) => (
                        <tr key={index}>
                            <td scope="row"><input type="checkbox" onChange={(event) => { (event.target.checked === true) ? chk(index) : chk(null) }} /></td>
                            <td>{table_data.ttl}</td>
                            <td>{table_data.reqId}</td>
                            <td>{table_data.tyCd}</td>
                            <td>{table_data.sysCd}</td>
                        </tr>
                    )).slice(offset, offset + limit)}
                </tbody>
            </table>

            {/* 페이징처리 */}
            <div className="justify-content-center">
                <Pagination total={tableData.length} limit={limit} page={page} setPage={setPage} />
            </div>


        </div>
    );
}

const TableHeader = ({data}) => <th>{data.header}</th>

export default TableCodeGroup;

