import { Input } from "choices.js/public/types/src/scripts/components";
import Pagination from "component/list/Pagination";
import { useState } from "react";

function TableCodeGroupDetail({tableClassName, tableData, arr} : any) {

    const limit = 10; // 표시될 컨텐츠 수
    // const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [arrtest,setArrtest] = useState(tableData);
    
    function del(index){
        //리스트 가져올 때 'N'인 것들만 select
        //update로 'Y'처리..
      
        tableData.forEach(element => console.log(element))
        tableData.splice(index,1);
        console.log('삭제');
        tableData.forEach(element => console.log(element))
        setArrtest(tableData);
    }
  
    
  
    function add(){
  
     const tbody = document.querySelector('tbody');
     let row = tbody?.insertRow(tbody.rows.length-1);
     let cell1 = row?.insertCell(0);
     let cell2 = row?.insertCell(1);
     let cell3 = row?.insertCell(2);
     let cell4 = row?.insertCell(3);
     let cell5 = row?.insertCell(4);
     let cell6 = row?.insertCell(5);
     let inputCD_NO = document.createElement('input');
    let inputCD_NM = document.createElement('input');
    let inputCD_EXPLNT = document.createElement('input');
    let inputUSER_ID = document.createElement('input');
    let inputREGIST_DT = document.createElement('input');
     cell1?.appendChild(inputCD_NO);
     cell2?.appendChild(inputCD_NM);
     cell3?.appendChild(inputCD_EXPLNT);
     cell4?.appendChild(inputUSER_ID);
     cell5?.appendChild(inputREGIST_DT);
    //  cell6?.innerHTML('삭제');

    }

    

    return (
        <div>
            <table id="tab" className="table table-sm table-responsive table-bordered border-dark text-center" >
                <thead className="table-secondary border-dark">
                    <tr>
                        <th scope="col" className="col-md-2">코드</th>
                        <th scope="col" className="col-md-2">명칭</th>
                        <th scope="col" className="col-md-3">설명</th>
                        <th scope="col" className="col-md-2">등록자</th>
                        <th scope="col" className="col-md-2">등록일</th>
                        <th scope="col" className="col-md-1">삭제</th>
                    </tr>
                </thead>
                <tbody>
                     {/* update가 안됨, 이미 table이 생성돼서? */}
                    {/* {arrtest.slice(offset,offset+limit).map((table_data : any, index : number) => ( */}
                        {arrtest.map((table_data : any, index : number) => (
                        <tr key={index}>
                            <td scope="row">{table_data.CD_NO}</td>
                            <td>{table_data.CD_NM}</td>
                            <td>{table_data.CD_EXPLNT}</td>
                            <td>{table_data.USER_ID}</td>
                            <td>{table_data.REGIST_DT}</td>
                            <td>삭제</td> 
                        </tr>
                    ))}
                    <tr><td colSpan={6}><input type="button" value="dd" onClick={add}/></td></tr>
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

