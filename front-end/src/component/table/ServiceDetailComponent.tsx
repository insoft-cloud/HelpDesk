import axios from "axios";
import { ServiceTableModel } from "interface/TableInterface";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";

function ServiceDetailComponent ( {id} ){

  
  // console.log('넘겨받는========='+id)

  // const matchId = data.find(function(data){ return data.id === id })

   const [data, setData] : any = useState({});
  const state = useTokenState();

  const [test, setTest] = useState();

  useEffect(() => {
    if(id != null){
//    axios.get(`/user/service/request/${id}`, {
    axios.get('/user/service/request/'+ id, {
    headers: {
      'Content-Type' : "application/json",
      'X-AUTH-TOKEN' : state.token + ""
        }
      })
    .then( function(res){
      setData(res.data)
      // console.log('전달 받는데이터=========')
      // console.log(res.data)
//        setTest(data.cnts)
      // console.log('test======'+data)
    })
      .catch(error => {
      console.log(error)
    })
  } }, [id])

  // const [obj] = [...Object.values({data})]
  console.log('전달 받는데이터=========')
  // console.log(obj)
    
  console.log({data})

  return ( 
    <div className="card-body">

      
    
         {
         data.id != null ? (
          <>
                  <div className="d-flex justify-content-between">
                    {/* 상태값 없으면 오류 나서 일단 주석처리 {data.requestHistories[0].sttsCd} */}
                  <h5><span className="fs-xs text-primary-desat mr10">[상태]</span> {data.ttl} </h5>
                  <button className="btn btn-success-soft btn-pill btn-xs mb-1">수정</button>
                  </div>
                  
                  <hr className="card-meta-divider mb-2" />

              
                  <hr className="card-meta-divider mb-2" />

                  <div className="fs-sm">

                   
                    <dl className="row mb-0">
                      <dt className="col-auto">요청자</dt>
                      <dd className="col-6 ms-n5"> {data.reqId} </dd>
                    </dl>
                    <dl className="row mb-0">
                      <dt className="col-auto">시스템</dt>
                      <dd className="col-6 ms-n5"> {data.sysCd} </dd>
                    </dl>
                    <dl className="row mb-0">
                      <dt className="col-auto">요청일</dt>
                      <dd className="col-6 ms-n5"> {moment(data.registDt).format("YYYY/MM/DD HH:MM")} </dd>
                    </dl> 

                    <hr className="card-meta-divider" />

                    <div className="m-3 pb-2">
                      {data.cnts}
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
