import { procGetAxios, procPostAxios } from 'axios/Axios';
import { SelectChangeComponent, SelectedComponent } from 'component/select/SelectComponent';
import ModalComponent from 'component/modal/ModalComponent';
import moment from 'moment';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useTokenState } from 'utils/TokenContext';
import { CodeDetail } from 'utils/AdminCode';
import { txtAlert } from 'utils/CommonText';
import sendUms from "../../../utils/SendUms";
import sendEms from "../../../utils/SendEms";


/**
 * @Project     : HelpDesk
 * @FileName    : ServiceDetailComponent.tsx
 * @Date        : 2022-02-21
 * @author      : 김지인
 * @description : 서비스 상세 > 서비스 관리 컴포넌트
 */

function ServiceManagmentComponent({rqstId, chId}) {
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
  const checked = useRef<HTMLInputElement>();
  const [isModalOpen,setIsModalOpen] = useState(false);

  useEffect(() => {
    if(rqstId != null){
    procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setData)
    if(chId !== '') {
    procGetAxios('/user/service/request/'+rqstId+"/charges" , state.token, contentType, getChargeData)
    }
  } 
}, [rqstId, chId, state.token, goalDt, setIsModalOpen, data.chrgprNm])


function getData(){
  procGetAxios('/user/service/request/'+ rqstId, state.token+"", contentType, setData)

  sendUms(obj_SMS, state, contentType)
  sendEms(obj_EMS, state, contentType)
}
function setData(data){
  setDetailData(data)
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

  }


function save(){
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
    inputMsg : '요청이 완료 되었습니다.',
    userId : state.user,
    userNm : state.name,
    delYn : false
  }
  procPostAxios('/user/service/request/'+ rqstId +'/history', state.token+"", contentType, hisData, getData, error )     
}
if( prcsSttsCd === "hold" ){

  let hisData ={
    inputMsg : '요청이 보류 되었습니다.',
    userId : state.user,
    userNm : state.name,
    delYn : false
  }
  procPostAxios('/user/service/request/'+ rqstId +'/history', state.token+"", contentType, hisData, getData, error )
}
  alert(txtAlert.save)

}        
function error (){
  console.log(error)
}

function deleteCharge(id){
  
  alert(txtAlert.deleteCharge)
  let chargeData ={
    delYn : true
  }
    procPostAxios('/user/service/request/charge/'+ id , state.token, contentType, chargeData, postChargeName, error )

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
                            <label className="form-label">유형</label>
                            <div className="col-auto ms-auto">
                            <SelectChangeComponent urlData={CodeDetail.tyCd}  onChange={tyCdHandler} data={data.tyCd}/>
                            </div>
                          </div>
                        </div>

                    
                        <div className="col-12 col-md-4">
                          <div className="form-group">
                            <label className="form-label" >우선순위</label>
                            <div className="col-auto ms-auto">
                            <SelectChangeComponent urlData={CodeDetail.prioritCd}  onChange={priortCdHandler} data={data.priortCd}/>
                            </div>
                          </div>
                        </div>

                       
                        <div className="col-12 col-md-4">
                          <div className="form-group">
                            <label className="form-label" >목표일</label>
                            <input className="form-control" type="date" id="date"  value={goalDt != null ? moment(goalDt).format('YYYY-MM-DD') : ( data.goalDt != null ? moment(data.goalDt).format('YYYY-MM-DD') : '' ) } onChange={gdtHandler} />
                          </div>
                        </div>

                        <hr className="card-meta-divider mb-2" />

                        <div className="col-12 mt-2">
                          <div className="form-group">
                            <h5>상태</h5>

                            <div className="row" >
                              <span className="col-2">
                                <input name="stts" type="radio" id="open" defaultChecked={ data.prcsSttsCd === 'open'} value='open' onChange={handler} />
                                <label className="" >신규</label>
                              </span>
                              <span className="col-2">
                              <input name="stts" type="radio" id="progress" defaultChecked={ data.prcsSttsCd === 'progress'}  value='progress' onChange={handler} />
                              <label className="" >진행</label>
                            </span>
                              <span className="col-2">
                              <input name="stts" type="radio" id="hold" defaultChecked={ data.prcsSttsCd === 'hold'}   value='hold'  onChange={handler}/> 
                              <label>보류</label>
                            </span>
                            <span className="col-2">
                              <input name="stts" type="radio" defaultChecked={ data.prcsSttsCd === 'complete'}  value='complete'  onChange={handler}/>
                              <label>완료</label>
                            </span>
                            </div>

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
                                    <th scope="col">담당자</th>
                                    <th scope="col">담당 조직</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  
                                    {chargeData.map((a, index) =>  
                                    <tr key={index}>
                                    <th scope="row" className="pt-4 text-center">{a.userNm}</th><td className="align-items-center">
                                        <label className="pt-2 mr10 d-flex justify-content-center"> <SelectedComponent urlData={CodeDetail.sysCd} select={a.agencyCode} /> &gt; {a.departmentName}</label>

                                      </td><td className='d-flex justify-content-center'><button className="btn btn-dark btn-xs align-items-center" onClick={() => deleteCharge(a.id)}>삭제</button></td>
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
                      <span className="text-end text-gray-700 fs-sm">
                        위의 입력한 서비스 관리 내용을 저장합니다.
                      </span>
                      
                      {/* <button className="btn btn-secondary btn-sm" type='reset'>
                        취소
                      </button> */}
                      
                      <button className="btn btn-primary btn-sm mx-2" onClick={onClickUpdate} >
                        저장
                      </button> 
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
