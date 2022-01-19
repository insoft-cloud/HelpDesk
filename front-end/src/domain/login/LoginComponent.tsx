import React, {ChangeEvent, useEffect, useState} from "react";
import LoginModel from "../../interface/Login/LoginModel";
import {procPostAxios, procPostAxiosHeader} from "../../axios/Axios";
import {useTokenDispatch} from "../../utils/TokenContext";
import {useNavigate} from "react-router-dom";
import {AxiosRequestHeaders} from "axios";

export default function LoginComponent() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    let [refreshToken, setRefreshToken] = useState(sessionStorage.getItem("refreshToken"));
    let [refreshTokenExpired, setRefreshTokenExpired]  = useState(sessionStorage.getItem("refreshTokenExpired"));


    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "LOGIN"})
        if(refreshToken !== null && refreshToken !== undefined){
            console.log(new Date().getTime());
            console.log(refreshTokenExpired);
            if(Number(refreshTokenExpired) > new Date().getTime())
            {
                let header : AxiosRequestHeaders;
                header = {
                    'Content-Type' : "application/json",
                    'REFRESH-TOKEN' : refreshToken
                }
                procPostAxiosHeader("/refresh-token",header,null, ok);
            }
        }




    }, []);


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
                                    이메일 주소
                                </label>
                                <input type="email" className="form-control" id="email" onChange={emailChange} placeholder="name@address.com"/>
                            </div>
                            <div className="form-group mb-5">
                                <label className="form-label" htmlFor="password">
                                    패스워드
                                </label>
                                <input type="password" className="form-control" onChange={passwordChange} id="password"
                                       placeholder="Enter your password"/>
                            </div>
                            <button className="btn w-100 btn-primary" onClick={login}>
                                Sign in
                            </button>
                        <p className="mb-0 fs-sm text-center text-muted">
                            회원가입을 아직 하지 않으셨나요? <a href="signup.html">회원가입</a>.
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
        procPostAxios("/signin","","application/json", loginModel, ok);
    }

    function ok(data : any){
        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
            tokenExpired: data['tokenExpired'] });
        sessionStorage.setItem("refreshToken", data['refreshToken']);
        sessionStorage.setItem("refreshTokenExpired", data['refreshTokenExpired']);
        navigate('/');
    }
}