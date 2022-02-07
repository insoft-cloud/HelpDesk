
import axios from "axios";
import { procGetAxios } from "axios/Axios";
import Pagination from "component/list/Pagination";
import { title } from "process";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";


function TableCodeGroup() {


    const state = useTokenState();
    const [tableData, setTableData] = useState([]);

    //api 사용
    procGetAxios("/user/service/requests/test", state.token,"application/json",show);

    const limit = 5; // 표시될 컨텐츠 수
    // const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(2);
    const offset = (page - 1) * limit;
    const [check, setChecked] = useState(1);
    const [testdata, setTestData] = useState([]);

    function chk(select_data) {
        setTestData(testdata.concat(select_data));
    }
    function remove(select_data) {
        let chkNum = select_data
    }

    function show(data) {
        setTableData(data.requestList)
    }

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
                    {tableData.map((table_data: any, index: number) => (
                        <tr key={index}>
                            <td scope="row"><input type="checkbox" onChange={(event) => { (event.target.checked == true) ? chk(tableData[index]) : chk(null) }} /></td>
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

TableCodeGroup.defaultProps = {
    tableClassName: 'table'
}

export default TableCodeGroup;

