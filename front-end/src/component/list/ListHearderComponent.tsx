import React from 'react';

function ListHearderComponent({listName, listData } : any) {

    const ListCount = React.useState(listData.length);

  return(
  <div>
      <div>
        {listName}
      </div>
      <div className='list mb-0 list-group list-group-horizontal'>
          <div  className='list-group-item'>
              신청 {ListCount}
          </div>
          <div className='list-group-item'>
              진행
          </div>
          <div className='list-group-item'>
              완료
          </div>
          <div className='list-group-item'>
              보류 
          </div>
      </div>
  </div>
  )
}

export default ListHearderComponent