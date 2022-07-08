import React, {ChangeEvent, useEffect, useState} from "react";
import LoginModel from "../../interface/Login/LoginModel";
import {procPostAxios, procPostAxiosHeader} from "../../axios/Axios";
import {useTokenDispatch} from "../../utils/TokenContext";
import {Link, useNavigate} from "react-router-dom";
import {AxiosRequestHeaders} from "axios";
import {API_DOMAIN_PATH, API_LOGIN, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";

export default function SignInComponent({prePath : path}) {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    let [refreshToken] = useState(localStorage.getItem("refreshToken"));
    let [refreshTokenExpired] = useState(localStorage.getItem("refreshTokenExpired"));
//   const [prePath] = useState(path);

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "LOGIN", actTime: new Date().getTime().toString() });
    }, []);

    useState(() => {
        if(refreshToken !== null && refreshToken !== undefined){
            if(Number(refreshTokenExpired) > new Date().getTime())
            {
                let header : AxiosRequestHeaders;
                header = {
                    'Content-Type' : "application/json",
                    'REFRESH-TOKEN' : refreshToken
                }
                procPostAxiosHeader(API_SIGN_PATH+"/refresh-token",header,null, ok, error);
            }
        }
    });

    return(
        <section className="section-border border-primary">
            <div className="container d-flex flex-column">
                <div className="row align-items-center justify-content-center gx-0 min-vh-100">
                    <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                        <h1 className="mb-0 fw-bold text-center">
                            로그인
                        </h1>
                        <p className="mb-6 text-center text-muted">
                            헬프데스크 로그인 페이지입니다.
                        </p>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    아이디
                                </label>
                                <input type="email" className="form-control" id="email" onChange={emailChange} placeholder="ID"  onKeyPress={e=>onKeyPress(e.key)} />
                            </div>
                            <div className="form-group mb-5">
                                <label className="form-label" htmlFor="password">
                                    비밀번호
                                </label>
                                <input type="password" className="form-control" onChange={passwordChange} id="password"
                                       placeholder="Password" onKeyPress={e=>onKeyPress(e.key)}/>
                            </div>
                            <button className="btn w-100 btn-primary" onClick={login}>
                                Sign in
                            </button>
                        <p className="mt-2 mb-0 fs-sm text-center text-muted">
                        <Link to={ContextPath(API_LOGIN.findId)} className='btn btn-outline-secondary btn-pill btn-xs' >아이디찾기</Link>
                        <Link to={ContextPath(API_LOGIN.findPw)} className='btn btn-outline-secondary btn-pill btn-xs m-1' >비밀번호찾기</Link>
                        <Link to={ContextPath(API_LOGIN.singUp)} className='btn btn-outline-primary btn-pill btn-xs'>회원가입</Link>
                        </p>                        

                    </div>
                </div>

            </div>

        </section>

)

    function passwordChange(e : React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }

    function emailChange(e : ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    }

    function login(){
        let loginModel : LoginModel = new LoginModel(email, password);
        procPostAxios(API_SIGN_PATH+"/signin","","application/json", loginModel, ok, error);
    }

    function onKeyPress(e) {
        if(e==='Enter'){
            login();
        }
    }

    function ok(data : any){
        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
            tokenExpired: data['tokenExpired'], user: data['userId'], name : data['userName'], auth : data['auth'], actTime: new Date().getTime().toString() });
        localStorage.setItem("refreshToken", data['refreshToken']);
        localStorage.setItem("refreshTokenExpired", data['refreshTokenExpired']);
        if(path.toString().toLowerCase().indexOf("sign") > 0){
            navigate(ContextPath(API_DOMAIN_PATH.main));
        }else {
            navigate(ContextPath(path));
        }

    }

    function error(error){
        alert(error);
    }
}
