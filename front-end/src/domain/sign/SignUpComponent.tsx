import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {API_LOGIN, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import {useTokenDispatch} from "../../utils/TokenContext";
import {DivType} from "../../interface/label/LabelType";
import DivComponent from "../../component/div/DivComponent";
import ReCAPTCHA from "react-google-recaptcha";
import {procGetAxiosHeader, procPostAxiosHeader} from "../../axios/Axios";

function SignUpComponent() {

    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const userId = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const passwordConfirm = useRef<HTMLInputElement>();
    const institution = useRef<HTMLInputElement>();
    const department = useRef<HTMLInputElement>();
    const name = useRef<HTMLInputElement>();
    const email = useRef<HTMLInputElement>();
    const phone = useRef<HTMLInputElement>();
    const mobilePhone = useRef<HTMLInputElement>();

    const [_emailCheck, setEmailCheck] = useState(false);
    const [userIdCheck, setUserIdCheck] = useState(false);
    const [captchaCheck, setCaptchaCheck] = useState(false);


    const [buttonDisable, setButtonDisable] = useState(false);
    const [idDisable, setIdDisable] = useState(false);
    const [emailDisable, setEmailDisable] = useState(false);

    const [idType]= useState<DivType>({
        className : "form-group",
        inputType: {
            type : "text",
            className : "form-control",
            ref : userId,
            placeholder : "아이디는 알파벳과 숫자로만 만드실 수 있습니다.",
            onChange : idChange
        },
        labelType: {
            className : "form-label",
            htmlFor : "아이디",
            text : "아이디는 알파벳과 숫자로만 만드실 수 있습니다.",
        }
    });
    const [passwordType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "password",
            className : "form-control",
            ref : password,
            placeholder : "Enter your password"
        },
        labelType: {
            className : "form-label",
            htmlFor : "password",
            text : "비밀번호",
        }
    });
    const [passwordConfirmType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "password",
            className : "form-control",
            ref : passwordConfirm,
            placeholder : "Enter your password"
        },
        labelType: {
            className : "form-label",
            htmlFor : "password",
            text : "비밀번호 확인",
        }
    });
    const [institutionType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "text",
            className : "form-control",
            ref : institution,
            placeholder : "소속기관을 선택해주세요"
        },
        labelType: {
            className : "form-label",
            htmlFor : "소속기관을 선택해주세요",
            text : "소속기관",
        }
    });
    const [departmentType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "text",
            className : "form-control",
            ref : department,
        },
        labelType: {
            className : "form-label",
            text : "소속부서/팀",
        }
    });
    const [nameType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "text",
            className : "form-control",
            ref : name,
        },
        labelType: {
            className : "form-label",
            text : "이름",
        }
    });
    const [emailType]= useState<DivType>({
        className : "form-group",
        inputType: {
            type : "email",
            className : "form-control",
            ref : email,
            onChange : emailChange,
        },
        labelType: {
            className : "form-label",
            text : "이메일",
        }
    });
    const [phoneType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "text",
            className : "form-control",
            ref : phone,
        },
        labelType: {
            className : "form-label",
            text : "내선번호",
        }
    });
    const [mobilePhoneType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "text",
            className : "form-control",
            ref : mobilePhone,
        },
        labelType: {
            className : "form-label",
            text : "휴대폰",
        }
    });




    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "LOGIN"})
    }, []);

    useEffect(() => {
        console.log(_emailCheck);
        if(_emailCheck && captchaCheck && userIdCheck){
            setButtonDisable(true)
        }else {
            setButtonDisable(false)
        }
    }, [_emailCheck, captchaCheck, userIdCheck]);


    return (
        <section>
            <div className="container d-flex flex-column">
                <div className="row align-items-center justify-content-center gx-0 min-vh-100">
                    <div className="col-12 col-md-6 col-lg-4 py-8 py-md-11">
                        <h1 className="mb-0 fw-bold">
                            회원가입
                        </h1>
                        <p className="mb-6 text-muted">
                            중소벤처기업부 산하 기관의 업무 담당자분들이 가입하실 수 있습니다.
                        </p>

                        <DivComponent DivType={idType} />
                        <button disabled={idDisable} className="btn btn-primary" onClick={idCheck}>
                            아이디 중복체크
                        </button>
                        <DivComponent DivType={passwordType} />
                        <DivComponent DivType={passwordConfirmType} />
                        <DivComponent DivType={institutionType} />
                        <DivComponent DivType={departmentType} />
                        <DivComponent DivType={nameType} />
                        <DivComponent DivType={emailType} />
                        <button disabled={emailDisable} className="btn btn-primary" onClick={emailCheck}>
                            이메일 중복체크
                        </button>
                        <DivComponent DivType={phoneType} />
                        <DivComponent DivType={mobilePhoneType} />
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_CAPTCHA_KEY!}
                            onChange={recaptcha}

                        />
                            <button disabled={!buttonDisable} className="btn w-100 btn-primary" onClick={signUp}>
                                회원 가입
                            </button>
                        <p className="mb-0 fs-sm text-muted">
                            Already have an account? <Link to={ContextPath(API_LOGIN.singIn)} state={
                            {prePath : window.location.pathname}
                        }>Log in</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )

    function idCheck(){
        setUserIdCheck(true);
        procGetAxiosHeader(API_SIGN_PATH+"/members/userid/"+userId.current?.value+"/exist", {},idCheckResult);
    }

    function idChange(){
        setUserIdCheck(false);
        setIdDisable(false);
    }

    function emailChange() {
        setEmailCheck(false);
        setEmailDisable(false);
    }
    function idCheckResult(result){
        if(!result){
            setUserIdCheck(true);
            setIdDisable(true);
            alert("중복체크 완료");
        }else {
            setUserIdCheck(false);
            setIdDisable(false);
            alert("아이디 중복입니다.");
        }
    }

    function emailCheck(){
        procGetAxiosHeader(API_SIGN_PATH+"/members/email/"+email.current?.value+"/exist", {},emailCheckResult);
    }

    function emailCheckResult(result){
        if(!result){
            setEmailCheck(true);
            setEmailDisable(true);
            alert("중복체크 완료");
        }else {
            setEmailCheck(false);
            setEmailDisable(false);
            alert("이메일 중복입니다.");
        }
    }

    function recaptcha(value){
        let param = {
            response : value,
        }
        setCaptchaCheck(true);
        //procPostAxiosHeader(API_SIGN_PATH+"/captcha-check", {},param,captchaResult,captchaResult);
    }

    function captchaResult(data){
        setCaptchaCheck(true);
        // let check : boolean = data['success'];
        // if(check){
        //     setCaptchaCheck(true);
        // }else{
        //     setCaptchaCheck(true);
        // }
    }

    function signUp() : void{
        if(password.current?.value !== passwordConfirm.current?.value){
            alert("비밀번호 불일치")
            return;
        }
        let model = {
            userId : userId.current?.value,
            password : password.current?.value,
            agencyCode : institution.current?.value,
            departmentName : department.current?.value,
            username : name.current?.value,
            email : email.current?.value,
            phoneNumber : mobilePhone.current?.value,
            jobCode : "test",
            rankCode : "test",
            informationCollectionYN : "t",
            termsAgrYN : "t",
            joinConfirmYN : "t"
        }

        procPostAxiosHeader(API_SIGN_PATH+"/signup", {}, model, ok, error);
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