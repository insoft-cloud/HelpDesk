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
      setData(res.data.id)
      console.log('전달 받는데이터=========')
      console.log(data)
//        setTest(data.cnts)
      // console.log('test======'+data)
    })
      .catch(error => {
      console.log(error)
    })
  }, [id])

      
  return ( 
    <div className="card-body">
      
        

       {
         data ? (
          <>
                  <div className="d-flex justify-content-between">
                    <h5><span className="fs-xs text-primary-desat mr10">[완료]</span> 서비스 요청 제목</h5>
                    <button className="btn btn-success-soft btn-pill btn-xs mb-1">수정</button>
                  </div>
                  
                  <hr className="card-meta-divider mb-2" />

              
                  <hr className="card-meta-divider mb-2" />

                  <div className="fs-sm">

                   
                    <dl className="row mb-0">
                      <dt className="col-auto">요청자</dt>
                      <dd className="col-6 ms-n5">요청자명 : {data} </dd>
                    </dl>
                    <dl className="row mb-0">
                      <dt className="col-auto">시스템</dt>
                      <dd className="col-6 ms-n5">중소벤처24</dd>
                    </dl>
                    <dl className="row mb-0">
                      <dt className="col-auto">요청일</dt>
                      <dd className="col-6 ms-n5">2022/01/11  13:22:02</dd>
                    </dl> 

                    <hr className="card-meta-divider" />

                    <div className="m-3 pb-2">
                      서비스 요청 내용입니다.
                      서비스 요청 내용입니다. 서비스 요청 내용입니다.
                      서비스 요청 내용입니다. 서비스 요청 내용입니다. 서비스 요청 내용입니다. 서비스 요청 내용입니다.
                      서비스 요청 내용입니다. 서비스 요청 내용입니다.
                      서비스 요청 내용입니다. 서비스 요청 내용입니다. 서비스 요청 내용입니다.
                    </div>
                    <hr className="card-meta-divider" />
                    <dl className="mb-0">
                      <dt className="col-auto">첨부파일</dt>
            
                    </dl>
                   
                  
                </div>
              </>
           ) 
           : '목록에서 개별 요청건을 선택하면 상세 정보가 표시됩니다.'
      }
      
    </div>
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
