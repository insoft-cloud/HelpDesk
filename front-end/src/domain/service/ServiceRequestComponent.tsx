import { procPostAxios } from "axios/Axios";
import SystemNameComponent from "component/select/SelectComponent";
import TittleComponent from "component/div/TittleComponent";
import QuillEditorComponent from "component/qill/QuillEditorComponent";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { API_DOMAIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import SelectComponent from "component/select/SelectComponent";
import {AuthCode, CodeDetail} from "utils/AdminCode";
import {txtAlert, txtBlock} from "utils/CommonText";


/**
 * @Project     : HelpDesk
 * @FileName    : ServiceRequestComponent.tsx
 * @Date        : 2022-02-18
 * @author      : 김지인
 * @description : 서비스요청 작성 화면 컴포넌트
 */


function ServiceRequestComponent () {
    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const navigate = useNavigate();
    const [contentType] = useState("application/json");
    const [ttl, setTtl] = useState('');
    const [cnts, setCnts] = useState<string>("");
    const [tyCd, setTyCd] = useState("default");
    const [sysCd, setSysCd] = useState("default");

    const [file, setFile] : any = useState([]);

    const tyCdChange = (e) => {
        const value = e.value;
        setTyCd(value)
    }
    const sysCdChange = (e) => {
        const value = e.value;
        setSysCd(value)
    }

    useEffect(() => {
                dispatch({ type: 'SET_PAGE', page: "ServiceRequest", actTime: new Date().getTime().toString()});
        if(state.auth===AuthCode.superAdmin){
            alert(txtBlock.authBlock);
            navigate(ContextPath(API_DOMAIN_PATH.main));
        }
            }, []);

    const quillRef = useRef<ReactQuill>();

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
        if(file.length < 5){
            if(e.target.files[0] != null){
                    setFile(file.concat(e.target.files[0]))
                }
        } else{
            alert('첨부파일은 최대 5개까지 첨부할 수 있습니다.')
            return
        }
    }       
}    
 
 function close(){
    navigate(ContextPath(API_DOMAIN_PATH.main));
}

function changeHandler (e) {
    e.preventDefault();


    let  pattern = /\s/g
    let checkCnts = cnts?.replace(pattern, '')

    
    if(ttl === '' || ttl?.replace(pattern, '')==='' ){
        alert(txtAlert.emptyTtl)
        return
    }
    if(checkCnts?.replace(/(<([^>]+)>)/gi, '') === ''){
        alert(txtAlert.emptyCnts)
        return
    }
    if(sysCd === "default"){
        alert(txtAlert.emptySysCd)
        return
    }
    if(tyCd === "default"){
        alert(txtAlert.emptyTyCd)
        return
    }
    if(ttl.length > 128){
        alert(txtAlert.overTtl)
        return
    }
    
    let postData ={
        cnts : cnts,
        delYn : false,
        sysCd : sysCd,
        tyCd : tyCd,
        prcsSttsCd : "open", 
        ttl : ttl,
        reqId : state.user,
        reqNm : state.name
      }

       procPostAxios("/user/service/request", state.token, contentType, postData, ok, error )
      
}

function ok(e) : void {

    alert("서비스 요청이 제출되었습니다.");
    navigate(ContextPath(API_DOMAIN_PATH.main));

    if(file.length > 0){
    const formData = new FormData();
        for(let i=0; i<5; i++){
        formData.append('files', file[i])
        }
    procPostAxios("/user/service/request/"+e.id+"/attach", state.token, contentType, formData, postData, error) 
    }
}

function postData(){
}

function error (){
    console.log(error)
}

function delectFile(name){
    setFile(file.filter(id => id.name !== name))
}

    return (
        <section>
             <TittleComponent tittle={"서비스 요청 작성"} subTittle={"서비스 오류,장애,기능 개선 등의 요청 사항을 신청할 수 있습니다."}/>
        
             <div className="container d-flex flex-column">
                <div className="row align-items-center mb-3 mt-6 justify-content-center">
                    <div  className="d-flex card shadow p-5">
                    <div className="form-floating">
                <div className="mb-4">
                    <label className="form-label">요청자</label>
                    <input type='text' className="form-control" value={state.name} readOnly></input>
                </div>
                 <div className="mb-4">
                    <SelectComponent onChange={tyCdChange} urlData={CodeDetail.tyCd} labelName="유형" />        
                 </div>
                 <div className="mb-4">
                    <SystemNameComponent onChange={sysCdChange} urlData={CodeDetail.sysCd} labelName="시스템명" />            
                </div>
                <div className="mb-4">
                    <label className="form-label">제목</label>
                    <input type='text' className="form-control" placeholder="제목을 입력해주세요." name="ttl" value={ttl} onChange={e => setTtl(e.target.value)}></input>
                </div>
                <div className="mb-4">
                    <label className="form-label">내용</label>
                    <QuillEditorComponent quillRef={quillRef} content={cnts} setContent={setCnts} />                 
                </div>
                <div>
                <label className="btn-link">
                    <input type='file' id='file' onChange={handleFileSelect} style={{display:"none"}} />
                    + 파일 및 이미지 첨부
                    <span className="text-gray-800">(최대 5개까지 첨부할 수 있습니다.)</span>
                    <div className="text-black"></div>
                </label>
                <div>
                    {file.map( (a, index) =>  <div key={index}>{a.name}<span className='btn fe fe-x' onClick={ () => delectFile(a.name)}></span></div> )}
                </div>
                </div>
                <div className="card-footer pt-0 mt-5 mb-3 text-end">
                 <button type='reset' className="btn btn-secondary btn-sm m-1" onClick={close}>취소</button>
                 <button onClick={changeHandler} className="btn btn-primary btn-sm">제출</button>
                </div>
             </div>
             </div>
            </div>
         </div> 
        </section>
    );
}
export default ServiceRequestComponent;

