import { procPostAxios } from 'axios/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN_PATH, API_LOGIN, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch } from 'utils/TokenContext';
import jwt_decode from "jwt-decode";


/**
 * @Project     : HelpDesk
 * @FileName    : FindIdComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 비밀번호 재설정 화면 컴포넌트
 */

export default function ResetPwComponent () {

     let getParameter = (key) => {
       return new URLSearchParams(window.location.search).get(key);
     };
    let accessToken : any = getParameter("accessToken");
    let decodeToken : any = jwt_decode(accessToken);

const navigate = useNavigate();
let dispatch = useTokenDispatch();

const [contentType] = useState("application/json");

const [password,setPassword] = useState("");
const [chkPassword,setChkPassword] = useState("");
const regPwEngNum =  /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,}$/;
const regPwEngNumSpc =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;
    
  useEffect(() => {
    dispatch({ type: 'SET_PAGE', page: "LOGIN", actTime: new Date().getTime().toString()});
}, []);

function onKeyPress(e) {
    if(e==='Enter'){     
        changePw()
    }
}
function changePw(){
    if(password !== '' && chkPassword !== '' && password===chkPassword){
        if(!regPwEngNum.test(password) && !regPwEngNumSpc.test(password)){
            alert("비밀번호는 숫자+영문자(10자이상) 또는 숫자+영문자+특수문자(8자이상)로 작성해주세요")
            return;
        }
        if(password.length > 100){
            alert("비밀번호는 100자 이내로 작성해주세요")
            return;
        }
    let changePw = {
      password : password
        }
      procPostAxios("user/members/findPw/"+decodeToken.jti, accessToken, contentType, changePw, ok, error);
    } else {
        alert('비밀번호가 동일하지 않습니다.')
    }
}
function ok(){
    alert('비밀번호 변경이 완료되었습니다.')
    navigate(ContextPath(API_LOGIN.singIn));    
}
function error(){
    alert('기간이 만료되서 사용 할 수 없습니다.')
    navigate(ContextPath(API_DOMAIN_PATH.main));
}

  return (
    <section className="section-border border-primary">
    <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center gx-0 min-vh-100">
            <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                <h1 className="mb-0 fw-bold text-center">
                    비밀번호 재설정
                </h1>
                <p className="mb-6 text-center text-muted">
                    새롭게 설정 할 비밀번호를 입력해주세요.
                </p>
                    <div className="form-group">
                        <label className="form-label">
                            비밀번호
                        </label>
                        <div className="col-md-10">
                            <input className="form-control" value={password} onChange={e=>setPassword(e.target.value)} onKeyPress={e=>onKeyPress(e.key)} type="password" placeholder='비밀번호'/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            비밀번호 확인
                        </label>
                        <div className="col-md-10">
                            <input className={"form-control "+(password!==chkPassword?"text-danger border-danger":"") } onKeyPress={e=>onKeyPress(e.key)} value={chkPassword} onChange={e=>setChkPassword(e.target.value)} type="password" placeholder='비밀번호 재입력' />
                        </div>
                    </div>
                    <p className="mt-2 mb-0 fs-sm text-center text-muted">
                        <button className="btn btn-secondary-soft m-1" onClick={ e => navigate(ContextPath(API_DOMAIN_PATH.main)) } style={{width : '48%'}} >
                            취소
                        </button>
                        <button className="btn btn-primary" style={{width : '48%'}} onClick={changePw} >
                            확인
                        </button>
                    </p>         
            </div>
        </div>
    </div>
    </section>
    )
}
