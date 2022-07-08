import { useState } from "react";
import { useTable } from "react-table";
import TrComponent from "./TrComponent";

/**
 * @Project     : HelpDesk
 * @FileName    : AddRowTableComponent.tsx
 * @Date        : 2022-02-09
 * @author      : 김수진
 * @description : 행추가 테이블
 */

const AddRowTableComponent = ({ columns, data, limit, offset, add, addData, delEvent, delList,editStat }) => {
    const [trCnt, setTrCnt] = useState(0);
    let arr: any[] = [];
    delList.map(e => {
        arr.push(e['id']);
    })
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
    const addRender = () => {
        for (let i = 0; i < addData; i++) {
            return <TrComponent key={i} />
        }
    }
    const addEvent = () => {
        add();
        setTrCnt(trCnt + 1)
    }
    return (
        <table className="table border-top" {...getTableProps()}>
            <thead className="table-secondary">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th scope="col" {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                        {editStat?null:<th>삭제</th>}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr className={arr.includes(row.original['id']) ? "table-danger" : ""} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td className={cell.column['className']} {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            })}
                            {editStat?null:<td className="align-middle text-center col-md-1">{row.original['id'] !== "new" ? <button className="btn btn-sm" onClick={e => delEvent(row.original)}>삭제</button> : ""}</td>}
                        </tr>
                    )
                })}
                {/* .slice(offset,offset+limit) */}
                {addRender}
                {editStat?null:<tr><td colSpan={6} className="text-center" onClick={addEvent}>
                    <button className="btn btn-success-soft btn-rounded-circle btn-sm">
                        <i className="fe fe-plus"></i>
                    </button>
                </td></tr>
                }
            </tbody>
        </table>
    )
}
export default AddRowTableComponent;
