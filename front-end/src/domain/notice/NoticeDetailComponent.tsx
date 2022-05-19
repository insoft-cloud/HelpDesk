import { procGetAxios, procPostAxios } from 'axios/Axios';
import AttachNoticeComponent from 'component/attach/AttachNoticeComponent';
import TittleComponent from 'component/div/TittleComponent';
import QuillEditorComponent from 'component/qill/QuillEditorComponent';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthCode, CodeDetail } from 'utils/AdminCode';
import { txtAlert, txtConfirm } from 'utils/CommonText';
import { API_DOMAIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenState } from 'utils/TokenContext';


/**
 * @Project     : HelpDesk
 * @FileName    : NoticeDetailComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 공지사항 상세조회 화면 컴포넌트
 */

export default function NoticeDetailComponent() {

  let { id } = useParams();
  const state = useTokenState();
  const [contentType] = useState("application/json");
  const auth = state.auth;
  const navigate = useNavigate();

  const [detlData, setDetl] :any = useState([]);
  const [category, setCategory] = useState();

  const [edit, setEdit] = useState(false);
  const [cnts, setCnts] = useState<string>();
  const [ttl, setTtl] = useState(detlData.ttl);
  const [notiAdminCd, setNotiAdminCd] : any = useState([])

  const ref : any  = useRef(null);

  let sub_data;
  let sub_ttl;

  useEffect( () => {
    procGetAxios('/user/notice/'+id, state.token, contentType, getData )

  }, [contentType, state.token, id, edit])

  function getData(data){
      sub_data = data
      procGetAxios("admin/group/"+CodeDetail.notice+"/details",state.token,"application.json", notiAdminCode)
  }
  function notiAdminCode(data){
    setNotiAdminCd(data.content)
    data.content.forEach(e => {
      if (sub_data.ctgrycd=== e.cdId){
        sub_data.ctgrycd = e.name;
            }
        })
        setDetl(sub_data)    
  }
  function onClickSave(){
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
    if(ttl.length > 128){
      alert(txtAlert.overTtl)
      return
    }
    let postData = {
      ttl : ttl,
      cnts : cnts,
      ctgrycd : category
    }
    procPostAxios('/user/notice/'+id, state.token, contentType, postData, completeEdit, error)
  }

  function delectNotice(){
    if(window.confirm(txtConfirm.delNotice)){
      let postData = {
        delYn : true
      }
      procPostAxios('/user/notice/'+id, state.token, contentType, postData, completeDel, error)
    }
  }
  function error(){
    console.log('error')
  }
  function completeEdit(){
    alert(txtAlert.edit)
    setEdit(false)
  }
  function completeDel(){
    navigate(ContextPath(API_DOMAIN_PATH.notice))
  }
  function onClickOpen(e){
    if(e.target.checked){
      let postData = {
        ntcregistyn : 'Y'
      }
      procPostAxios('/user/notice/'+id, state.token, contentType, postData, completeOpen, error)
    }
    if(!e.target.checked){
      let postData = {
        ntcregistyn : 'N'
      }
      procPostAxios('/user/notice/'+id, state.token, contentType, postData, completePrivate, error)
    }
  }
  function completeOpen(){
    alert(txtAlert.public)
    procGetAxios('/user/notice/'+id, state.token, contentType, getData )
  }
  function completePrivate(){
    alert(txtAlert.private)
    procGetAxios('/user/notice/'+id, state.token, contentType, getData )
  }
  const onClickEdit = () => { 
    setEdit(true)
  };
  const ttlHandler = (e) => {
    setTtl(e.target.value);
  } 

  return (
    <section>
      <TittleComponent tittle="공지사항" subTittle="중소벤처24 헬프데스크 공지입니다." />
        <div className="position-relative">
          <div className="shape shape-bottom shape-fluid-x text-light">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"/></svg> </div>
        </div>
      <div className="content_wrap">        
        <div className="d-flex justify-content-center mt-7">          
          <div className="w-75">            
            <div className="card mt-3">
              <div>
                <Link to={ContextPath(API_DOMAIN_PATH.notice)} className='btn fe fe-arrow-left-circle' >뒤로가기</Link>
              </div>
              <div className="card-body pb-0 fs-sm shadow">
                <div className="d-flex border-bottom ">        
                {edit ?
                    <input type='text' defaultValue={detlData.ttl} value={sub_ttl} onChange={ttlHandler} />
                    :
                    <>
                  <div className="fs-xs text-primary-desat px-2">
                    [{detlData.ctgrycd}]
                  </div>
                  <div className="d-flex justify-content-between col align-items-center px-1 mb-3">
                    <div className="mb-1 notice_title">
                      <span className='ml-3'>
                      {detlData.ttl}
                      </span>
                    </div>
                  </div>
                    </>
                    }
                    <div className="fs-sm text-muted px-2 text-end">{moment(detlData.registDt).format('YYYY.MM.DD HH:mm')}</div>
                </div> 
                <div className='d-flex justify-content-between p-3'>
                { auth === AuthCode.Admin && edit ?
                <>
                  <div className="d-flex">
                    <div className=''>
                      <label className="form-label">카테고리</label>
                  </div>
                    {notiAdminCd.map(a =>
                        <span className="p-3" key={a.id}>
                          <input className="m-1"  name="category" type='radio' defaultChecked={detlData.ctgrycd === a.name } value={a.cdId} onClick={ e=> setCategory(a.cdId) } ></input>
                          <label>{a.name}</label>
                        </span>
                      )}
                  </div>
                  <div className='d-flex align-items-center'>
                    <button className="btn btn-xs btn-rounded-circle btn-primary mg05 m-1 " onClick={onClickSave} title="저장">
                        <i className="fe fe-save"></i>
                    </button>
                    <button className="btn btn-xs btn-rounded-circle btn-secondary m-1" onClick={ () => setEdit(false)} title="취소">
                          <i className="fe fe-x"></i>
                    </button>
                  </div>  
                </>
                  :
                  <>
                  <div className='d-flex'/>
                  { auth === AuthCode.Admin ?
                    <div className='d-flex justify-content-end'>
                      <span className="text-muted">
                        공개
                      </span>
                      <div className="form-check form-switch mx-3 mb05">
                        <input className="form-check-input" type="checkbox" id="billingSwitch" data-toggle="price" data-target=".price" onChange={e => onClickOpen(e)} checked={detlData.ntcregistyn === 'Y' ? true : false}/>
                      </div>
                      <button className="btn btn-xs btn-rounded-circle btn-success mg05 m-1" onClick={onClickEdit} title="수정">
                        <i className="fe fe-feather"></i>
                      </button>
                      <button className="btn btn-xs btn-rounded-circle btn-secondary m-1" onClick={delectNotice} title="삭제">
                        <i className="fe fe-trash-2"></i>
                      </button>
                    </div>
                     : null }
                  </>
                  }
                </div>                              
                  {edit ? ( <QuillEditorComponent quillRef={ref} content={detlData.cnts} setContent={setCnts} />)
                  : (
                    <div className="m-3 pb-2 border-white ql-editor" dangerouslySetInnerHTML={{__html: detlData.cnts}}>
                    </div>
                   )
                  } 
                  <hr className="card-meta-divider" />
                  <div  className="">
                    <dl className="p-3">
                      {edit ? 
                        <AttachNoticeComponent noticeId={id} edit={true}/>
                      : <AttachNoticeComponent noticeId={id} edit={false}/>
                      }
                    </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
