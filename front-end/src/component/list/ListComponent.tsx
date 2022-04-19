import { ListModel } from 'interface/ListInterface';
import moment from 'moment';
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
  <div className="col-12 col-md-6">
            
            <h3>{listName}</h3>
            <ul className="list-group">

            {listData.map((list_data : any, index : number) => (

              <li className="d-flex justify-content-between list-group-item cursor-pointer" key={index}>
                <div className="col-2">
                  
                  <div className="badge badge-rounded-circle bg-danger-soft pl10 pr10 pt05">
                    {list_data.tyCd}
                  </div>
                </div>
                <div className="col-10">
                  <div className="d-flex justify-content-between col align-items-center">
          
                    <div className="mb-0 notice_title">
                      {list_data.ttl}
                    </div>
                    <div className="fs-sm text-muted mb-0 text-end">{moment(list_data.registDt).format("YYYY.MM.DD HH:MM")}</div>
                  </div>
                </div>
              </li>
            ))}    
            </ul>
          </div>
  )
}      
export default ListComponent