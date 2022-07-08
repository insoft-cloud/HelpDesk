import { useTable } from "react-table";
import {useEffect} from "react";
import {txtAlert, txtDiv} from "../../utils/CommonText";

/**
 * @Project     : HelpDesk
 * @FileName    : CheckTableComponent.tsx
 * @Date        : 2022-02-11
 * @author      : 김수진
 * @description : 체크박스적용 테이블 컴포넌트(컬럼,데이터
 * ,전체체크함수,전체체크,개별체크,아이템수,아이템시작번호)
 */
function CheckTableComponent({ columns, data, allCheck, chkArr, changeHandler, limit }) {
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

    return (
        <div className="table-responsive fs-sm">
            <table className="table border-top text-small" {...getTableProps()}>
                <thead className="table-secondary">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th scope="col"><input type="checkbox" onChange={e => { allCheck(e.target.checked) }} checked={chkArr.length === 0 ? false : chkArr.length === limit ? true : false} /></th>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.length===0?<tr><td colSpan={columns.length+1} className="text-center">{txtDiv.zeroData}</td></tr>:
                    rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className={(row.original['joinConfirmYN'] === 'N') ? "text-primary align-middle" : "align-middle"}>
                                <td className="text-center text-nowrap "><input type="checkbox" onChange={e => changeHandler(e.target.checked, i)} checked={chkArr.includes(i) ? true : false} /></td>
                                {row.cells.map(cell => {
                                    return <td className="text-center" {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CheckTableComponent;
