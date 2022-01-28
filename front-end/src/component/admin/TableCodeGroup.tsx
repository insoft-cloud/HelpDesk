
import Pagination from "component/list/Pagination";
import { useState } from "react";


function TableCodeGroup({tableClassName, tableData, arr} : any) {

    const limit = 10; // 표시될 컨텐츠 수
    // const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [tab,setTab] = useState(tableData);
    const [check, setChecked] = useState(1);

    // function test(index){
    //     delete(index);
    // }

    function delData(index){
        // alert(table_data.CD_NM+table_data.CD_GRP_NO+","+table_data.USER_ID+","+table_data.REGIST_DT);
        // let arr : any[] = tableData.splice(index,.1)
        setTab(tab.splice(index,1))
        
        // tab(tableData.splice(index,1)) // 이것만 남아..
    } 

    // const idValid = /^[a-zA-Z0-9]{3,8}$/;
    // const myId = 'asdf123';
    // const myId2 = '20201202test';
    // const myId3 = 'AAAAAA';    

   
    
    
    

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
                    {tab.slice(offset,offset+limit).map((table_data : any, index : number) => (
                        <tr key={index}>
                            <td scope="row"><input type="checkbox" onChange={(event) => {tableData.splice(event.target.tabIndex,1); console.log()}}/></td>
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

TableCodeGroup.defaultProps={
    tableClassName: 'table'
}

export default TableCodeGroup;

