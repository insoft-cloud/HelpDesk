import { procGetAxios, procPostAxios } from 'axios/Axios';
import AttachHistoryComponent from 'component/attach/AttachHistoryComponent';
import QuillEditorComponent from 'component/qill/QuillEditorComponent'
import moment from 'moment';
import React, { useEffect, useRef, useState} from 'react'
import {AuthCode, CodeDetail} from 'utils/AdminCode';
import { txtAlert } from 'utils/CommonText';
import { useTokenState } from 'utils/TokenContext';
import sendEms from "../../../utils/SendEms";
import sendUms from "../../../utils/SendUms";

/**
 * @Project     : HelpDesk
 * @FileName    : ServiceComentComponent.tsx
 * @Date        : 2022-02-25
 * @author      : 김지인
 * @description : 서비스 상세 > 진행사항 및 코멘트 컴포넌트
 */


export default function ServiceComentComponent({rqstId, check}) {
    // EMS Object
    let obj_EMS: { reqTyCd: string; authDate: string; mailType: string; reqTitle: string; reqChargeName: string; tmpPwd: string; idList: any, userName: string, stats: string, comment: string};
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
        stats : "", // 상태(hold/complete)

        // mailType 이 comment (댓글 등록) 일 때 필수 입력 값
        comment : "" // 댓글 내용
    }

    // SMS Object
    let obj_SMS: { reqTyCd: string; stats: string; smsType: string; reqTitle: string; reqChargeName: string; comment: string; idList: any};
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

    const [rqstData, setRequestData] = useState({})
    const chargesList = useRef([])

    const [cnts, setCnts] : any = useState();
    const ref : any  = useRef(null);
    const [contentType] = useState("application/json");
    const state = useTokenState();  

    const [comentData, setComentData] : any = useState([]);
    const [edit, setEdit] = useState(false);
    const [checkId, setCheckId] = useState();
    const auth = state.auth;

    const [msg, setMsg] = useState<String>();
    const [file, setFile] : any = useState();
    const [fileNm, setFileNm] :any = useState(null);

    const [size, setSize] = useState(20);

    const extractTextPattern = /(<([^>]+)>)/gi; //태그제거 정규식
    let sub_rqstData;


    useEffect(() => {
        if(rqstId != null){
          setCnts('')
          procGetAxios('/user/service/request/'+ rqstId +"/histories?sort=registDt&size="+size, state.token, contentType, setData)
          procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setRequestInfoData)
          procGetAxios('/user/service/request/chargeList/' + rqstId, state.token, contentType, setChargePersonList)
      }
    }, [rqstId, edit, checkId, size, check])

    function getData(){
      procGetAxios('/user/service/request/'+ rqstId +"/histories?sort=registDt&size="+size, state.token, contentType, setData)
    }
    function setData(data){
      setSize(data.totalElements)
      setComentData(data.content)
    }

    function setRequestInfoData(data) {
        sub_rqstData = data;
        procGetAxios('/admin/group/'+CodeDetail.tyCd+'/details',state.token, contentType, setPrcsData)
    }

    function setChargePersonList(data) {
        chargesList.current = data
    }

    function setPrcsData(data) {
        data.content.forEach(a => {
            if(sub_rqstData['tyCd']===a.cdId){
                sub_rqstData['tyCd'] = a.name;
            }
        })
        setRequestData(sub_rqstData)
    }
    
