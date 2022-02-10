import Pagination from "component/list/Pagination"
import  { useState } from "react";

const CheckTableComponent = ({column, data, chkArr, setChkArr}) => {   
    //페이징
    const limit = 5; 
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    //체크박스
    const [boxChecked, setBoxChecked] = useState(false);
    const [isClicked,setIsClicked] = useState(false)
    const [allChecked,setAllChecked] = useState(false);
    
    function selectAll(e){
        let data = document.getElementsByName('child');
        
        setBoxChecked(e);
        setAllChecked(e);
        
        if(e){
            setChkArr(new Set())
            for(let idx=0; idx<data.length; idx++){
                chkArr.add(idx);
            }
            setChkArr(chkArr);
        }else{
            chkArr.clear();
            setChkArr(chkArr);
        }
        console.log(chkArr);
        
        // let idx = 0;
        // console.log(idx);
        // if(e){
        //     data.forEach(element => {  
        //         element.setAttribute('checked','checked');
        //         individualCheck(true,idx)
        //         idx++;
        //         console.log(idx);
        //     })
        // }else{
        //     data.forEach(element => {
        //         element.removeAttribute('checked');
        //         individualCheck(false,idx);
        //         idx++;
        //         console.log(idx);
        //     })
        // }
    
        
    
    }
    function testClick(){
        setIsClicked(!isClicked);
    }
        
    function individualCheck(value,index){
        let data = document.getElementById(index);
        setIsClicked(false);
        setBoxChecked(false);
        console.log(value);
        if(value){
            chkArr.add(index);
            setChkArr(chkArr);
            
        }else{
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
                    <th><input type="checkbox" name="selectAllBox" onChange={e=> selectAll(e.target.checked)} onClick={testClick} checked={boxChecked} /></th>
                   {column.map((item, index)=><TableHeadItem item={item} key={index} />)}
                </tr>
                </thead>
                <tbody>
                    {data.map((item, index)=><TableRow item={item} column={column} idx={index} key={index} allChecked={allChecked} isClicked={isClicked} chkArr={chkArr} individualCheck={individualCheck} />).slice(offset, offset + limit)}
                </tbody>
            </table>                

             {/* 페이징처리 */}
             <div className="justify-content-center">
                <Pagination total={data.length} limit={limit} page={page} setPage={setPage} chkArr={chkArr} setChkArr={setChkArr} />
            </div>
        </div>
        </>
    )

}


const TableHeadItem = ({item}) => <th>{item.heading}</th>

const TableRow = ({ item,idx, column,individualCheck,chkArr,allChecked,isClicked}) => (    
<tr>
    <td key={item.index}>
        {(isClicked)?<input type="checkbox" name="child" id={idx} onChange={e=>individualCheck(e.target.checked,idx)} checked={allChecked} />
        :<input type="checkbox" name="child" onChange={e=>individualCheck(e.target.checked,idx)}  />}
        
        </td>
    {column.map((columnItem, index : any) =>{
        // console.log(item[`${columnItem.value}`])
        return <td key={index}>{item[`${columnItem.value}`]}</td>
        
    })}
    {/* <td>{item['requestAttachments'][0].id}</td> */}
    {/* console.log(item['requestAttachments'][0]); */}
    {/* {column.map((columnItem, index : any) =>{
        console.log(item[`${columnItem.value}`]);
        console.log()
        // (item[`${columnItem.value}`]=='requestAttachments'?columnItem.value.map((data,i : any) =>{
        //     <td>{data.id}</td>}):<td>{item[`${columnItem.value}`]}</td>)
        })} */}
</tr>
)

export default CheckTableComponent;