import Pagination from "component/list/Pagination";
import { useState } from "react";
import { useTable } from "react-table";

/**
 * @Project     : HelpDesk
 * @FileName    : CheckTableComponent.tsx
 * @Date        : 2022-02-11
 * @author      : 김수진
 * @description : 체크박스적용 테이블 컴포넌트(컬럼,데이터,화면표시갯수,단어검색,개별선택,전체선택,체크된번호)
 */

function CheckTableComponent({columns,data,limitCnt,word,changeHandler,allCheck,chkArr}){
 
    //페이징
    const limit = parseInt(limitCnt); 
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    
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
            <table className="table table-responsive border-top border" {...getTableProps()}>
                <thead className="table-secondary">
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
                    {rows.filter(x=>x.original['ttl'].includes(word)).map((row,i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className={row.values['delYn']==='N'?"text-primary":""}>
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
