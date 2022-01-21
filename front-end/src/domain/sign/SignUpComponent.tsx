import React, {ChangeEvent, CSSProperties, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ContextPath} from "../../utils/ContextPath";
import {useTokenDispatch} from "../../utils/TokenContext";
import LoginModel, {SignUp} from "../../interface/Login/LoginModel";
import {procPostAxios} from "../../axios/Axios";
import BackgroundImage from "assets/img/covers/cover-15.jpg";
import SignInComponent from "./SignInComponent";

function SignUpComponent() {

    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const singUpStyle : CSSProperties = {
        height : "100px" ,
        backgroundImage: "url(" + BackgroundImage + ")"
    } ;


    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "LOGIN"})
    }, []);

    return (
        <section>
            <div className="container d-flex flex-column">
                <div className="row align-items-center justify-content-center gx-0 min-vh-100">
                    <div className="col-12 col-md-6 col-lg-4 py-8 py-md-11">


                        <h1 className="mb-0 fw-bold">
                            Sign up
                        </h1>


                        <p className="mb-6 text-muted">
                            Simplify your workflow in minutes.
                        </p>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    Email Address
                                </label>
                                <input type="email" className="form-control" id="email" onChange={emailChange} placeholder="name@address.com"/>
                            </div>


                            <div className="form-group mb-5">
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                                <input type="password" className="form-control" id="password" onChange={passwordChange}
                                       placeholder="Enter your password"/>
                            </div>


                            <button className="btn w-100 btn-primary" onClick={signUp}>
                                회원 가입
                            </button>

                        <p className="mb-0 fs-sm text-muted">
                            Already have an account? <Link to={ContextPath("/signin")} state={
                            {prePath : window.location.pathname}
                        }>Log in</Link>.
                        </p>

                    </div>
                    <div className="col-lg-7 offset-lg-1 align-self-stretch d-none d-lg-block">
                        <div className="h-100 w-cover bg-cover"
                             style={singUpStyle}></div>
                        <div className="shape shape-start shape-fluid-y text-white">
                            <svg viewBox="0 0 100 1544" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h100v386l-50 772v386H0V0z" fill="currentColor"/>
                            </svg>
                        </div>

                    </div>
                </div>

            </div>

        </section>
    )

    function passwordChange(e : React.ChangeEvent<HTMLInputElement>): void {
        setPassword(e.target.value);
    }

    function emailChange(e : ChangeEvent<HTMLInputElement>) : void{
        setEmail(e.target.value);
    }

    function signUp() : void{
        let model : SignUp
        model = {
            userId : email,
            password : password,
            agencyCode : "test",
            departmentName : "test",
            jobCode : "test",
            rankCode : "test",
            username : "test",
            email : "test",
            phoneNumber : "test",
            informationCollectionYN : "t",
            termsAgrYN : "t",
            joinConfirmYN : "t"
        }

        procPostAxios("/signup","","application/json", model, ok, error);
    }

    function ok(data : any) : void {
        alert("회원가입 완료");
        navigate(ContextPath("/signup"));
    }

    function error(error : any) : void{
        alert(error);
    }
}


export default SignUpComponent