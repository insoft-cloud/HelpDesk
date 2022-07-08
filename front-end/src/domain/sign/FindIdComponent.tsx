import { procGetAxiosHeader } from 'axios/Axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_LOGIN, API_SIGN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch } from 'utils/TokenContext';


/**
 * @Project     : HelpDesk
 * @FileName    : FindIdComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 아이디 찾기 화면 컴포넌트
 */

export default function FindIdComponent() {

  const navigate = useNavigate();
  let dispatch = useTokenDispatch();

  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "LOGIN", actTime: new Date().getTime().toString()});
    }, []);

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
  function idCheck(){
    procGetAxiosHeader(API_SIGN_PATH+"/members/findId/"+email, {},findIdResult);
  }

    function findIdResult(data){
        if(!data){
            alert('이메일을 잘못 입력하셨거나 아이디를 찾을 수 없습니다.')
        }
        if(data){
            setId(data)
        }
    }

  return (
    <section className="section-border border-primary">
    <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center gx-0 min-vh-100">
            <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                <h1 className="mb-0 fw-bold text-center">
                    아이디찾기
                </h1>
                <p className="mb-6 text-center text-muted">
                    가입시 등록하신 메일주소를 입력하면, 아이디를 안내해드립니다.
                </p>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            이메일 주소
                        </label>
                        <input type="email" className="form-control" id="email" placeholder='Email' onChange={emailChange} onKeyPress={e=>onKeyPress(e.key)} />
                    </div>
                    <div>
                      {id !== null ? 
                      <div className="mt-2 mb-0 text-center mt-5 mb-5"> 가입하신 아이디는 {id} 입니다.</div>
                      : null}
                    </div>
                <p className="mt-2 mb-0 fs-sm text-center text-muted">
                   <button className="btn btn-secondary-soft m-1" style={{width : '48%'}} onClick={returnLogin}>
                        취소
                    </button>
                    <button className="btn btn-primary" style={{width : '48%'}} onClick={idCheck}>
                        확인
                    </button>
                </p>                        
            </div>
        </div>

    </div>

</section>  )
}
