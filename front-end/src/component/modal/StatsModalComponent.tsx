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


/**
 * @Project     : HelpDesk
 * @FileName    : StatsModalComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 서비스요청 통계 모달 컴포넌트
 */


export default function StatsModalComponent({rqstId, open, close, url, day, setDay}) {
  
    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');
    const state = useTokenState();
    const [contentType] = useState("application/json");

    const [tyCdCount, setTyCdCount] : any = useState([])
    const [sysCdCount, setSysCdCount] : any = useState([]);
    const [rqstNumCount, setRqstNumCount ] : any = useState([]);
    const [prcsSttsCdCount, setPrcsSttsCdCount ] : any = useState([]);
    const [completeTime, setCompleteTime] : any = useState();
    const [completeTimeNum, setCompleteTimeNum] : any = useState();

    const auth = state.auth;

    let sysCdSubData;
    let tyCdSubData;

    useEffect( () => {

    if(url === 'serviceAll'){
      if( auth === AuthCode.Admin || auth === AuthCode.Manager) {
      procGetAxios("user/service/request/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
      procGetAxios("user/service/request/rqstId/count"+day, state.token, contentType, getRqstCountData)
      procGetAxios("user/service/request/sysCd/count"+day, state.token, contentType, getSysCdCountData)
      procGetAxios("user/service/request/tyCd/count"+day, state.token, contentType, getTyCdCountData)
      procGetAxios("user/service/request/completeTime"+day, state.token, contentType, getCompleteTimeData)
      
      } else {
        procGetAxios("user/service/request/"+state.user+"/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
        procGetAxios("user/service/request/"+state.user+"/rqstId/count"+day, state.token, contentType, getRqstCountData)
        procGetAxios("user/service/request/"+state.user+"/sysCd/count"+day, state.token, contentType, getSysCdCountData)    
        procGetAxios("user/service/request/"+state.user+"/tyCd/count"+day, state.token, contentType, getTyCdCountData)
        procGetAxios("user/service/request/"+state.user+"/completeTime"+day, state.token, contentType, getCompleteTimeData)

      }
    }
    if(url === 'myWork'){
      procGetAxios("user/service/request/"+state.user+"/charge/prcsSttsCd/count"+day, state.token, contentType, getPrcsSttsCdCountData)
      procGetAxios("user/service/request/"+state.user+"/charge/sysCd/count"+day, state.token, contentType, getSysCdCountData)
      procGetAxios("user/service/request/"+state.user+"/charge/rqstId/count"+day, state.token, contentType, getRqstCountData)
      procGetAxios("user/service/request/"+state.user+"/charge/tyCd/count"+day, state.token, contentType, getTyCdCountData)
      procGetAxios("user/service/request/"+state.user+"/charge/completeTime"+day, state.token, contentType, getCompleteTimeData)

    }
  }, [day, url]);

    function getPrcsSttsCdCountData(data){
      setPrcsSttsCdCount(data)
    }
    function getSysCdCountData(data){
      sysCdSubData = data
      procGetAxios("admin/group/"+CodeDetail.sysCd+"/details_list",state.token,"application.json", sysCdAdminCode)
    }
    function getRqstCountData(data){
      setRqstNumCount(data)
    }
    function getTyCdCountData(data){
      tyCdSubData = data
      procGetAxios("admin/group/"+CodeDetail.tyCd+"/details",state.token,"application.json", tyCdAdminCode)
    }
    function getCompleteTimeData(data){      
      if(data[0] === null){
        setCompleteTime('')
      } else {
        let avgData = data.map(a => a.justify_interval);
           setCompleteTime(avgData[0].replace('day', '일').replace('s','').slice(0, -10))
           if(avgData[0].replace('day', '').replace('s','').replace(':','').replace('  ', '').slice(0, -10) > 200){
             setCompleteTimeNum(200)
           } else if(avgData[0].replace('day', '').replace('s','').replace(':','').replace('  ', '').slice(0, -10) > 100){
            let text = parseInt(avgData[0].replace(':','').slice(2, -10));
            setCompleteTimeNum(text+60)
           } else{
           setCompleteTimeNum(avgData[0].replace(':','').slice(0, -10))
          }
      }      
    }
    function sysCdAdminCode(data){
      sysCdSubData.forEach(tab => {        
        data.forEach(e => {
            if(tab.sys_dvsn_cd===e.cdId){
                tab.sys_dvsn_cd = e.name;
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
                    : <LeftBarChart count={sysCdCount.map(a => a.count)} labels={sysCdCount.map(a => a.sys_dvsn_cd)}/>
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
                      {completeTime === '' ? <div>{txtDiv.zeroData}</div>
                    : 
                    <div>
                      <div>처리기간</div> 
                      <b>{completeTime}</b>
                      <div>                            
                      <progress value={completeTimeNum} max='120'/>
                      </div>               
                    </div> }
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
