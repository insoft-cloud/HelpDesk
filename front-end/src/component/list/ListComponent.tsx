import { ListModel } from 'interface/ListInterface';
import React from 'react'

/**
 * @Project     : HelpDesk
 * @FileName    : ListComponent.tsx
 * @Date        : 2021-01-24
 * @author      : 김지인
 * @description : 재사용 가능한 리스트 컴포넌트 (메인홈)
 */

function ListComponent( {listName, listData } : any) {

    
return(
  <>
  <div className='col-3 col-md-2 col-lg-3 order-md-1'>
      <div className='lead text-center text-md-start mb-6 mb-lg-8'>
          {listName}
      </div>
  </div>
  <ul className='list-group-horizontal mb-0'>
   {listData.map((list_data : ListModel, index : number) => (
    <li className='list-group-item' key={index}>
      <div>
        {list_data.TTL}
      </div>
      <div>
        {list_data.REGIST_DT}
      </div>
      </li>
   ))}    
  </ul>
  </>
  )
}      
export default ListComponent