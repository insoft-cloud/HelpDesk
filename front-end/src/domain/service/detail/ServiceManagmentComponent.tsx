import { procGetAxios, procPostAxios } from 'axios/Axios';
import { SelectedComponent } from 'component/select/SelectComponent';
import ModalComponent from 'component/modal/ModalComponent';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react'
import { useTokenState } from 'utils/TokenContext';
import { CodeDetail } from 'utils/AdminCode';
import { txtAlert, txtConfirm } from 'utils/CommonText';
import sendUms from "../../../utils/SendUms";
import sendEms from "../../../utils/SendEms";


/**
 * @Project     : HelpDesk
 * @FileName    : ServiceDetailComponent.tsx
 * @Date        : 2022-02-21
 * @author      : 김지인
 * @description : 서비스 상세 > 서비스 관리 컴포넌트
 */

function ServiceManagmentComponent({rqstId, chId, setCheck}) {
  // EMS Object
  let obj_EMS: { reqTyCd: string; authDate: string; mailType: string; reqTitle: string; reqChargeName: string; tmpPwd: string; idList: any; userName: string, stats: string };
  obj_EMS = {
      // 필수 입력 값
      mailType : "", // 메일 유형 (charge - 담당자 지정, pwdReset - 임시 비밀번호 발급, auth - 회원가입 승인, stats - 상태 변경(보류/완료))
      userName : "", // 사용자 이름
      idList : [], // 메일을 발송할 계정 목록 - 배열
      reqTyCd : "", // 유형 코드
      reqTitle : "", // 요청 제목

      // mailType 이 charge (담당자 지정) 일 때 필수 입력 값
      reqChargeName : "", // 담당자 이름

      // mailType 이 pwdReset (임시 비밀번호 발급) 일 때 필수 입력 값
      tmpPwd : "", // 임시 비밀번호

      // mailType 이 auth (회원가입 승인) 일 때 필수 입력 값
      authDate : "", // 승인 날짜

      // mailType 이 stats (상태 변경(보류/완료)) 일 때 필수 입력 값
      // 기획 상, 보류(hold) 또는 완료(complete) 상태일 때에만 메일이 발송되어야 합니다.
      stats : "" // 상태(hold/complete)
  }

  // SMS Object
  let obj_SMS: { reqTyCd: string; stats: string; smsType: string; reqTitle: string; reqChargeName: string; comment: string; idList: any };
  obj_SMS = {
    // 필수 입력 값
    smsType: "", // 문자 유형 (charge - 담당자 지정, comment - 댓글 등록, stats - 상태 변경(보류/완료))
    idList: [], // 문자를 발송할 계정 목록 - 배열
    reqTyCd: "", // 유형 코드
    reqTitle: "", // 요청 제목

    // smsType 이 charge (담당자 지정) 일 때 필수 입력 값
    reqChargeName: "", // 담당자 이름

    // smsType 이 comment (댓글 등록) 일 때 필수 입력 값
    comment: "", // 댓글 내용

    // smsType 이 stats (상태 변경(보류/완료)) 일 때 필수 입력 값
    // 기획 상, 보류(hold) 또는 완료(complete) 상태일 때에만 문자가 발송되어야 합니다.
    stats: "" // 상태(hold/complete)
  };


  const [data, setDetailData] : any = useState({});
  const state = useTokenState();
  // const ref = useRef<HTMLSelectElement>(null)
  
  const [contentType] = useState("application/json");
  const [prcsSttsCd, setStts] :any = useState();
  const [chargeData, setChargeData] : any = useState([]);
  const [chargeNm, setChargeNm] = useState([]);
  const [tyCd, setTyCd] = useState();
  const [priortCd, setPriortCd] = useState("");
  const [goalDt, setGoalDt] : any = useState();
  const [isModalOpen,setIsModalOpen] = useState(false);

  const [adminTyCd, setAdminTyCd] : any = useState();
  const [adminPriot, setAdminPriot] : any = useState([]);
  const [adminPrcs, setAdminPrcs] : any = useState([]);

  const [edit, setEdit] = useState(false);

  let sub_data;


  useEffect(() => {
    setEdit(false)
    if(rqstId != null){
    procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setData)
    if(chId !== '') {
    procGetAxios('/user/service/request/'+rqstId+"/charges" , state.token, contentType, getChargeData)
    }
  }
}, [contentType, state.token, rqstId, chId, state.token, data.chrgprNm, isModalOpen])


