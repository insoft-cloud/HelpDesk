import { procGetAxios, procPostAxios } from 'axios/Axios';
import AttachNoticeComponent from 'component/attach/AttachNoticeComponent';
import TittleComponent from 'component/div/TittleComponent';
import QuillEditorComponent from 'component/qill/QuillEditorComponent';
import e from 'express';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthCode, CodeDetail } from 'utils/AdminCode';
import { txtAlert } from 'utils/CommonText';
import { API_DOMAIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';

export default function NoticeDetailComponent() {

  let { id } = useParams();

    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const auth = sessionStorage.getItem("auth");
    const navigate = useNavigate();

    const [detlData, setDetl] :any = useState([]);

    const [edit, setEdit] = useState(false);
    const [cnts, setCnts] = useState();
    const [ttl, setTtl] = useState();

    const ref : any  = useRef(null);
    let sub_data;

    useEffect( () => {
     procGetAxios('/user/notice/'+id, state.token, contentType, getData )

    }, [edit])

    function getData(data){
        sub_data = data
        procGetAxios("admin/group/"+CodeDetail.notice+"/details",state.token,"application.json", notiAdminCode)
    }
    function notiAdminCode(data){
      data.content.forEach(e => {
        if (sub_data.ctgrycd=== e.cdId){
          sub_data.ctgrycd = e.name;
             }
          })
          setDetl(sub_data)    
    }
    function onClickSave(){
      let postData = {
        ttl : ttl,
        cnts : cnts
      }
      procPostAxios('/user/notice/'+id, state.token, contentType, postData, completeEdit, error)
    }

    function delectNotice(){
      let postData = {
        delYn : true
      }
      procPostAxios('/user/notice/'+id, state.token, contentType, postData, completeDel, error)
    }
    function error(){
      console.log('error')
    }
    function completeEdit(){
      alert(txtAlert.edit)
      setEdit(false)
    }
    function completeDel(){
      alert(txtAlert.delNotice)
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

    console.log(detlData)

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
                <div className="d-flex justify-content-between border-bottom p-5 ">
        
                  <div className="fs-xs text-primary-desat mr10">
                    [{detlData.ctgrycd}]
                  </div>
                  <div className="d-flex justify-content-between col align-items-center ml10">
                  {edit ?
                    <input type='text' defaultValue={(detlData.ttl != null ) ? detlData.ttl : ""} value={ttl} onChange={ttlHandler} />
                    :
                    <div className="mb-0 notice_title">
                      {detlData.ttl}
                    </div>
                    }
                    <div className="fs-sm text-muted mb-0 text-end">{moment(detlData.registDt).format('YYYY.MM.DD HH:mm')}</div>
                  </div>
                </div> 
                { (auth === AuthCode.superAdmin || auth === AuthCode.Admin) ?
                <div className='d-flex justify-content-end p-5 '>
                  {edit ? 
                    <>
                    <button className="btn btn-xs btn-rounded-circle btn-primary mg05 m-1" onClick={onClickSave} title="저장">
                        <i className="fe fe-save"></i>
                    </button>
                    <button className="btn btn-xs btn-rounded-circle btn-secondary m-1" onClick={ () => setEdit(false)} title="취소">
                          <i className="fe fe-x"></i>
                    </button>
                    </>
                  :<>
                  <span className="text-muted">
                    공개
                  </span>
                  <div className="form-check form-switch mx-3 mb05">
                    <input className="form-check-input" type="checkbox" id="billingSwitch" data-toggle="price" data-target=".price" onChange={e => onClickOpen(e)} checked={detlData.ntcregistyn === 'Y' ? true : false}/>
                  </div>
                  <button className="btn btn-xs btn-rounded-circle btn-success mg05 m-1" onClick={onClickEdit} title="수정">
                    <i className="fe fe-feather"></i>
                  </button>
                  { auth === AuthCode.superAdmin ?
                  <button className="btn btn-xs btn-rounded-circle btn-secondary m-1" onClick={delectNotice} title="삭제">
                    <i className="fe fe-trash-2"></i>
                  </button>
                  : null }
                  </> }
                </div>
                : null }                
                  {edit ? ( <QuillEditorComponent quillRef={ref} content={detlData.cnts} setContent={setCnts} />)
                  : (
                    <div className="m-3 pb-2 border-white ql-editor" dangerouslySetInnerHTML={{__html: detlData.cnts}}>
                    </div>
                   )
                  } 
                  <hr className="card-meta-divider" />
                    <dl className="mb-0">
                      <dt className="col-auto badge bg-secondary-soft">첨부파일</dt>
                        <AttachNoticeComponent noticeId={id} />
                    </dl>
                    
                {/* 이전글 다음글 
                <div class="table-responsive fs-sm">
                  <table class="table table-striped border-top">
                    <tbody>
                      <tr>
                        <td class="text-center">
                          이전 글 <i class="fe fe-arrow-up"></i>
                        </td>
                        <td class="text-center">123</td>
                        <td class="text-center">공지</td>
                        <td>
                            <a href="#!" class="txt_ellipsis w-75">[중소벤처24] 중소벤처24 시스템 점검에 따른 서비스</a>
                        </td>
                        <td class="text-center">2021.11.30</td>
                        <td class="text-center">258</td>
                      </tr>
                      <tr>
                        <td class="text-center">
                          다음 글 <i class="fe fe-arrow-down"></i>
                        </td>
                        <td class="text-center">123</td>
                        <td class="text-center">공지</td>
                        <td>
                            <a href="#!" class="txt_ellipsis w-75">[중소벤처24] 중소벤처24 시스템 점검에 따른 서비스 중단 안내 시스템 점검에 따른 서비스 중단 안내</a>
                        </td>
                        <td className="text-center">2021.11.30</td>
                        <td className="text-center">조회수</td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
            
          </div>

        </div>

      </div>

    </section>
  )
}
