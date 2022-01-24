import { ListModel } from 'interface/ListInterface';
import React from 'react'

/**
 * @Project     : HelpDesk
 * @FileName    : ListComponent.tsx
 * @Date        : 2021-01-24
 * @author      : 김지인
 * @description : 재사용 가능한 리스트 컴포넌트 (재작중)
 */

function ListComponent( {listName, listData } : any) {

  const ListCount = React.useState(listData.length);   
    
return(
  <ul className='list-group-horizontal mb-0'>{listName} {ListCount}
   {listData.map((list_data : ListModel, index : number) => (
    <li className='list-group-item' key={index}>
      <div>
       {list_data.PRIORT_CD}/{list_data.TY_CD} {list_data.SYS_CD}
      </div>
      <div>
        {
            listName === "신규 요청"
        ? <div> 등록일 : {list_data.REGIST_DT}</div>
        : (listName === "진행"
        ? <div> 목표일 :  {list_data.UPD_DT} </div> 

        : <div> 완료일 :  {list_data.GOAL_DT} </div>
          ) 
        }
      </div>
      </li>
   ))}    
  </ul>
  )
}      
export default ListComponent


//  테이블 정의서
// TB_HELP_SVC_RQST		서비스요청
// SVC_RQST_NO			서비스요청번호		
// RQSTR_ID			요청자 아이디		
// TY_CD			유형코드	(기능개선/장애)
// PRIORT_CD			우선순위코드(낮음/보통/높음/긴급)
// SYS_CD			시스템코드		
// TTL			제목		
// CNTS			내용		
// DEL_YN			삭제여부		
// REGIST_DT			등록일시		
// UPD_DT			수정일시		
// GOAL_DT			목표일시	

//     const ListContents = (subject : string, _fun : Function, { data = [] }) => {
      
//       return(
//         <ul className='listTitle'>{data.map(item => (
//           <li key={item.id}>
//             <p>{item.name}</p>
//           </li>
//         ))}
//         </ul>
//       )
//     }
// };
// function listTest({ key, Title }) {



//50% 성공 케이스
// function ListComponent({subject, listName = [] }) {
//   return (
//     <ul>
//         <p>{subject}</p>
//         {listName.map((no, title) => (
//           <li key={no}>{title}</li>
//         ))}
//     </ul>
//   )

  // listName === "신규 요청"
  // ? <div> 등록일 : {list_data.REGIST_DT}</div>
  // : (listName === "진행"
  // ? <div> 목표일 :  {list_data.UPD_DT} </div> 

  // : <div> 완료일 :  {list_data.GOAL_DT}) </div>

  
  // const filter = useState( () => {
  //   if(listName === "신규 요청"){
  //     return "등록일 : "  
  //   }else if(listName === "진행"){
  //     return "목표일 : "
  //   }else {
  //     return ("완료일 : " 
  //     )}
  // });

  // const filteredComponent = (listName : string) => {
  //   if list
  // }

  // const Ing = listName.filter('진행');

 

  // const hide = React.useState(data.length > 3)
  // const ListContents = hide ? data.slice(0, 3) : data