import React from 'react';

/**
 * @Project     : HelpDesk
 * @FileName    : ListComponent.tsx
 * @Date        : 2021-01-24
 * @author      : 김지인
 * @description : 대시보드 리스트 상단에 출력되는 리스트 카운터
 */


function ListHearderComponent({ listName, listData } : any) {

    const ListCount = React.useState(listData.length);

  return(
      <div className='col-3 col-md-2 col-lg-3 order-md-1'>
          <div className='lead text-center text-md-start mb-6 mb-lg-8'>
            {ListCount} {listName}
          </div>
      </div>
  )
}

export default ListHearderComponent