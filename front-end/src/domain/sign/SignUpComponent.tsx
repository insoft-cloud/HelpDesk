import React, {ChangeEvent, ChangeEventHandler, CSSProperties, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {API_LOGIN, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import {useTokenDispatch} from "../../utils/TokenContext";
import {SignUp} from "../../interface/Login/LoginModel";
import {procPostAxios} from "../../axios/Axios";
import BackgroundImage from "assets/img/covers/cover-15.jpg";
import {DivType} from "../../interface/label/LabelType";
import DivComponent from "../../component/div/DivComponent";

function SignUpComponent() {

    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const singUpStyle : CSSProperties = {
        height : "100px" ,
        backgroundImage: "url(" + BackgroundImage + ")"
    } ;

    const [emailType]= useState<DivType>({
        className : "form-group",
        inputType: {
            type : "email",
            className : "form-control",
            id : "email",
            onChange : emailChange,
            placeholder : "name@address.com"
        },
        labelType: {
            className : "form-label",
            htmlFor : "email",
            text : "Email Address",
        }
    });

    const [passwordType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "password",
            className : "form-control",
            id : "password",
            onChange : passwordChange,
            placeholder : "Enter your password"
        },
        labelType: {
            className : "form-label",
            htmlFor : "password",
            text : "Password",
        }
    });








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

                        <DivComponent DivType={emailType} />
                        <DivComponent DivType={passwordType} />


                            <button className="btn w-100 btn-primary" onClick={signUp}>
                                회원 가입
                            </button>

                        <p className="mb-0 fs-sm text-muted">
                            Already have an account? <Link to={ContextPath(API_LOGIN.singIn)} state={
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

        procPostAxios(API_SIGN_PATH+"/signup","","application/json", model, ok, error);
    }

    function ok(data : any) : void {
        alert("회원가입 완료");
        navigate(ContextPath(API_LOGIN.singIn));
    }

    function error(error : any) : void{
        alert(error);
    }
}


export default SignUpComponent