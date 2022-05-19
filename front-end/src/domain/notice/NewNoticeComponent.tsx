import { procGetAxios, procPostAxios } from "axios/Axios";
import TittleComponent from "component/div/TittleComponent"
import QuillEditorComponent from "component/qill/QuillEditorComponent"
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import {AuthCode, CodeDetail} from "utils/AdminCode";
import { txtAlert, txtButton } from "utils/CommonText";
import { API_DOMAIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";


/**
 * @Project     : HelpDesk
 * @FileName    : NewNoticeComponen.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 공지사항 등록 화면 컴포넌트
 */

function NewNoticeComponent() {

    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const navigate = useNavigate();
    const [contentType] = useState("application/json");

    const quillRef = useRef<ReactQuill>();

    const [ttl, setTtl] = useState('');
    const [cnts, setCnts] = useState<string>("");
    const [category, setCategory] = useState('default');

    const [file, setFile] : any = useState([]);

    const [notiAdminCd, setNotiAdminCd] : any = useState([])


    useEffect(() => {
        if(state.auth!==AuthCode.Admin){
            alert('접근 권한이 없습니다.');
            navigate(ContextPath(API_DOMAIN_PATH.notice));
        }
        dispatch({ type: 'SET_PAGE', page: "NewNotice", actTime: new Date().getTime().toString()});
        procGetAxios("admin/group/"+CodeDetail.notice+"/details",state.token,"application.json", notiAdminCode)
    }, []);

    function close(){
        navigate(ContextPath(API_DOMAIN_PATH.notice));
    }

    function notiAdminCode(data){
        setNotiAdminCd(data.content)
        console.log(data)
    }

    function saveHandler(e){
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
        if(category === 'default'){
            alert('카테고리를 선택해주세요.')
            return
        }
        if(ttl.length > 128){
            alert(txtAlert.overTtl)
            return
        }

        let postData = {
            userId : state.user,
            userName : state.name,
            ctgrycd : category,
            ttl : ttl,
            cnts : cnts,
            rdcnt : 0
        }
        procPostAxios("/user/notice", state.token, contentType, postData, ok, error )    
    }
    function ok(e){
        alert(txtAlert.newNotice)
        navigate(ContextPath(API_DOMAIN_PATH.notice));

        if(file.length > 0){
        const formData = new FormData();
            for(let i=0; i<5; i++){
                formData.append('files', file[i])
            }

        procPostAxios("/user/notice/"+e.id+"/attach", state.token, contentType, formData, postData, error) 
        }
    }
    function postData(){
    }
    function error(){
        console.log('error')
    }
    const handleFileSelect = (e) => {

        let str = e.target.files[0].name
        let pattern =   /[\{\}\/?,;:|*~`!^\+<>@\#$%&\\\=\'\"]/gi;
        
        if(pattern.test(str) ){
    //        alert('파일명에 특수문자를 제거해주세요.');
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
    function delectFile(name){
        setFile(file.filter(id => id.name !== name))
    }

  return (
    <section>
        <TittleComponent tittle="공지사항" subTittle="중소벤처24 헬프데스크 공지입니다." />
        <div className="container d-flex flex-column">
                <div className="row align-items-center mb-3 mt-6 justify-content-center">
                    <div  className="d-flex card shadow p-5">
                    <div className="form-floating">

                <div className="mb-4">
                    <label className="form-label">제목</label>
                    <input type='text' className="form-control" name="ttl" value={ttl} onChange={e => setTtl(e.target.value)} placeholder='제목을 입력해주세요.'></input>
                </div>
                <div className="mb-3">
                <div>
                <label className="form-label">카테고리</label>
                </div>
                {notiAdminCd.map(a =>
                <span className="p-3" key={a.id}>
                        <input className="m-1"  name="category" type='radio' value={a.cdId} onClick={ e=> setCategory(a.cdId) } ></input>
                        <label>{a.name}</label>
                </span>
                )}
                 </div>    
                <div className="mb-3">
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
                <button type='reset' className="btn btn-secondary btn-sm m-1" onClick={close}>{txtButton.cancel}</button>
                 <button className="btn btn-primary btn-sm" onClick={saveHandler} >{txtButton.save}</button>
                </div>
             </div>
             </div>
            </div>
         </div> 
    </section>
  )
}
export default NewNoticeComponent