function getData(){
  procGetAxios('/user/service/request/'+ rqstId, state.token+"", contentType, setData)
  procGetAxios('user/service/request/'+ rqstId +"/histories/count", state.token, "application/json", setCount )

  sendUms(obj_SMS, state, contentType)
  sendEms(obj_EMS, state, contentType)  
}
function setCount(data){
  setCheck(data)
}
function setData(data){
  sub_data = data
  procGetAxios("admin/group/"+CodeDetail.prcsSttsCd+"/details",state.token,"application.json", prcsAdminCode)
}
function prcsAdminCode(data){

      data.content.forEach(e => {
          if(sub_data.prcsSttsCd===e.cdId){
            sub_data.prcsSttsCd = e.name;
          }
      })
setAdminPrcs(data.content)      
 procGetAxios("admin/group/"+CodeDetail.sysCd+"/details_list",state.token,"application.json", sysAdminCode)
}
function sysAdminCode(data){
      data.forEach(e => {
          if(sub_data.sysCd===e.cdId){
            sub_data.sysCd = e.name;
          }
      })
  procGetAxios("admin/group/"+CodeDetail.prioritCd+"/details",state.token,"application.json", prioritCdAdminCode)
}
function prioritCdAdminCode(data){
  
      data.content.forEach(e => {
          if(sub_data.priortCd===e.cdId){
            sub_data.priortCd = e.name;
          }
      })
  setAdminPriot(data.content);    
  procGetAxios("admin/group/"+CodeDetail.tyCd+"/details_list",state.token,"application.json", tyCdAdminCode)
} 
function tyCdAdminCode(data){
      data.forEach(e => {
          if(sub_data.tyCd===e.cdId){
            sub_data.tyCd = e.name;
          }
      })
  setDetailData(sub_data);
  setAdminTyCd(data.content)    
}

function getChargeData(data){
  setChargeData(data.content)
  setChargeNm(data.content.map(a => a.userNm))
}
const openModal= () => {
  setIsModalOpen(true);
}
const closeModal = () => {
  setIsModalOpen(false);
  getData();
  procGetAxios('/user/service/request/'+rqstId+"/charges" , state.token, contentType, getChargeData)
}
const handler = (e: ChangeEvent<HTMLInputElement>) : void => {
  setStts(e.currentTarget.value)
}
const priortCdHandler = (e) => {
  // e.preventDefault(); 
  const value = e.target.value;
  setPriortCd(value);
}
const tyCdHandler = (e) => {
  e.preventDefault();
  setTyCd(e.target.value);
}
const gdtHandler = (e) => {
  e.preventDefault();
  setGoalDt(e.target.valueAsDate);
}

function onClickUpdate(){

  let postData={
    id : rqstId,
    tyCd : tyCd,
    priortCd : priortCd,
    prcsSttsCd : prcsSttsCd,
    goalDt : goalDt
  }
   procPostAxios('/user/service/request/'+rqstId, state.token, contentType, postData, save, error)
   setEdit(false)
  }


