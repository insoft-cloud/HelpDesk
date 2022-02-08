import Pagination from "component/list/Pagination"
import { useState } from "react";

const CheckTableComponent = ({column, data, del}) => {   
    const limit = 5; // 표시될 컨텐츠 수
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    console.log(data);
    
    return (
        <>
        <div>
            <table  className="table table-sm table-responsive table-bordered border-dark text-center">
                <thead className="table-secondary border-dark">
                <tr>
                    <th><input type="checkbox" onChange={(event) => selectAll(event.target.checked)}/></th>
                   {column.map((item, index)=><TableHeadItem item={item} key={index} />)}
                </tr>
                </thead>
                <tbody>
                    {data.map((item, index)=><TableRow item={item} column={column} key={index} />).slice(offset, offset + limit)}
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


const TableRow = ({ item, column }) => (
<tr>
    <td scope="row"><input type="checkbox" name="child"  /></td>
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

function selectAll(check){
    console.log('header check : '+check)
    const child = document.getElementsByName('child');
    child.forEach((data) => {
        data.setAttribute('checked','true')
        console.log(data.spellcheck)
    })
}


export default CheckTableComponent;