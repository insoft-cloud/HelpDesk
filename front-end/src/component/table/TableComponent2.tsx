
import { useTable } from 'react-table';
import { txtDiv } from 'utils/CommonText';
import "component/table/Table2.css";


/**
 * @Project     : HelpDesk
 * @FileName    : TableComponent.tsx
 * @Date        : 2022-02-10
 * @author      : 김지인
 * @description : 재사용 가능한 테이블 컴포넌트(domin쪽에서 data 받아옴)
 */


function TableComponent2({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,    
        } = useTable({ columns, data });


      return (
         <>
         {data.length === 0 ? <>{txtDiv.tableData}</> 
         : <> 
          <div className="table-responsive fs-sm">
          <table id="tableComponent2" className="table table-striped border-top" {...getTableProps()} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                        <th scope="col" {...column.getHeaderProps()} >
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
                      <td{...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div> 
          
        </> 
        } 
        </>    
      );
    }
    
export default TableComponent2;





