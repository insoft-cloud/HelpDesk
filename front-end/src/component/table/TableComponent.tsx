

/**
 * @Project     : HelpDesk
 * @FileName    : TableComponent.tsx
 * @Date        : 2021-02-07
 * @author      : 김지인
 * @description : 재사용 가능한 테이블 컴포넌트(domin쪽에서 data 받아옴)
 */


const TableComponent = ({column, data} : any) => {        
    return (
        <>
        <div>
            <table>
                <thead>
                <tr>
                   {column.map((item, index)=><TableHeadItem item={item} />)}
                </tr>
                </thead>
                <tbody>
                    {data.map((item, index)=><TableRow item={item} column={column}/>)}
                </tbody>
            </table>                
        </div>
        </>
    )
}

const TableHeadItem = ({item}) => <th>{item.heading}</th>
const TableRow = ({ item, column }) => (
<tr>
    {column.map((columnItem : any) =>{
        return <td>{item[`${columnItem.value}`]}</td>
    } )}
</tr>
)

export default TableComponent;