import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {API_DOMAIN_PATH, API_LOGIN, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import {useTokenDispatch} from "../../utils/TokenContext";
import {DivType} from "../../interface/label/LabelType";
import DivComponent from "../../component/div/DivComponent";
import ReCAPTCHA from "react-google-recaptcha";
import {procGetAxiosHeader, procPostAxiosHeader} from "../../axios/Axios";
import SystemNameComponent from "component/select/SelectComponent";
import { CodeDetail } from "utils/AdminCode";

function SignUpComponent() {

    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const userId = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const passwordConfirm = useRef<HTMLInputElement>();
    const institution = useRef<HTMLInputElement>();
    const department = useRef<HTMLInputElement>();
    const rankCode = useRef<HTMLInputElement>();
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

    const [sysCd, SetSysCd] = useState("default");
    const [inputPhone, setInputPhone] = useState("");
    const [inputMobile, setInputMobile] = useState("");
    const [smsRcpt,setSmsRcpt] = useState(false);

    const regMobilePhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const regPhone = /^0([0-9]{1,2})-?([0-9]{3,4})-?([0-9]{4})$/;

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
    const [rankCodeType] = useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "text",
            className : "form-control",
            ref : rankCode,
        },
        labelType: {
            className : "form-label",
            text : "직급",
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
        className : "form-group mb-0",
        inputType: {
            type : "text",
            className : "form-control",
            ref : phone,
            placeholder : "ex)07012345678",
            onChange : () => setInputPhone(phone.current?.value as string)
        },
        labelType: {
            className : "form-label",
            text : "내선번호",
        }
    });
    const [mobilePhoneType]= useState<DivType>({
        className : "form-group mt-5 mb-0",
        inputType: {
            type : "text",
            className : "form-control",
            ref : mobilePhone,
            placeholder : "ex)01012345678",
            onChange : () => setInputMobile(mobilePhone.current?.value as string)
        },
        labelType: {
            className : "form-label",
            text : "휴대폰",
        }
    });


    const sysCdChange = (e) => {
        const value = e.target.value;
        SetSysCd(value)
    }


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
    }, [_emailCheck, captchaCheck, userIdCheck,mobilePhone]);

    return (
        <section>
            <div className="container d-flex flex-column">
                <div className="mt-8">
                    <Link to={ContextPath(API_DOMAIN_PATH.main)} className='btn fe fe-home'>메인으로</Link>
                </div>
                <div className="row align-items-center justify-content-center gx-0 min-vh-100 mb-3 mt-2 card shadow">
                    {/* 기존 : <div className="col-12 col-md-6 col-lg-4 py-8 py-md-11"> */}

                    <div className="py-8 py-md-11 card-body">
                        <h1 className="mb-0 fw-bold">
                            회원가입
                        </h1>
                        <p className="mb-6 text-muted">
                            중소벤처기업부 산하 기관의 업무 담당자분들이 가입하실 수 있습니다.
                        </p>

                        <DivComponent DivType={idType} />
                        <button disabled={idDisable} className="btn btn-primary mb-5" onClick={idCheck}>
                            아이디 중복체크
                        </button>
                        <DivComponent DivType={passwordType} />
                        <DivComponent DivType={passwordConfirmType} />
                        <SystemNameComponent onChange={sysCdChange} urlData={CodeDetail.sysCd} labelName="소속기관" />
                        <DivComponent DivType={departmentType} />
                        <DivComponent DivType={rankCodeType}/>
                        <DivComponent DivType={nameType} />
                        <DivComponent DivType={emailType} />
                        <button disabled={emailDisable} className="btn btn-primary mb-5" onClick={emailCheck}>
                            이메일 중복체크
                        </button>
                        <DivComponent DivType={phoneType} />
                        {(!regPhone.test(inputPhone) && inputPhone.length>0?
                            <div className="text-danger h6 mt-1">번호 형식에 맞지 않습니다</div>
                            :"")
                        }
                        <DivComponent DivType={mobilePhoneType} />
                        {(!regMobilePhone.test(inputMobile) && inputMobile.length>0?
                            <div className="text-danger h6 mt-1 mb-3">번호 형식에 맞지 않습니다</div>
                            :"")
                        }
                        <div className="mb-5">
                            <input type="checkbox" id="chk" checked={smsRcpt} onChange={e=>setSmsRcpt(e.target.checked)}/>
                            <label className="col-form-label" htmlFor="chk">
                                서비스 요청 진행사항을 문자메세지로 받습니다.
                            </label>
                        </div>

                        <ReCAPTCHA
                            className="mb-5"
                            sitekey={process.env.REACT_APP_CAPTCHA_KEY!}
                            onChange={recaptcha}
                        />
                        <p><small>담당자가 확인 후, 입력하신 이메일 주소로 회원 가입 승인 메일을 보내드립니다.</small></p>
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
        var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (!regEmail.test(email.current?.value as string)) {
            alert('이메일 형식에 맞춰서 입력해주세요.');
            return;
        }
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
    }

    function signUp() : void{
        if(password.current?.value !== passwordConfirm.current?.value){
            alert("비밀번호 불일치")
            return;
        }
        if(sysCd === "default"){
            alert("소속기관을 선택해주세요")
            return;
        }

        if(!regPhone.test(phone.current?.value as string)){
            alert('번호 형식에 맞춰서 입력해주세요')
            return;
        }
        if(!regPhone.test(mobilePhone.current?.value as string)){
            alert('번호 형식에 맞춰서 입력해주세요')
            return;
        }
        let chkPhone = phone.current?.value as string;
        let chkMobile = mobilePhone.current?.value as string;
        if(chkPhone.includes("-")){
            chkPhone = chkPhone.replace(/\-/g,'');
        }
        if(chkMobile.includes("-")){
            chkMobile = chkMobile.replace(/\-/g,'');
        }
        let model = {
            userId : userId.current?.value,
            password : password.current?.value,
            agencyCode : sysCd,
            departmentName : department.current?.value,
            username : name.current?.value,
            email : email.current?.value,
            telNumber : chkPhone,
            phoneNumber : chkMobile,
            jobCode : "test",
            rankCode : rankCode.current?.value,
            informationCollectionYN : "t",
            termsAgrYN : "t",
            smsRcptYN : smsRcpt?"Y":"N",
            joinConfirmYN : "N",
            delYn : "N"
        }

        procPostAxiosHeader(API_SIGN_PATH+"/signup", {}, model, ok, error);
    }

    function testOk(data : any){
        alert("test !!!")
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
