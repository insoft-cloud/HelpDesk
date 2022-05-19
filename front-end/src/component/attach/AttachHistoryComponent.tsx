import axios from 'axios'
import { procGetAxios } from 'axios/Axios';
import React, { useEffect, useState } from 'react'
import { useTokenState } from 'utils/TokenContext';

/**
 * @Project     : HelpDesk
 * @FileName    : AttachHistoryComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 이력(댓글) 첨부파일 다운로드 컴포넌트
 */

export default function AttachHistoryComponent({hisId}) {

    
  const [contentType] = useState("application/json");
  const state = useTokenState();  
  const [attach, setAttach] : any = useState([]);

  useEffect(() => {
    procGetAxios("/user/service/request/charge/history/"+hisId+"/attaches", state.token, contentType, setData)
}, [contentType, state.token, hisId])

function setData(data) {
    setAttach(data.content)
}

function Handler(filename) {

  axios.get("/user/service/request/charge/history/"+ hisId +"/attache/download?fileName="+filename, {
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

  return (
    <>
        <div>
            {attach.map((a) => (<div className="fs-sm text-primary" key={a.id}><span className='m110'>{a.fileNm}</span> <button type="button" onClick={() => Handler(a.fileNm)} className="btn btn-dark btn-xs mb-1"> 다운로드 </button></div>))}
        </div>
    </>
  )
}


