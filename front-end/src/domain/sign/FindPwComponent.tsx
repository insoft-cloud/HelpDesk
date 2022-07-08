import {  procPostAxios } from 'axios/Axios';
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN_PATH, API_LOGIN, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch } from 'utils/TokenContext';

/**
 * @Project     : HelpDesk
 * @FileName    : FindIdComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 비밀번호 찾기 화면 컴포넌트
 */


export default function FindPwComponent() {
  
  const navigate = useNavigate();
  let dispatch = useTokenDispatch();
  const [contentType] = useState("application/json");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
      dispatch({ type: 'SET_PAGE', page: "LOGIN", actTime: new Date().getTime().toString()});
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  }
  function onKeyPress(e) {
    if(e==='Enter'){  
      if(!isModalOpen){   
        idCheck()
      } else {
        navigate(ContextPath(API_DOMAIN_PATH.main))
      }
    }
  }
  function returnLogin(){
    navigate(ContextPath(API_LOGIN.singIn));    
  }
  function emailChange(e : ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value);
  }
  function idCheck(){
      if(email === null || email === ''){
        alert('이메일을 작성해주세요.')
        return
      } else{
        procPostAxios( "/user/ems/sendEms/password?email="+email, {}, contentType, {}, ok, error)
      }
  }
    function ok() {
      setIsModalOpen(true)
    }
    function error() {
      alert('이메일을 잘못 입력하셨거나 아이디를 찾을 수 없습니다.')
    }
    function PassWordModalComponent (open, close) {
      return (
          <div className={open ? 'openModal modal fade show' : 'modal'} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              {
                  open ?
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable justify-content-center">
                          <div className="modal-content" style={{width : '450px'}}>
                          <div className="modal-body text-center">  
                            입력하신 이메일로 메일이 발송되었습니다.<br/>
                            이메일을 확인해주세요.
                          </div>
                          <div className="text-center mb-4">
                              <button type="button" className="btn btn-secondary btn-sm" style={{width : '25%'}} data-bs-dismiss="modal"  onKeyPress={e=>onKeyPress(e.key)} onClick={()=>navigate(ContextPath(API_LOGIN.singIn))} >확인</button>
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
                <p className="mt-2 mb-0 fs-sm text-center text-muted">
                     <button className="btn btn-secondary-soft m-1" style={{width : '48%'}} onClick={returnLogin}>
                        취소
                    </button>
                    <button className="btn btn-primary" style={{width : '48%'}} onClick={idCheck}>
                        확인
                    </button>
                </p>         
                {isModalOpen ? PassWordModalComponent(isModalOpen, closeModal) : null}                
          </div>
      </div>
  </div>
  </section>

  )
}
