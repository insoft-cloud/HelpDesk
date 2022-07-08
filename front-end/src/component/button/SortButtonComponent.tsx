

/**
 * @Project     : HelpDesk
 * @FileName    : SortButtonComponent.tsx
 * @Date        : 2022-03-14
 * @author      : 김지인
 * @description : 테이블 정렬 버튼 컴포넌트
 */


export default function SortButtonComponent({btnName, sort, setSort, sortData}) {

    
    const sortHandler = () => {
        if(sort === sortData + ',desc'){
        setSort(sortData)
        } else {
            setSort(sortData + ',desc')
        }
    }


  return (
    <button className='btn btn-xs' onClick={sortHandler}>{btnName}</button>
  )
}
