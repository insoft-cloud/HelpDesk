import Pagination from "component/list/Pagination";
import { useCallback, useEffect, useState } from "react";
import { useTable } from "react-table";

/**
 * @Project     : HelpDesk
 * @FileName    : CheckTableComponent.tsx
 * @Date        : 2021-02-11
 * @author      : 김수진
 * @description : 체크박스적용 테이블 컴포넌트(컬럼,데이터,체크번호)
 */

function CheckTableComponent({columns,data,setChkNums}){
 
    //페이징
    const limit = 10; 
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    //체크박스
    const [chkArr, setChkArr] = useState<Array<number>>(new Array()); 
    //전체체크
    const allCheck = (e) =>{ 
        if(e){
            const checkedArray:number[] = [];
            data.forEach((element,index) => {
                checkedArray.push(index);
            });
            setChkArr(checkedArray);
        }else{
            setChkArr([]);
        }}
    //개별체크
    const changeHandler = useCallback( 
        (e,index) => {
        if(e){
            setChkArr([...chkArr,index])
        }else{
            setChkArr(chkArr.filter((i)=>i!==index))
        }
        
    },[chkArr])
    //테이블
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    useEffect(()=>{
        setChkNums(chkArr)
    },[chkArr]);

    return(
        <div className="table-responsive fs-sm">
            <table className="table table-striped border-top border" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th><input type="checkbox" onChange={e=>allCheck(e.target.checked)}  checked={chkArr.length===0?false:chkArr.length===data.length?true:false}/></th> 
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row,i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                <td className="text-center"><input type="checkbox" onChange={e=> changeHandler(e.target.checked,i) }checked={chkArr.includes(i)?true:false} /></td>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    }).slice(offset, offset + limit)}
                </tbody>
            </table>
            {/* 페이징처리 */}
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <Pagination total={data.length} limit={limit} page={page} setPage={setPage} chkArr={null} setChkArr={null} />
                </nav>
            </div>
        </div>
    )
}

export default CheckTableComponent;
