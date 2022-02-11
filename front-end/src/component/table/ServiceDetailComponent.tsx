import axios from "axios";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";

function ServiceDetailComponent ( {id} ){

  console.log(id)
  
  // console.log('넘겨받는========='+id)

  // const matchId = data.find(function(data){ return data.id === id })

   const [data, setData] = useState();
  const state = useTokenState();

  const [test, setTest] = useState();

  useEffect(() => {
    
    axios.get(`/user/service/request/${id}`, {
//    axios.get('/user/service/request/'+{id}, {
//    axios.get('/user/service/request/1c101206-1568-416f-b82c-b81255378639', {
    headers: {
      'Content-Type' : "application/json",
      'X-AUTH-TOKEN' : state.token + ""
        }
      })
    .then( function(res){
      setData(res.data)
      console.log('전달 받는데이터=========')
      console.log(data)
//        setTest(data.cnts)
      // console.log('test======'+data)
    })
      .catch(error => {
      console.log(error)
    })
  }, [id])

  const styles = {
    height: "calc(100vh - 290px)"}
      
  return (
    <>
      <div className="scroll_y pd30 pt00" style={styles}>
        <h3>서비스 요청 상세 정보</h3>
      </div> 

        

       {/* {
         data ? (
          <>
          <div>
            내용 : {test}
             test: {(test : ServiceTableModel) => (<>{test.cnts}</>)}

          </div>
            <div>
              {data}
            </div>
            </>
           ) 
           : '목록에서 개별 요청건을 선택하면 상세 정보가 표시됩니다.'
      } */}
      
    </>
  );
}



















  //   return (
  //     <>
  //       <div>
  //         <h3>서비스 요청 상세 정보</h3>
  //       </div> 

  //        {
  //          data ? (
  //           <>
  //           <div>
  //              test: {(test : ServiceTableModel) => (<>{test.cnts}</>)}

  //           </div>
  //             <div>
  //               {'상태'} {'서비스 제목'} 
  //               <button>수정</button>
  //             </div>
  //             <div>
  //                 <div>
  //                   요청자 : {'요청자명'}
  //                   시스템 : {'시스템명 ex:중소벤처24'}
  //                   요청일 : 
  //                   <p>
  //                     내용 : 
  //                   </p>
  //                 </div>
  //                 <div>
  //                   첨부파일
  //                 </div>
  //             </div>
  //             <div>
  //               서비스 관리
  //               유형 
  //             </div>
  //             </>
  //         ) : '목록에서 개별 요청건을 선택하면 상세 정보가 표시됩니다.'
  //       }
        
  //     </>
  //   );
  // }




export default ServiceDetailComponent;
