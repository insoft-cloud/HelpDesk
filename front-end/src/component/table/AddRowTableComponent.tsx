import Pagination from "component/list/Pagination"
import { useState } from "react";

/**
 * @Project     : HelpDesk
 * @FileName    : AddRowTableComponent.tsx
 * @Date        : 2021-02-09
 * @author      : 김수진
 * @description : 행추가 테이블
 */


const AddRowTableComponent = ({column, data,setViewData,delData,setDelData} : any) => {            
    
    const limit = 10; // 표시될 컨텐츠 수
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [text,setText] = useState([]);
    

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
        inputCD_NO.setAttribute('width',"20px");
        inputCD_NO.setAttribute("class","form-control");
       let inputCD_NM = document.createElement('input');
       inputCD_NM.setAttribute("class","form-control");
       let inputCD_EXPLNT = document.createElement('input');
       inputCD_EXPLNT.setAttribute("class","form-control");
       let inputUSER_ID = document.createElement('input');
       inputUSER_ID.setAttribute("class","form-control");
       let inputREGIST_DT = document.createElement('input');
       inputREGIST_DT.setAttribute("class","form-control");
       // let cancel = document.createTextNode("삭제");
        cell1?.appendChild(inputCD_NO);
        cell2?.appendChild(inputCD_NM);
        cell3?.appendChild(inputCD_EXPLNT);
        cell4?.appendChild(inputUSER_ID);
        cell5?.appendChild(inputREGIST_DT);
        
       }

       function delEvent(index,id) {
        setDelData(delData.add(id));
        setViewData(data.splice(index,1));
        console.log(delData);
       }
    
    return (
        <>
        <div className="card-body">
            <div>
                목록({column.length})
            </div>
            <div className='table-responsive'>
                <table className="table table-sm table-responsive table-bordered border-dark text-center">
                    <thead className="table-secondary border-dark">
                        <tr>
                            {column.map((item, index)=><TableHeadItem item={item} key={index} />)}
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index)=><TableRow item={item} column={column} key={index} delEvent={delEvent} idx={index} text={text} setText={setText} />).slice(offset,offset+limit)}
                        <tr><td colSpan={6} className="table-secondary border-dark" onClick={add}>+</td></tr>
                    </tbody>
                </table>
                <div>
                    {/* 페이징처리 */}
                    <div className="justify-content-center ">
                        <Pagination total={column.length} limit={limit} page={page} setPage={setPage} chkArr={null} setChkArr={null}/>
                    </div>
                </div>
            </div>                
        </div>
        </>
    )
}

const TableHeadItem = ({item}) => <th className={item.class}>{item.heading}</th>
const TableRow = ({ item, column,delEvent,idx,text,setText }) => (
<tr>
    {column.map((columnItem, index : any) =>{
        return <td key={index}><input type="text" className="form-control" value={item[`${columnItem.value}`]} onChange={(e) => setText(e.target.value,index)}/></td>
    } )}
    <td><button className="btn-xs btn-outline-dark rounded-1 form-control" id={idx} onClick={(e)=>delEvent(idx,item['id'])}>삭제</button></td>
</tr>

)
export default AddRowTableComponent;