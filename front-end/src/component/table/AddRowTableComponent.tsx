import { useState } from "react";
import { useTable } from "react-table";

/**
 * @Project     : HelpDesk
 * @FileName    : AddRowTableComponent.tsx
 * @Date        : 2022-02-09
 * @author      : 김수진
 * @description : 행추가 테이블
 */


const AddRowTableComponent = ({columns,data,limitCnt,delEvent,add} : any) => {            
    
    //페이징
    const limit = parseInt(limitCnt); 
    const [page, setPage] = useState(1);
    // const offset = (page - 1) * limit;
  
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

    return(
    <div className="table-responsive fs-sm">
        <table className="table table-striped border-top border" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                        <th>삭제</th>
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row,i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                
                                return <td  className="align-middle" {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            })}
                        <td><button className="btn btn-sm" onClick={e=>delEvent(row.original['id'])}>삭제</button></td>
                        </tr>
                    )
                })}
                <tr><td colSpan={6} className="text-center" onClick={add}>+</td></tr>
            </tbody>
        </table>

        {/* 페이징처리 */}
        {/* <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <Pagination total={data.length} limit={limit} page={page} setPage={setPage} chkArr={null} setChkArr={null} />
            </nav>
        </div> */}
    </div>
)
}
export default AddRowTableComponent;