import React, {ChangeEvent, useEffect, useState} from "react";
import LoginModel from "../../interface/Login/LoginModel";
import {procPostAxios, procPostAxiosHeader} from "../../axios/Axios";
import {useTokenDispatch} from "../../utils/TokenContext";
import {Link, useNavigate} from "react-router-dom";
import {AxiosRequestHeaders} from "axios";
import {API_LOGIN, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";

export default function SignInComponent({prePath : path}) {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    let [refreshToken ] = useState(sessionStorage.getItem("refreshToken"));
    let [refreshTokenExpired ]  = useState(sessionStorage.getItem("refreshTokenExpired"));
//   const [prePath] = useState(path);

    useEffect(() => {

        dispatch({ type: 'SET_PAGE', page: "LOGIN"});
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
                            회원가입을 아직 하지 않으셨나요? <Link to={ContextPath(API_LOGIN.singUp)}>회원가입</Link>.
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
        console.log(API_SIGN_PATH);
        procPostAxios(API_SIGN_PATH+"/signin","","application/json", loginModel, ok, error);
    }

    function ok(data : any){
        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
            tokenExpired: data['tokenExpired'], user: data['userName'] });
        sessionStorage.setItem("refreshToken", data['refreshToken']);
        sessionStorage.setItem("refreshTokenExpired", data['refreshTokenExpired']);
        if(path.toString().toLowerCase().indexOf("sign") > 0){
            navigate(ContextPath("/"));
        }else {
            navigate(ContextPath(path));
        }

    }

    function error(error){
        alert(error);
    }
}
