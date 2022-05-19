import axios from 'axios'
import { procGetAxios, procPostAxios } from 'axios/Axios';
import React, { useEffect, useState } from 'react'
import { useTokenState } from 'utils/TokenContext';


/**
 * @Project     : HelpDesk
 * @FileName    : AttachNoticeComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 공지사항 첨부파일 변경 & 다운로드 컴포넌트
 */

export default function AttachNoticeComponent({noticeId, edit}) {

    
  const [contentType] = useState("application/json");
  const state = useTokenState();  
  const [attach, setAttach] : any = useState([]);

  useEffect(() => {
    procGetAxios("/user/notice/"+noticeId+"/attach", state.token, contentType, setData)
}, [noticeId])

function setData(data) {
    setAttach(data.content)
}

function Handler(filename) {

  axios.get("/user/notice/"+ noticeId +"/attach/download?fileName="+filename, {
    responseType : 'blob',
    headers : {
     'Content-Type' : contentType,
     'X-AUTH-TOKEN' : state.token + ""
    }
  }).then(res => {
   const url = window.URL.createObjectURL(new Blob([res.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', filename);
   document.body.appendChild(link);
   link.click();
  }).catch()
 }

 function delectFile(attachId){
  let delectAttach;
  procPostAxios('/user/notice/attach/'+attachId+'/delete', state.token, contentType, delectAttach, test, error )   
 }

 function test(){
  procGetAxios("/user/notice/"+noticeId+"/attach", state.token, contentType, setData)
}

 function error(){
   console.log('error')
 }

 function handleFileSelect(e){




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
    if(attach.length < 5){
      if(e.target.files[0] != null){
                const formData = new FormData();                  
                    formData.append('files', e.target.files[0])
                procPostAxios("/user/notice/"+noticeId+"/attach", state.token, contentType, formData, updateData, error)               
          }
      } else{
          alert('첨부파일은 최대 5개까지 첨부할 수 있습니다.')
          return
      }
  }       
}   
function updateData(data){
  setAttach(attach.concat(data))
}

  return (
    <>
    {attach.length === 0 ? null :
      edit === false ?
      <>
      <dt className="col-auto">첨부파일</dt> 
        <div>
            {attach.map((a, index) => (<button onClick={() => Handler(a.fileNm)} className="btn btn-link" key={a.id}>{a.fileNm}</button>))}
        </div>
        </>
      : null}
      {edit === true ?
      <>
      <dt className="col-auto">첨부파일<span className=' text-danger'>(수정내역이 바로 적용됩니다.)</span></dt>
      <label className="btn-link">
        <input type='file' id='file' onChange={handleFileSelect} className="btn btn-link"  style={{display:"none"}} />
          + 파일 및 이미지 첨부
          <span className="text-gray-800">(최대 5개까지 첨부할 수 있습니다.)</span>
          <div className="text-black"></div>
          </label>
      {attach.map(((a, index) =>  <div key={index}>{a.fileNm}<span className='btn fe fe-x' onClick={ () => delectFile(a.id)}></span></div>)) }
        </>
        : null } 
    </>
  )
}


