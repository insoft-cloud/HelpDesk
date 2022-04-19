import { procGetAxiosHeader, procPostAxiosHeader } from 'axios/Axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_LOGIN, API_SIGN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch } from 'utils/TokenContext';

export default function FindPwComponent() {
  
  const navigate = useNavigate();
  let dispatch = useTokenDispatch();

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password,setPassword] = useState("");
  const [chkPassword,setChkPassword] = useState("");
  const [isModalOpen,setIsModalOpen] = useState(false);


  useEffect(() => {
      dispatch({ type: 'SET_PAGE', page: "LOGIN"});
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  function onKeyPress(e) {
    if(e==='Enter'){     
        idCheck()
    }
  }

  function returnLogin(){
    navigate(ContextPath(API_LOGIN.singIn));    
  }
  function emailChange(e : ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value);
  }
  function idChange(e : ChangeEvent<HTMLInputElement>){
    setId(e.target.value);
  }
  function idCheck(){
      if(email === null || email === ''){
        alert('이메일 빈칸')
        return
      }
      else if(id === ''){
        alert('아이디 빈칸')
        return
      }
      else{
      procGetAxiosHeader(API_SIGN_PATH+"/members/findId/"+email, {},findIdResult);
    }
  }
  function error(){
      console.log('error')
  }

    function findIdResult(data){
        if(!data){
            alert('이메일을 잘못 입력하셨거나 아이디를 찾을 수 없습니다.')
        }
        if(data){
            if(data === id){
              setIsModalOpen(true)
            } else {
              alert('이메일을 잘못 입력하셨거나 아이디를 찾을 수 없습니다.')
            }
        }
    }

  function changePw(id){
    if(password !== '' && chkPassword !== '' && password===chkPassword){

    let test = {
      password : password
        }
      procPostAxiosHeader(API_SIGN_PATH+"/members/findPw/"+id, {}, test, ok, error);
    }
  }

  function ok(){
    alert('비밀번호 변경')
    navigate(ContextPath(API_LOGIN.singIn));    
  }

    function PassWordModalComponent (open, close, id) {
      return (
          <div className={open ? 'openModal modal fade show' : 'modal'} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              {
                  open ?
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title" id="staticBackdropLabel">비밀번호 재설정</h5>
                              </div>
                              <div className="modal-body">
                                  <div className="form-group form-inline row">
                                  <label className="col-form-label col-md-2">
                                      비밀번호
                                  </label>
                                  <div className="col-md-10">
                                      <input className="form-control bg-light" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
                                  </div>
                              </div>
                              <div className="form-group form-inline row">
                                  <label className="col-form-label col-md-2">
                                      비밀번호 확인
                                  </label>
                                  <div className="col-md-10">
                                      <input className={"form-control bg-light "+(password!==chkPassword?"text-danger border-danger":"") } value={chkPassword} onChange={e=>setChkPassword(e.target.value)} type="password" />
                                  </div>
                              </div>       
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate(ContextPath(API_LOGIN.singIn))}>취소</button>
                                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => changePw(id)}>확인</button>
                              </div>
                          </div>
                      </div>
                      : null
              }
          </div>
      )
  }
  return (
  <section className="section-border border-primary">
  <div className="container d-flex flex-column">
      <div className="row align-items-center justify-content-center gx-0 min-vh-100">
          <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
              <h1 className="mb-0 fw-bold text-center">
                  비밀번호 찾기
              </h1>
              <p className="mb-6 text-center text-muted">
                  가입시 등록하신 메일주소와 아이디를 입력하면, 비밀번호를 안내해드립니다.
              </p>
                  <div className="form-group">
                      <label className="form-label" htmlFor="email">
                          이메일 주소
                      </label>
                       <input type="email" className="form-control" id="email" placeholder='Email' onChange={emailChange} onKeyPress={e=>onKeyPress(e.key)} />
                    </div>
                    
                  <div className="form-group">
                      <label className="form-label" htmlFor="email">
                          아이디
                      </label>
                       <input type="text" className="form-control" id="id" placeholder='ID' onChange={idChange} onKeyPress={e=>onKeyPress(e.key)} />
                    </div>
                <p className="mt-2 mb-0 fs-sm text-center text-muted">
                     <button className="btn btn-secondary-soft m-1" style={{width : '48%'}} onClick={returnLogin}>
                        취소
                    </button>
                    <button className="btn btn-primary" style={{width : '48%'}} onClick={idCheck}>
                        확인
                    </button>
                </p>         
                {isModalOpen ? PassWordModalComponent(isModalOpen, closeModal, id) : null}                
          </div>
      </div>
  </div>
  </section>

  )
}