function onClickSave(e){

    let arr = cnts.split('data-id="');
    let mentions:any[] = [];
    arr.map((e,i)=>{
        if(i!==0){
            let text = e.toString();

            mentions.push(e.substring(0,text.indexOf("\">﻿<span")))
        }
    })
    let filterCnts;
    let text = cnts.toString(0);
    let newText = "";
    if (text.indexOf("/span>﻿</span") > -1) {
        let fist = -1;
        while (text.indexOf("/span>﻿</span") > -1) {
            if (fist === -1) {
                newText += text.substring(3, text.indexOf("<span"));
                fist += 1;
            }
            text = text.substring(text.indexOf("/span>﻿</span") + 14, text.length);
            if (text.indexOf("/span>﻿</span") === -1) {
                // newText += text.substring(0,text.indexOf("</span"))
                newText += text.substring(0, text.indexOf("</p"))
                filterCnts = newText;
                break;
            }
            newText += text.substring(0, text.indexOf("<span class=\"mention\""));
        }
    } else {
        filterCnts = text.replace(extractTextPattern,"")
    }
    obj_EMS.mailType = "comment"
    obj_EMS.idList.push(rqstData['reqId'])
    chargesList.current.map(i => {
        obj_EMS.idList.push(i)
    })
    obj_EMS.reqTyCd = rqstData['tyCd']
    obj_EMS.reqTitle = rqstData['ttl']

    obj_SMS.smsType = "comment"
    obj_SMS.idList.push(rqstData['reqId'])
    mentions.map(e=>{
            obj_SMS.idList.push(e)
            obj_EMS.idList.push(e)
        })
    chargesList.current.map(i => {
        obj_SMS.idList.push(i)
    })

    obj_SMS.reqTyCd = rqstData['tyCd']
    obj_SMS.reqTitle = rqstData['ttl']
        e.preventDefault();
    
  
      if(file === null || file === undefined ){
        let  pattern = /\s/g;
        let checkCnts = cnts?.replace(pattern, '')
        
        if(checkCnts?.replace(/(<([^>]+)>)/gi, '') === '' || checkCnts === ''){
          alert('내용을 입력해주세요.')
          return
        }
      }
        let postData={
          inputMsg : cnts,
          userId : state.user,
          userNm : state.name
        }

        if(typeof cnts === "string") {
            obj_EMS.comment = filterCnts
            obj_SMS.comment = filterCnts.replace(extractTextPattern,'')
        } else {
            obj_EMS.comment = ""
            obj_SMS.comment = ""
        }
        procPostAxios('/user/service/request/'+rqstId + '/history', state.token, contentType, postData, postAttachData, error);
         sendEms(obj_EMS, state, contentType)
         sendUms(obj_SMS, state, contentType)
}

function postAttachData(e){

  if(file){
    const formData = new FormData();
    formData.append('file', file)        

  procPostAxios("/user/service/request/charge/history/"+e.id+"/attach", state.token, contentType, formData, ok, error) 

  }
  else{
    getData()
    setCnts('')
  }
} 
function error(){
  console.log('error')
}

function clickDelete(hisId){
  procGetAxios('/user/service/request/charge/history/'+hisId+'/attaches', state.token, contentType, getAttachId )
  function getAttachId(data){
    if(data.content.length > 0){
    let attachId = data.content[0].id;
    let delectAttach;
      procPostAxios('/user/service/request/charge/history/attache/'+attachId+'/del', state.token, contentType, delectAttach, getData, error )   
  }   
}
    let postData={
      id : hisId,
      delYn : true
    }
    procPostAxios('/user/service/request/history/'+hisId, state.token, contentType, postData, postDelete, error)
}

function ok(){
  setFile(null)
  setCnts('')
  getData()
}

function onClickUpdate(hisId){
  let  pattern = /\s/g
  let checkMsg = msg?.replace(pattern, '')

  if(checkMsg?.replace(/(<([^>]+)>)/gi, '') === ''){
    alert('내용을 입력해주세요.')
    return
  }
  let postData={
    id : hisId,
    inputMsg : msg
  }
  procPostAxios('/user/service/request/history/'+hisId,  state.token, contentType, postData, postUpdate, error )
 } 

function postUpdate(){
  getData()
  alert(txtAlert.edit)
  setEdit(false)        
}
function postDelete(){
  getData()
  alert(txtAlert.delete)
  setEdit(false)        
}


