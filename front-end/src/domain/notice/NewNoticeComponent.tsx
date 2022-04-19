import axios from "axios";
import { procGetAxios, procPostAxios } from "axios/Axios";
import TittleComponent from "component/div/TittleComponent"
import QuillEditorComponent from "component/qill/QuillEditorComponent"
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { CodeDetail } from "utils/AdminCode";
import { txtAlert, txtButton } from "utils/CommonText";
import { API_DOMAIN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";

function NewNoticeComponent() {

    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const navigate = useNavigate();
    const [contentType] = useState("application/json");
    
    const quillRef = useRef<ReactQuill>();

    const [ttl, setTtl] = useState('');
    const [cnts, setCnts] = useState<string>("");
    const [category, setCategory] = useState();
    const [check, setCheck] = useState(false);

    const [file, setFile] : any = useState();
    const [fileNm, setFileNm] :any = useState([]);

    const [notiAdminCd, setNotiAdminCd] : any = useState([])


    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "NewNotice"}); 
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

        if(category === null){
            alert('카테고리를 선택해주세요.')
            return
        }
        if(ttl === null){
            alert('제목을 채워주세요.')
            return
        }
        if(cnts === ''){
            alert('내용을 채워주세요.')
            return
        }
    
        if(check){
            let postData ={
                userId : state.user,
                userName : state.name,
                ctgrycd : category,
                ttl : ttl,
                cnts : cnts,
                ntcregistyn : 'Y',
                rdcnt : 0
            }
            procPostAxios("/user/notice", state.token, contentType, postData, ok, error )
        }else {
            let postData ={
                userId : state.user,
                userName : state.name,
                ctgrycd : category,
                ttl : ttl,
                cnts : cnts,
                ntcregistyn : 'N',
                rdcnt : 0
            }
            procPostAxios("/user/notice", state.token, contentType, postData, ok, error )
        }    
    }
    function ok(e){
        alert(txtAlert.newNotice)
        navigate(ContextPath(API_DOMAIN_PATH.notice));

        const formData = new FormData();
            for(let i=0; i<5; i++){
                formData.append('files', file[i])
            }

        procPostAxios("/user/notice/"+e.id+"/attach", state.token, contentType, formData, postData, error) 
    }
    function postData(){
    }
    function error(){
        console.log('error')
    }

    function test(e){
        if(e.target.checked){
            setCheck(true)
        }
        else{
            setCheck(false)
        }
    }

    const handleFileSelect = (e) => {
      
        if(e.target.files.length < 6){
            setFile(e.target.files)
    
            let filename = e.currentTarget.files;
    
             setFileNm( Array.from(filename).map( (a :any, index) => <div key={index}>{a.name}</div>) )
    
        } else{
            alert('첨부파일은 최대 5개까지 첨부할 수 있습니다.')
             setFile([])
        }
      }    

  return (
    <section>
        <TittleComponent tittle="공지사항" subTittle="중소벤처24 헬프데스크 공지입니다." />
        <div className="container d-flex flex-column">
                <div className="row align-items-center mb-3 mt-6 justify-content-center">
                    <div  className="d-flex card shadow">
                    <div className="form-floating">

                <div className="mb-3">
                    <label className="form-label">제목</label>
                    <input type='text' className="form-control" name="ttl" value={ttl} onChange={e => setTtl(e.target.value)} placeholder='제목을 입력해주세요.'></input>
                </div>
                
                <div>
                <label className="form-label">카테고리</label>
                </div>
                {notiAdminCd.map(a =>
                <span key={a.id}>
                        <input  name="category" type='radio' value={a.cdId} onClick={ e=> setCategory(a.cdId) } ></input>
                        <label>{a.name}</label>
                </span>
                )}    
                <div className="mb-3">
                    <label className="form-label">내용</label>
                    <QuillEditorComponent quillRef={quillRef} content={cnts} setContent={setCnts} />                                        
                </div>
                <div className="mb-3">
                    <input type='checkbox' onClick={e => test(e)}></input>
                    <label>중소벤처24 공지사항으로 등록</label>
                </div>
                <div>
                <label className="btn-link">
                    <input type='file' id='file' multiple onChange={handleFileSelect} style={{display:"none"}} />
                    + 파일 및 이미지 첨부
                    <span className="text-gray-800">(최대 5개까지 첨부할 수 있습니다.)</span>
                    <div className="text-black"></div>
                </label>
                <div>{fileNm}</div>
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