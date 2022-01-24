import React from 'react';

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