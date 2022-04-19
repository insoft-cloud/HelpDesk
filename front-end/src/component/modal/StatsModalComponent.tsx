import DayButtonComponent from 'component/button/DayButtonComponent'
import {  BarChart, DoughnutChart, LeftBarChart } from 'component/chart/ChartComponent';
import { CountComponent } from 'component/service/ServiceCountComponent';
import moment from 'moment';
import "component/modal/Modal.css";
import { AuthCode, CodeDetail } from 'utils/AdminCode';
import { useEffect, useState } from 'react';
import { useTokenState } from 'utils/TokenContext';
import { procGetAxios } from 'axios/Axios';
import { txtDiv } from 'utils/CommonText';

export default function StatsModalComponent({rqstId, open, close, url, day, setDay}) {
    // const [day, setDay] = useState('?day=week');
    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');
    const state = useTokenState();
    const [contentType] = useState("application/json");

    const [tyCdCount, setTyCdCount] : any = useState([])
    const [sysCdCount, setSysCdCount] : any = useState([]);
    const [rqstNumCount, setRqstNumCount ] : any = useState([]);
    const [prcsSttsCdCount, setPrcsSttsCdCount ] : any = useState([]);

    const auth = sessionStorage.getItem("auth");

    let sysCdSubData;
    let tyCdSubData;
    let subData;

    useEffect( () => {

    if(url === 'serviceAll'){
      if( auth === AuthCode.superAdmin || auth === AuthCode.Admin) {
      procGetAxios("user/service/request/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
      procGetAxios("user/service/request/rqstId/count"+day, state.token, contentType, getRqstCountData)
      procGetAxios("user/service/request/sysCd/count"+day, state.token, contentType, getSysCdCountData)
      procGetAxios("user/service/request/tyCd/count"+day, state.token, contentType, geTyCdCountData)
      
      } else {
        procGetAxios("user/service/request/"+state.user+"/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
        procGetAxios("user/service/request/"+state.user+"/rqstId/count"+day, state.token, contentType, getRqstCountData)
        procGetAxios("user/service/request/"+state.user+"/sysCd/count"+day, state.token, contentType, getSysCdCountData)    
        procGetAxios("user/service/request/"+state.user+"/tyCd/count"+day, state.token, contentType, geTyCdCountData)
      }
    }
    if(url === 'myWork'){
      procGetAxios("user/service/request/"+state.user+"/charge/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
      procGetAxios("user/service/request/"+state.user+"/charge/sysCd/count"+day, state.token, contentType, getSysCdCountData)
      procGetAxios("user/service/request/"+state.user+"/charge/rqstId/count"+day, state.token, contentType, getRqstCountData)
      procGetAxios("user/service/request/"+state.user+"/charge/tyCd/count"+day, state.token, contentType, geTyCdCountData)
    }
  }, [day, url]);

    function getPrcsSttsCdCountData(data){
      setPrcsSttsCdCount(data)
      // subData = data
      // procGetAxios("admin/group/"+CodeDetail.prcsSttsCd+"/details",state.token,"application.json", prcsSttsCdAdminCode)
    }
    function getSysCdCountData(data){
      sysCdSubData = data
      procGetAxios("admin/group/"+CodeDetail.sysCd+"/details",state.token,"application.json", sysCdAdminCode)
    }
    function getRqstCountData(data){
      setRqstNumCount(data)
    }
    function geTyCdCountData(data){
      tyCdSubData = data
      procGetAxios("admin/group/"+CodeDetail.tyCd+"/details",state.token,"application.json", tyCdAdminCode)
    }
    
    function prcsSttsCdAdminCode(data){
      subData.forEach(tab => {        
        data.content.forEach(e => {
            if(tab.prcs_stts_cd===e.cdId){
                tab.prcs_stts_cd = e.name;
            }
        })
      })
      setPrcsSttsCdCount(subData)
    }
    function sysCdAdminCode(data){
      sysCdSubData.forEach(tab => {        
        data.content.forEach(e => {
            if(tab.sys_cd===e.cdId){
                tab.sys_cd = e.name;
            }
        })
      })
      setSysCdCount(sysCdSubData)
    }
    function tyCdAdminCode(data){
      tyCdSubData.forEach(tab => {        
        data.content.forEach(e => {
            if(tab.ty_cd===e.cdId){
                tab.ty_cd = e.name;
            }
        })
      })
      setTyCdCount(tyCdSubData)
    }      
    
  return (
    <>
    <div className={open?'openModal modal' : 'modal'}>
    { open ? (
       <div className="modal-dialog modal-lg modal-dialog-centered" style={{maxWidth:"1000px", height:"80vh" }} role="document">
        <div className="modal-content">
            <div className="modal-body">
            
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
         
            <h3 className="fw-bold mb-3 " >
              서비스 통계
            </h3>
                 
                 <div className="fs-sm">
                 {nowTime} 업데이트
                 </div>
                 <div className="d-flex align-items-center justify-content-end mb-5">

                 <DayButtonComponent day={day} setDay={setDay}/>
               </div>



            <div className="d-flex card shadow mb-5">
              <div className="card-body pt-4"> 
              <h4 className="fw-bold text-center">서비스 진행 사항</h4>

                <CountComponent data={prcsSttsCdCount}/>



              </div>
              </div>

              <div className="card shadow mb-5">
                <div className="card-body">
                  <h4>요청 건수</h4>
                  { rqstNumCount.length === 0 ? <div> {txtDiv.zeroData} </div>
                    :  <BarChart count={rqstNumCount.map(a => a.count)} labels={rqstNumCount.map(a => a.regist)}/>
                  }
                </div>
              </div>
            <div className="row">
             
              
              <div className="col-12 col-md-12 mb-5">
                
                <div className="card shadow">
                  <div className="card-body">
                    <h4>기관별 빈도</h4>
                    {sysCdCount.length === 0 ? <div> {txtDiv.zeroData} </div>
                    : <LeftBarChart count={sysCdCount.map(a => a.count)} labels={sysCdCount.map(a => a.sys_cd)}/>
                    }
                  </div>
                </div>

              </div>

               <div className="col-12 col-md-6 mb-5">

                <div className="card shadow">
                  <div className="card-body">
                    <h4>유형 분류</h4>
                    {tyCdCount.length === 0 ? <div>{txtDiv.zeroData}</div>
                    : <DoughnutChart count={tyCdCount.map(a => a.count)} labels={tyCdCount.map(a => a.ty_cd)}/>
                    } 
                  </div>
                </div>

              </div>
              
              <div className="col-12 col-md-6 mb-5">
                
                <div className="card shadow">
                  <div className="card-body">
                    <h4>서비스 처리 시간</h4>
                    <div>
                      chart
                     
                    </div>
                  </div>
                </div>                
              </div>              
            </div>

            </div>
            </div>
        </div>

    ) : null}
        </div>
    </>
    )
} 
