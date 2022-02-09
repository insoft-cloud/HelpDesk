import Pagination from "component/list/Pagination"
import  { useState } from "react";

const CheckTableComponent = ({column, data, chkArr, setChkArr}) => {   
    //페이징
    const limit = 5; 
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    //체크박스
    
    
    function selectAll(e){    
        // console.log(true);
        // setStat(true)
        // setAllChecked(e)
        const data = document.getElementsByName('child');
        let idx = 0;
        console.log(idx);
        if(e){
            data.forEach(element => {  
                element.removeAttribute('checked');
                element.setAttribute('checked','checked');
                individualCheck(true,idx)
                idx++;
                console.log(idx);
            })
        }else{
            data.forEach(element => {
                element.removeAttribute('checked');
                individualCheck(false,idx);
                idx++;
                console.log(idx);
            })
        }
    
        
    
    }

    function individualCheck(value,index){
        console.log(value);
        if(value){
            chkArr.add(index);
            setChkArr(chkArr);
        }else{
            console.log(value);
            const selectAllBox = document.querySelector("#selectAllBox");
            selectAllBox?.removeAttribute('checked');
            chkArr.delete(index);
            setChkArr(chkArr);
        }
       
    console.log(chkArr);
}
    
    return (
        <>
        <div>
            <table  className="table table-sm table-responsive table-bordered border-dark text-center">
                <thead className="table-secondary border-dark">
                <tr>
                    <th><input type="checkbox" id="selectAllBox" onChange={e=> selectAll(e.target.checked)}  /></th>
                   {column.map((item, index)=><TableHeadItem item={item} key={index} />)}
                </tr>
                </thead>
                <tbody>
                    {data.map((item, index)=><TableRow item={item} column={column} idx={index} key={index} individualCheck={individualCheck} />).slice(offset, offset + limit)}
                </tbody>
            </table>                

             {/* 페이징처리 */}
             <div className="justify-content-center">
                <Pagination total={data.length} limit={limit} page={page} setPage={setPage} />
            </div>
        </div>
        </>
    )

}


const TableHeadItem = ({item}) => <th>{item.heading}</th>

const TableRow = ({ item,idx, column,individualCheck}) => (    
<tr>
    <td scope="row" key={item.index}><input type="checkbox" name="child" onChange={e=>individualCheck(e.target.checked,idx)} /></td>
    {column.map((columnItem, index : any) =>{
        return <td key={index}>{item[`${columnItem.value}`]}</td>
    })}
    {/* {column.map((columnItem, index : any) =>{
        console.log(item[`${columnItem.value}`]);
        console.log()
        // (item[`${columnItem.value}`]=='requestAttachments'?columnItem.value.map((data,i : any) =>{
        //     <td>{data.id}</td>}):<td>{item[`${columnItem.value}`]}</td>)
        })} */}
</tr>
)

export default CheckTableComponent;