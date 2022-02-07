import React from 'react';

/**
 * @Project     : HelpDesk
 * @FileName    : ListComponent.tsx
 * @Date        : 2021-01-24
 * @author      : 김지인
 * @description : 리스트 이름 컴포넌트 (메인홈)
 */


function ListHearderComponent({ listName, listData } : any) {

  return(
      <div className='col-3 col-md-2 col-lg-3 order-md-1'>
          <div className='lead text-center text-md-start mb-6 mb-lg-8'>
             {listName}
          </div>
      </div>
  )
}

export default ListHearderComponent