function save(){
  getData()
  obj_SMS.smsType = "stats"
  obj_SMS.idList.push(data.reqId)
  obj_SMS.reqTyCd = data.tyCd
  obj_SMS.reqTitle = data.ttl
  obj_SMS.stats = prcsSttsCd

  obj_EMS.mailType = "stats"
  obj_EMS.userName = data.reqNm
  obj_EMS.idList.push(data.reqId)
  obj_EMS.reqTyCd = data.tyCd
  obj_EMS.reqTitle = data.ttl
  obj_EMS.stats = prcsSttsCd

    if( prcsSttsCd === "complete" ){
      let hisData ={
        inputMsg : '요청 상태가 <b>[완료]</b>로 변경되었습니다..',
        userId : state.user,
        userNm : state.name,
        delYn : false,
        rqstCd : 'complete'
      }
      procPostAxios('/user/service/request/'+ rqstId +'/history', state.token, contentType, hisData, getData, error )     
    }
    if( prcsSttsCd === "hold" ){
      let hisData ={
        inputMsg : '요청 상태가 <b>[보류]</b>로 변경되었습니다.',
        userId : state.user,
        userNm : state.name,
        delYn : false,
        rqstCd : 'system'
      }
      procPostAxios('/user/service/request/'+ rqstId +'/history', state.token, contentType, hisData, getData, error )
    }
    if( prcsSttsCd === "progress" ){
      let progressData ={
        inputMsg : '요청 상태가 <b>[진행]</b>으로 변경되었습니다.',
        userId : state.user,
        userNm : state.name,
        delYn : false,
        rqstCd : 'system'
      }
      procPostAxios('/user/service/request/'+ rqstId +'/history', state.token, contentType, progressData, getData, error )
    }
    if( prcsSttsCd === "open" ){
      let openData ={
        inputMsg : '요청 상태가 <b>[신규]</b>로 변경되었습니다.',
        userId : state.user,
        userNm : state.name,
        delYn : false,
        rqstCd : 'system'
      }
      procPostAxios('/user/service/request/'+ rqstId +'/history', state.token, contentType, openData, getData, error )
    }
      alert(txtAlert.save)
  }        
  function error (){
    console.log(error)
  }

  function deleteCharge(id, username){

    if (window.confirm(txtConfirm.deleteCharge)) {
      let postData = {
        inputMsg :  '<b>'+username+'</b> 님이 담당자에서 제외되었습니다.',
        userId : state.user,
        userNm : state.name,
        delYn : false,
        rqstCd : 'system'
      }
      procPostAxios('/user/service/request/'+ rqstId +'/history', state.token, contentType, postData, getData, error )

      let chargeData ={
        delYn : true
      }
        procPostAxios('/user/service/request/charge/'+ id , state.token, contentType, chargeData, postChargeName, error )
    }
  }
  function postChargeName(e){

    let result = chargeNm.length > 1 

    if(result){
          let check = data.chrgprNm === e.userNm
          if(check){
            let other = chargeNm.filter(name => name !== e.userNm)
            let postData = {
              chrgprNm : other[0]
              }
            procPostAxios('/user/service/request/'+rqstId, state.token + "", contentType, postData, getData, error)      
          }
      } else{      
        let postData = {
          chrgprNm : ''
          }
        procPostAxios('/user/service/request/'+rqstId, state.token + "", contentType, postData, getData, error)   
      }
      procGetAxios('/user/service/request/'+rqstId+"/charges" , state.token, contentType, getChargeData)
    }

  return (
    <div className="card card-bleed shadow-light-lg mb-6">

         {
         data.id != null ? (
          <>
            <div className="card-header">
              <h4 className="mb-0">
                서비스 관리 
              </h4>    
            </div>
            <div className="card-body">                
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label className="form-label"><h5>유형</h5></label>
                    <div className="col-auto ms-auto">
                    {edit ? 
                        <select className='form-select form-select-xs' size={1} aria-label="Default select example" onChange={tyCdHandler} defaultValue={data.tyCd}>
                        <option hidden value={data.tyCd}>{ data.tyCd == null ? '선택' : data.tyCd}</option>
                        {adminTyCd.map( (a  => 
                                  <option key={a.id} value={a.cdId}>{a.name}</option>
                            ))}
                        </select>
                    : <div className='badge badge-lg bg-primary-soft'>{data.tyCd}</div> }
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label className="form-label" ><h5>우선순위</h5></label>
                    <div className="col-auto ms-auto">
                    {edit ? 
                          <select className='form-select form-select-xs' size={1} aria-label="Default select example" onChange={priortCdHandler} defaultValue={(data.priortCd != null ? data.prioritCd : '')}>
                            <option hidden value={data.priortCd}>{ data.priortCd == null || data.priortCd === '' ? '선택' : data.priortCd}</option>
                              {adminPriot.map( (a  => 
                                    <option key={a.id} value={a.cdId}>{a.name}</option>
                                  ))}
                          </select>
                    : (data.priortCd == null || data.priortCd === '' ? <div className='badge badge-lg bg-dark'>우선순위가 없습니다.</div> :<div className='badge badge-lg bg-primary-soft'>{data.priortCd}</div>) }
                    </div>
                  </div>
                </div>                       
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label className="form-label" ><h5>목표일</h5></label>
                    <div className="col-auto ms-auto">
                    {edit ?
                    <input className="form-control" type="date" id="date"  value={goalDt != null ? moment(goalDt).format('YYYY-MM-DD') : ( data.goalDt != null ? moment(data.goalDt).format('YYYY-MM-DD') : '' ) } onChange={gdtHandler} />
                    : (data.goalDt == null ? <div className='badge badge-lg bg-dark'>목표일이 없습니다.</div> : <div className='badge badge-lg bg-primary-soft'>{moment(data.goalDt).format('YYYY-MM-DD')}</div>) }
                  </div>
                  </div>
                </div>
                <hr className="card-meta-divider mb-2" />
                  <div className="col-12 mt-2">
                    <div className="form-group">
                      <h5>상태</h5>
                      {edit ?
                      <div className="row" >
                        {adminPrcs.map( (a, index) => 
                          <>
                            <span className="col-2" key={index}>
                              <input name="stts" type="radio" defaultChecked={ data.prcsSttsCd === a.name} value={a.cdId} onChange={handler} />
                              <label className="" >{a.name}</label>
                            </span>
                          </>                           
                        )}
                      </div>
                      : <span><span className='badge badge-lg bg-primary-soft'>{data.prcsSttsCd}</span> 상태 입니다.</span> }
                    </div>
                  </div>
                  <hr className="card-meta-divider mb-2"/>
                  <div className="col-12 mt-2">
                      <div className="d-flex justify-content-between">
                        <h5>
                          담당자 지정
                        </h5>
                        <button className="btn btn-success-soft btn-pill btn-xs" onClick={ openModal } >
                          담당자 추가 <i className="fe fe-plus-circle"></i>
                        </button>
                          {isModalOpen && (<ModalComponent rqstId={rqstId} open={isModalOpen} close={closeModal} />)}
                      </div>
                      <div className="table-responsive mt-2">
                        {data.chrgprNm == null || data.chrgprNm === ''  ?
                        (<div>
                            *지정된 담당자가 없습니다.
                        </div>)
                        : 
                        <table className="table table-striped fs-sm border-top mb-0">
                          <thead>
                            <tr className="text-center">
                              <th></th>
                              <th scope="col">담당자</th>
                              <th scope="col">담당 조직</th>
                            </tr>
                          </thead>
                          <tbody>
                              {chargeData.map((a, index) =>  
                              <tr key={index}>
                                <td></td>
                              <th scope="row" className="pt-4 text-center">{a.userNm}</th>
                                <td className="align-items-center">
                                  <label className="pt-2 mr10 d-flex justify-content-center"> <SelectedComponent urlData={CodeDetail.sysCd} select={a.agencyCode} /> &gt; {a.departmentName}</label>
                                </td>
                                <td className='d-flex justify-content-center'><button className="btn btn-dark btn-xs align-items-center" onClick={(e) => deleteCharge(a.id, a.userNm)}>삭제</button></td>
                              </tr>
                              )}
                          </tbody>
                        </table>
                        }
                      </div>
                  </div>
                </div>            
            </div>
            <div className="card-footer pt-0">
            { chargeData.map( (a, index) => ( a.userId === state.user)
                ?
              <div key={index} className="align-items-center mb-5 text-end">
              { !edit ? <>
                <span className="text-end text-gray-700 fs-sm m-1">
                위의 입력한 서비스 관리 내용을 수정합니다.
              </span>       
                <button className="btn btn-success btn-sm" type='button' onClick={e => setEdit(true)}>
                  수정
                </button>
                </>
                : <>
                <span className="text-end text-gray-700 fs-sm m-1">
                  위의 입력한 서비스 관리 내용을 저장합니다.
                </span>
                <button className="btn btn-secondary btn-sm" type='button' onClick={e => setEdit(false)}>
                  취소
                </button>                      
                <button className="btn btn-primary btn-sm mx-2" onClick={onClickUpdate} >
                  저장
                </button>
                </> } 
              </div> 
                : null
              ) }
            </div>                                           
            </>
            ) 
            : <></>
        }
        </div>
    )      
}
export default ServiceManagmentComponent;
