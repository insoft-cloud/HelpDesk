import Pagination from "component/list/Pagination"
import { useState } from "react";
import { Link } from "react-router-dom"

/**
 * @Project     : HelpDesk
 * @FileName    : TableComponent.tsx
 * @Date        : 2021-02-07
 * @author      : 김지인
 * @description : 재사용 가능한 테이블 컴포넌트(domin쪽에서 data 받아옴)
 */


const TableComponent = ({column, data} : any) => {        

    
    const limit = 10; // 표시될 컨텐츠 수
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    return (
        <>
        <div className="card-body">
            <div>
                목록({column.length})
            </div>
            <div className='table-responsive'>
                <table className="table table-sm table-responsive table-bordered border-dark text-center">
                    <thead className="table-secondary border-dark">
                        <tr>
                            {column.map((item, index)=><TableHeadItem item={item} key={index} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index)=><TableRow item={item} column={column} key={index} />).slice(offset,offset+limit)}
                    </tbody>
                </table>
                <div>
                    {/* 페이징처리 */}
                    <div className="justify-content-center">
                        <Pagination total={column.length} limit={limit} page={page} setPage={setPage} />
                    </div>
                </div>
            </div>                
        </div>
        </>
    )
}

const TableHeadItem = ({item}) => <th>{item.heading}</th>
const TableRow = ({ item, column }) => (
<tr>
    {column.map((columnItem, index : any) =>{

        if(columnItem.value === 'ttl') {
            return <Link to={"/"} className="nav-link" key={index}><td>{item[`${columnItem.value}`]}</td></Link>
        }

        return <td key={index}>{item[`${columnItem.value}`]}</td>
    } )}
</tr>
)

export default TableComponent;