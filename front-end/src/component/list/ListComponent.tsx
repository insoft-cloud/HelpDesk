import React from 'react'

function ListComponent( {listName, data} : any) {
  
  const hide = React.useState(data.length > 3)
  const ListContents = hide ? data.slice(0, 3) : data

        return(
          <ul>{listName}
             {ListContents.map((item : any) => (
               <li key={item.no}>{item.title}</li>
               ))}
          </ul>
        )
      }
export default ListComponent

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
// }
