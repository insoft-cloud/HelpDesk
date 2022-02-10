import Pagination from 'component/list/Pagination';
import { useState } from 'react';
import { useSortBy, useTable } from 'react-table';


/**
 * @Project     : HelpDesk
 * @FileName    : TableComponent.tsx
 * @Date        : 2021-02-10
 * @author      : 김지인
 * @description : 재사용 가능한 테이블 컴포넌트(domin쪽에서 data 받아옴)
 */


function SampleComponent({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data }, useSortBy);

      const limit = 10; // 표시될 컨텐츠 수
      const [page, setPage] = useState(1);
      const offset = (page - 1) * limit;
    
      return (
        <>
          <div>
            목록({data.length})
          </div>
          <table {...getTableProps()} className="table table-sm table-responsive table-bordered border-dark text-center">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              }).slice(offset,offset+limit)}
            </tbody>
          </table>
          <div>
                    {/* 페이징처리 */}
                    <div className="justify-content-center">
                        <Pagination total={columns.length} limit={limit} page={page} setPage={setPage} chkArr={null} setChkArr={null}/>
                    </div>
                </div>
        </>
      );
    }
    
export default SampleComponent;