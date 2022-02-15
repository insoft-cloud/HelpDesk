import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";


/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2022-02-14
 * @author      : 김지인
 * @description : 서비스 상세조회 컴포넌트
 */


function ServiceDetailComponent ( {id} ){

   const [data, setData] : any = useState({});
  const state = useTokenState();


  useEffect(() => {
    if(id != null){
    axios.get('/user/service/request/'+ id, {
    headers: {
      'Content-Type' : "application/json",
      'X-AUTH-TOKEN' : state.token + ""
        }
      })
    .then( function(res){
      setData(res.data)
    })
      .catch(error => {
      console.log(error)
    })
  } }, [id])

  return ( 
    <div className="card-body">
      
    
         {
         data.id != null ? (
          <>
                  <div className="d-flex justify-content-between">
                  <h5>
                     <span className="fs-xs text-primary-desat mr10">
                        [{data.requestHistories[0].sttsCd === 'n' 
                        ? '신규' 
                        : (data.requestHistories[0].sttsCd === 's'
                        ? '완료'
                        : (data.requestHistories[0].sttsCd === 't'
                        ? '진행'
                        : '보류')) }]</span>
                        {data.ttl} </h5>
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


export default ServiceDetailComponent;