const handleFileSelect = (e) => {

  let str = e.target.files[0].name
  let pattern =   /[\{\}\/?,;:|*~`!^\+<>@\#$%&\\\=\'\"]/gi;
    if(pattern.test(str) ){
        alert("파일명에 허용된 특수문자는 '-', '_', '(', ')', '[', ']', '.' 입니다.");
        return
    }

    let ext =  str.split('.').pop().toLowerCase();
    let extSecurity = ['asp', 'aspx', 'htm', 'html', 'asa', 'phtml', 'php', 'php3', 'php4', 'php5', 'inc', 'jsp', 'jspx', 'jsw', 'jsv', 'jspf', 'pl', 'pm', 'cgi', 'lib', 'cfm', 'cfml', 'cfc', 'dbm' ] 
    
    if(extSecurity.includes(ext)) {
        alert(ext+'파일은 업로드 하실 수 없습니다.');
        return        
    } else {
      let eventFile : any = e.target.files[0]
        setFile(eventFile)
      let filename = e.currentTarget.files;
        setFileNm(filename[0].name)
    }       
  }   
  const onClickEdit = (id) => { 
    setEdit(true)
    setCheckId(id)
  };

  return (
    <>
    {check > 0 ? (<>
              <div className="mt-5">
                <div className="card card-bleed shadow-light-lg mb-6">
                  <div className="card-header">    
                    <h4 className="mb-0">
                      진행 사항 및 코멘트 
                    </h4>
                  </div>
                  <div className="card-body pt-3">   
                    {comentData.map( (a, index) => 
                    <div key={index} className="row align-items-center py-3 border-bottom">
                      <div className="col-auto">
                        <div className="avatar avatar-xl">
                          <span className="avatar-title rounded-circle fs-sm">{a.userNm}</span>
                        </div>
                      </div>
                      <div className="col ms-n5">
                        <h6 className="text-uppercase mb-0">
                          {moment(a.registDt).format('YYYY-MM-DD HH:mm')}
                        </h6>
                         { edit && (state.user === a.userId || auth === AuthCode.Admin) && a.id === checkId ?
                          <QuillEditorComponent quillRef={ref} content={a.inputMsg} setContent={setMsg} />
                         :
                         <>
                        <div className="fs-sm text-muted border-white" dangerouslySetInnerHTML={{__html: a.inputMsg}} >
                        </div>
                        <AttachHistoryComponent hisId={a.id} />
                        </>
                        }
                      </div>
                      <div className="col-auto">                                                  
                          <div className="dropdown">
                          { (a.userId === state.user || auth === AuthCode.Admin) && a.rqstCd !== 'system' && a.rqstCd !== 'charge' && a.rqstCd !== 'complete' ?
                             edit && (state.user === a.userId || auth === AuthCode.Admin) && a.id === checkId ?
                             <>
                              <div>
                              <button className="btn btn-primary-soft btn-pill btn-xs mb-1" onClick={() => onClickUpdate(a.id)}>저장</button>
                              </div>
                              <button className="btn btn-secondary-soft btn-pill btn-xs mb-1" onClick={() => setEdit(false)}>취소</button>
                              </>
                              :
                          <>
                          <button className="btn btn-xs btn-rounded-circle btn-success" type="button" id="dropdownMenuExtraSmall" data-bs-toggle="dropdown">
                          <i className="fe fe-more-vertical"></i>
                          </button>
                            <div className="dropdown-menu dropdown-menu-xs" aria-labelledby="dropdownMenuExtraSmall">                       
                              <button className="dropdown-item" onClick={() =>onClickEdit(a.id)}>메세지 수정</button>                              
                              <button className="dropdown-item" onClick={() => clickDelete(a.id)}>메세지 삭제</button>
                            </div>
                            </>
                            : null}
                          </div>                                        
                      </div>
                    </div>                
                    )}                 
                    <div className="col-12 mt-5">
                      <div className="form-group">
                        <div data-quill='{"placeholder": "Quill WYSIWYG"}'>
                            <QuillEditorComponent quillRef={ref} content={cnts} setContent={setCnts}  />
                        </div>
                        <div>
                        <label className="btn-link">
                            <input type='file' id='file' onChange={ handleFileSelect} style={{display:"none"}} />
                            + 파일 및 이미지 첨부
                            <span className="text-gray-800">(최대 1개까지 첨부할 수 있습니다.)</span>
                            <div className="text-black"></div>
                        </label>
                         { file ?
                         <div>
                         <span>{fileNm}</span><span className='btn fe fe-x' onClick={ e => setFile(null) }></span>
                         </div>
                         : null }
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center mb-5">
                      <div className="col text-end text-gray-700 fs-sm">
                        
                      </div>
                      <div className="col-3 text-end">
                        <button className="btn btn-primary btn-sm" type="submit" onClick={onClickSave}>
                          저장
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              </> ) : null}
  </>
  )
}
