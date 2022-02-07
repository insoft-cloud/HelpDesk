
import Pagination from "component/list/Pagination";
import { useState } from "react";


function TableManagerList({tableClassName, tableData, arr} : any) {

    const limit = 10; // 표시될 컨텐츠 수
    // const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [tab,setTab] = useState(tableData);
    const [check, setChecked] = useState(1);

    function delData(index){
        setTab(tab.splice(index,1))
    } 

    return (
        <div>
            <table className="table table-sm table-responsive table-bordered border-dark text-center" >
                <thead className="table-secondary border-dark">
                    <tr>
                        <th scope="col" className="col-md-1">#</th>
                        <th scope="col" className="col-md-2">ID</th>
                        <th scope="col">이름</th>
                        <th scope="col" className="col-md-2">담당업무</th>
                        <th scope="col" className="col-md-2">소속기관</th>
                        <th scope="col" className="col-md-2">소속부서</th>
                        <th scope="col" className="col-md-2">등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {tab.slice(offset,offset+limit).map((table_data : any, index : number) => (
                        <tr key={index}>
                            <td scope="row"><input type="checkbox" onChange={(event) => {tableData.splice(event.target.tabIndex,1); console.log()}}/></td>
                            <td>{table_data.USER_ID}</td>
                            <td>{table_data.NM}</td>
                            <td>{table_data.JOB_CD}</td>
                            <td>{table_data.PSITN_INSTT_CD}</td>
                            <td>{table_data.PSITN_DEPT_NM}</td>
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

TableManagerList.defaultProps={
    tableClassName: 'table'
}

export default TableManagerList;



    
