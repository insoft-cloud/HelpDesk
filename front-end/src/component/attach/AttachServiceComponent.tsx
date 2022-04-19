import axios from 'axios'
import { procGetAxios } from 'axios/Axios';
import React, { useEffect, useState } from 'react'
import { useTokenState } from 'utils/TokenContext';

export default function AttachServiceComponent({rqstId}) {

    
  const [contentType] = useState("application/json");
  const state = useTokenState();  
  const [attach, setAttach] : any = useState([]);

  useEffect(() => {
    procGetAxios("/user/service/request/"+rqstId+"/attach", state.token, contentType, setData)
}, [rqstId])

function setData(data) {
    setAttach(data.content)
}

function Handler(filename) {

  axios.get("/user/service/request/"+ rqstId +"/attach/download?fileName="+filename, {
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
            {attach.map((a, index) => (<button onClick={() => Handler(a.fileNm)} className="btn btn-link" key={a.id}>{a.fileNm}</button>))}
        </div>
    </>
  )
}


