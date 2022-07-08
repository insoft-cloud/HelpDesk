import React, {RefObject, useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {API_DOMAIN_PATH, API_LOGIN, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import {useTokenDispatch} from "../../utils/TokenContext";
import {DivType, InputType, LabelType} from "../../interface/label/LabelType";
import DivComponent from "../../component/div/DivComponent";
import ReCAPTCHA from "react-google-recaptcha";
import {procGetAxiosHeader, procPostAxiosHeader} from "../../axios/Axios";
import SystemNameComponent from "component/select/SelectComponent";
import { CodeDetail } from "utils/AdminCode";
import LabelComponent from "../../component/label/LabelComponent";
import InputComponent from "../../component/input/InputComponent";

function SignUpComponent() {

    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const userId = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const passwordConfirm = useRef<HTMLInputElement>();
    const department = useRef<HTMLInputElement>();
    const rankCode = useRef<HTMLInputElement>();
    const name = useRef<HTMLInputElement>();
    const emailMain = useRef<HTMLInputElement>();
    const emailDomain = useRef<HTMLInputElement>();
    const phoneArea = useRef<HTMLInputElement>();
    const phoneFirst = useRef<HTMLInputElement>();
    const phoneLast = useRef<HTMLInputElement>();
    const mobilePhoneFirstNumber = useRef<HTMLInputElement>();
    const mobilePhoneMiddleNumber = useRef<HTMLInputElement>();
    const mobilePhoneLastNumber = useRef<HTMLInputElement>();

    const [_emailCheck, setEmailCheck] = useState(false);
    const [userIdCheck, setUserIdCheck] = useState(false);
    const [captchaCheck, setCaptchaCheck] = useState(false);


    const [buttonDisable, setButtonDisable] = useState(false);
    const [idDisable, setIdDisable] = useState(false);
    const [emailDisable, setEmailDisable] = useState(false);
    const [emailInputYn, setEmailInputYn] = useState(true);

    const [sysCd, SetSysCd] = useState("default");
    const [inputPassword, setInputPassword] = useState("")
    const [inputConfirmPassword, setInputConfirmPassword] = useState("")
    const [inputPhoneArea, setInputPhoneArea] = useState("");
    const [inputPhoneFirst, setInputPhoneFirst] = useState("");
    const [inputPhoneLast, setInputPhoneLast] = useState("");
    const [inputMobileFirstNumber, setInputMobileFirstNumber] = useState("");
    const [inputMobileMiddleNumber, setInputMobileMiddleNumber] = useState("");
    const [inputMobileLastNumber, setInputMobileLastNumber] = useState("");
    const [smsRcpt,setSmsRcpt] = useState(false);

    const [emailCd, setEmailCd] = useState([{}])
    const [selectEmailCd, setSelectEmailCd] = useState('직접입력')

    // const regMobilePhone = /^(\+|\d)[0-9]{9,20}$/;
    const regMobilePhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const regPhoneArea = /^0([0-9]{1,3})$/;
    const regPhoneFirst = /[0-9]{3,4}$/;
    const regPhoneLast = /[0-9]{4}$/;
    const specialRule = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const regPwEngNum =  /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,}$/;
    const regPwEngNumSpc =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;

    const [idType]= useState<DivType>({
        className : "form-group",
        inputType: {
            type : "text",
            className : "form-control",
            ref : userId,
            placeholder : "아이디는 알파벳과 숫자로만 만드실 수 있습니다.(6자 ~ 32자)",
            onChange : idChange
        },
        labelType: {
            className : "form-label",
            htmlFor : "아이디",
            text : "* 아이디(아이디는 알파벳과 숫자로만 만드실 수 있습니다.)",
        }
    });
    const [passwordType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "password",
            className : "form-control",
            ref : password,
            placeholder : "Enter your password",
            onChange : () => setInputPassword(password.current?.value as string)
        },
        labelType: {
            className : "form-label",
            htmlFor : "password",
            text : "* 비밀번호",
        }
    });
    const [passwordConfirmType]= useState<DivType>({
        className : "form-group mb-5",
        inputType: {
            type : "password",
            className : "form-control",
            ref : passwordConfirm,
            placeholder : "Enter your password",
            onChange : () => setInputConfirmPassword(passwordConfirm.current?.value as string)
        },
        labelType: {
            className : "form-label",
            htmlFor : "password",
            text : "* 비밀번호 확인",
        }
    });
    const [departmentType]= useState<DivType>({
        className : "form-group mb-5 mt-5",
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
            text : "* 직급",
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
            text : "* 이름",
        }
    });
    const [emailLabel] = useState<LabelType>({
        className : "form-label w-100",
        text : "* 이메일"
    });
    const [emailMainType]= useState<InputType>({
        type : "text",
        className : "form-control bg-light text-center",
        ref : emailMain,
        onChange : emailMainChange,
    });
    // const [emailDomainType]= useState<InputType>({
    //     type : "text",
    //     className : "form-control bg-light text-center",
    //     ref : emailDomain,
    //     onChange : emailDomainChange,
    // });
    const [phoneLabel] = useState<LabelType>({
        className : "form-label w-100",
        text : "내선번호"
    });
    const [mobilePhoneLabel] = useState<LabelType>({
        className : "form-label w-100",
        text : "* 휴대폰번호"
    });
    const [phoneInputArea] = useState<InputType>({
        type : "text",
                className : "form-control w-25",
                ref : phoneArea,
                onChange : () => setInputPhoneArea(phoneArea.current?.value as string),
                maxLength : 4
    })
    const [phoneInputFirst] = useState<InputType>({
        type : "text",
                className : "form-control w-25",
                ref : phoneFirst,
                onChange : () => setInputPhoneFirst(phoneFirst.current?.value as string),
                maxLength : 4
    })
    const [phoneInputLast] = useState<InputType>({
        type : "text",
                className : "form-control w-25",
                ref : phoneLast,
                onChange : () => setInputPhoneLast(phoneLast.current?.value as string),
                maxLength : 4
    })

    const sysCdChange = (e) => {
        const value = e.value;
        SetSysCd(value)
    }

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "LOGIN", actTime: new Date().getTime().toString()})
        procGetAxiosHeader("/admin/group/" + CodeDetail.emailCd + "/details_list", {}, getEmailCd)
    }, []);

    useEffect( () => {
        if(selectEmailCd === '직접입력') {
            setEmailInputYn(true)
            emailDomainChange()
            if(emailDomain.current?.value !== null && emailDomain.current?.value !== undefined) {
                emailDomain.current.value = ''
            }
        } else {
            setEmailInputYn(false)
            emailDomainChange()
            if(emailDomain.current?.value !== null && emailDomain.current?.value !== undefined) {
                emailDomain.current.value = selectEmailCd
            }
        }
    }, [selectEmailCd])

    function getEmailCd(data) {
        setEmailCd(data)
    }

    useEffect(() => {
        if(_emailCheck && captchaCheck && userIdCheck){
            setButtonDisable(true)
        }else {
            setButtonDisable(false)
        }
    }, [_emailCheck, captchaCheck, userIdCheck,mobilePhoneFirstNumber, mobilePhoneMiddleNumber, mobilePhoneLastNumber]);

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
                        {
                            (password.current?.value as string)?.length > 0 || (passwordConfirm.current?.value as string)?.length > 0 ?
                                password.current?.value !== passwordConfirm.current?.value ?
                                    <div className="text-danger h6 mt-1">비밀번호가 일치하지 않습니다</div>
                                    : !regPwEngNum.test(password.current?.value as string) && !regPwEngNumSpc.test(password.current?.value as string) ?
                                        <div className="text-danger h6 mt-1">비밀번호는 숫자+영문자(10자이상) 또는 숫자+영문자+특수문자(8자이상)로 작성해주세요</div>
                                        : (password.current?.value as string)?.length > 100 ?
                                            <div className="text-danger h6 mt-1">비밀번호는 100자 이내로 작성해주세요</div>
                                            : ""
                                : ""
                        }
                        <SystemNameComponent onChange={sysCdChange} urlData={CodeDetail.sysCd} labelName="*소속기관" />
                        <DivComponent DivType={departmentType} />
                        <DivComponent DivType={rankCodeType}/>
                        <DivComponent DivType={nameType} />
                        <LabelComponent LabelType={emailLabel} />
                        <div className="form-group form-inline row">
                            <div className="col-md-10 input-group-text border-0">
                                <InputComponent InputType={emailMainType} />
                                <span className="self-center align-self-center m-1">@</span>
                                <input type="text" className="form-control bg-light text-center" disabled={!emailInputYn} ref={emailDomain as RefObject<any>} onChange={ () => { emailDomainChange() }} />
                                {/*<InputComponent InputType={emailDomainType} />*/}
                                <span className=" py-0 ps-1"/>
                                <select id="emailDomain" className='form-select' onChange={ (e) => {
                                    setSelectEmailCd(e.target.value)
                                }}>
                                    {emailCd.map( (e, index) => {
                                        return <option key={index} className="d-block" value={e['name']} selected={e['name'] === '직접입력'}>{e['name']}</option>
                                    })}
                                </select>
                                <span className=" py-0 ps-1"/>
                                <button disabled={emailDisable} className="btn btn-primary" onClick={emailCheck}>
                                    이메일 중복체크
                                </button>
                            </div>
                        </div>
                        <div className="form-group form-inline row">
                            <LabelComponent LabelType={phoneLabel} />
                            <div className="input-group-text border-0">
                                <InputComponent InputType={phoneInputArea} />
                                <span className="self-center align-self-center m-1">-</span>
                                <InputComponent InputType={phoneInputFirst} />
                                <span className="self-center align-self-center m-1">-</span>
                                <InputComponent InputType={phoneInputLast} />
                            </div>
                        </div>
                        {
                            ((!regPhoneArea.test(inputPhoneArea) || !regPhoneFirst.test(inputPhoneFirst) || !regPhoneLast.test(inputPhoneLast)) && (inputPhoneArea+inputPhoneFirst+inputPhoneLast).length>0?
                                <div>
                                    <div className="text-danger h6 mt-1">전화번호 형식에 맞지 않습니다</div>
                                </div>
                            :"")
                        }
                        <LabelComponent LabelType={mobilePhoneLabel} />
                        <div className="form-group form-inline row">
                            <div className="input-group-text border-0">
                                <input type="text" className="form-control w-25" ref={mobilePhoneFirstNumber as RefObject<any>} placeholder="ex)010" onChange={() => setInputMobileFirstNumber(mobilePhoneFirstNumber.current?.value as string)} maxLength={3} />
                                <span className="self-center align-self-center m-1">-</span>
                                <input type="text" className="form-control w-25" ref={mobilePhoneMiddleNumber as RefObject<any>} placeholder="ex)1234" onChange={() => setInputMobileMiddleNumber(mobilePhoneMiddleNumber.current?.value as string)} maxLength={4} />
                                <span className="self-center align-self-center m-1">-</span>
                                <input type="text" className="form-control w-25" ref={mobilePhoneLastNumber as RefObject<any>} placeholder="ex)5678" onChange={() => setInputMobileLastNumber(mobilePhoneLastNumber.current?.value as string)} maxLength={4} />
                            </div>
                            {
                                !(inputMobileFirstNumber.length === 0 && inputMobileMiddleNumber.length === 0 && inputMobileLastNumber.length === 0) ?
                                inputMobileFirstNumber.length === 3 && (inputMobileMiddleNumber.length >= 3 && inputMobileMiddleNumber.length <= 4) && inputMobileLastNumber.length === 4 ?
                                    (!regMobilePhone.test(inputMobileFirstNumber + '' + inputMobileMiddleNumber + '' + inputMobileLastNumber) && (inputMobileFirstNumber.length > 0 || inputMobileLastNumber.length > 0 || inputMobileMiddleNumber.length > 0)) ?
                                        <div className="text-danger h6 mt-1 mb-3">휴대폰번호 형식에 맞지 않습니다</div>
                                        : ""
                                    : <div className="text-danger h6 mt-1 mb-3">휴대폰번호 형식에 맞지 않습니다</div>
                                : ""
                            }
                        </div>
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
        let id = userId.current?.value as string;
        if(id.length<6 || id.length>32){
            alert('아이디는 6자~32자 이내로 작성해주세요.');
            return;
        }
        if(specialRule.test(id) || korean.test(id)){
            alert('아이디는 알파벳과 숫자로만 만드실 수 있습니다');
            return;
        }
        if(id.indexOf(" ") !== -1) {
            alert('아이디는 공백을 사용할 수 없습니다.')
            return
        }
        setUserIdCheck(true);
        procGetAxiosHeader(API_SIGN_PATH+"/members/userid/"+userId.current?.value+"/exist", {},idCheckResult);
    }

    function idChange(){
        setUserIdCheck(false);
        setIdDisable(false);
    }

    function emailMainChange() {
        setEmailCheck(false);
        setEmailDisable(false);
    }
    function emailDomainChange() {
        setEmailCheck(false);
        setEmailDisable(false);
    }

    function idCheckResult(result){
        if(!result){
            setUserIdCheck(true);
            setIdDisable(true);
            alert("중복된 아이디가 없습니다. 사용 가능합니다.");
        }else {
            setUserIdCheck(false);
            setIdDisable(false);
            alert("중복인 아이디가 존재합니다. 다른 아이디를 입력하세요.");
        }
    }

    function emailCheck(){
        var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(emailMain.current?.value === "" || emailDomain.current?.value === "") {
            alert('이메일을 입력해주세요.');
            return;
        }
        if (!regEmail.test( (emailMain.current?.value + '@' + emailDomain.current?.value) as string)) {
            alert('이메일 형식에 맞춰서 입력해주세요.');
            return;
        }else if((emailMain.current?.value + '@' + emailDomain.current?.value as string).length > 64){
            alert('이메일은 64자 이내로 작성해주세요');
            return;
        }
        procGetAxiosHeader(API_SIGN_PATH+"/members/email/"+ (emailMain.current?.value + '@' + emailDomain.current?.value) +"/exist", {},emailCheckResult);
    }

    function emailCheckResult(result){
        if(!result){
            setEmailCheck(true);
            setEmailDisable(true);
            alert("중복된 이메일이 없습니다. 사용 가능합니다.");
        }else {
            setEmailCheck(false);
            setEmailDisable(false);
            alert("중복인 이메일이 존재합니다. 다른 이메일을 입력하세요.");
        }
    }

    function recaptcha(value){
        let param = {
            response : value,
        }
        setCaptchaCheck(true);
        procPostAxiosHeader(API_SIGN_PATH+"/captcha-check", {},param,captchaResult,captchaResult);
    }

    function captchaResult(data){
        setCaptchaCheck(true);
    }

    function signUp() : void{
        if(password.current?.value !== passwordConfirm.current?.value){
            alert("비밀번호가 일치하지 않습니다")
            return;
        } else if((password.current?.value as string).length <= 0 || (passwordConfirm.current?.value as string).length <= 0) {
            alert("비밀번호를 입력하세요")
            return;
        } else {
            if(!regPwEngNum.test(password.current?.value as string) && !regPwEngNumSpc.test(password.current?.value as string)){
                alert("비밀번호는 숫자+영문자(10자이상) 또는 숫자+영문자+특수문자(8자이상)로 작성해주세요")
                return;
            }
            if((password.current?.value as string).length > 100){
                alert("비밀번호는 100자 이내로 작성해주세요")
                return;
            }
        }
        if(name.current?.value === ""){
            alert("이름을 입력해주세요")
            return;
        }else if((name.current?.value as string).length > 16){
            alert("이름은 16자 이내로 작성해주세요")
            return;
        }
        if(sysCd === "default"){
            alert("소속기관을 선택해주세요")
            return;
        }
        // if(department.current?.value === ""){
        //     alert('소속부서/팀을 입력해주세요')
        //     return;
        // }else
            if((department.current?.value as string).length > 256){
            alert('소속부서/팀은 256자 아내로 작성해주세요')
            return;
        }
        if(rankCode.current?.value === ""){
            alert('직급을 입력해주세요')
            return;
        }else if((rankCode.current?.value as string).length > 16){
            alert('직급은 16자 아내로 작성해주세요')
            return;
        }
        // if(!regPhone.test(phone.current?.value as string) && (phone.current?.value as string)!==""){
        //     alert('전화번호 형식에 맞춰서 입력해주세요')
        //     return;
        // }
        if((mobilePhoneFirstNumber.current?.value as string)==="" || (mobilePhoneMiddleNumber.current?.value as string)==="" || (mobilePhoneLastNumber.current?.value as string)===""){
            alert('휴대폰 번호를 입력해주세요')
            return;
        } else if(mobilePhoneFirstNumber.current?.value?.length !== 3 || (mobilePhoneMiddleNumber.current?.value?.length !== 3 && mobilePhoneMiddleNumber.current?.value?.length !== 4) || mobilePhoneLastNumber.current?.value?.length !== 4) {
            alert('휴대폰 번호 형식에 맞춰서 입력해주세요')
            return;
        } else if(!regMobilePhone.test(mobilePhoneFirstNumber.current?.value + '' + mobilePhoneMiddleNumber.current?.value + '' + mobilePhoneLastNumber.current?.value as string)){
            alert('휴대폰 번호 형식에 맞춰서 입력해주세요')
            return;
        }
        if((phoneArea.current?.value as string)!=="" || (phoneFirst.current?.value as string)!=="" || (phoneLast.current?.value as string)!==""){
            if((phoneArea.current?.value as string)==="" || (phoneFirst.current?.value as string)==="" || (phoneLast.current?.value as string)===""){
                alert('내선번호를 입력해주세요')
                return;
            } else if(phoneArea.current?.value?.length === 1 || (phoneFirst.current?.value?.length !== 3 && phoneFirst.current?.value?.length !== 4) || phoneLast.current?.value?.length !== 4) {
                alert('내선번호 형식에 맞춰서 입력해주세요')
                return;
            } else if(!regPhoneArea.test(phoneArea.current?.value as string)){
                alert('내선번호 형식에 맞춰서 입력해주세요')
                return;
            } else if(!regPhoneFirst.test(phoneFirst.current?.value as string)){
                alert('내선번호 형식에 맞춰서 입력해주세요')
                return;
            } else if(!regPhoneLast.test(phoneLast.current?.value as string)){
                alert('내선번호 형식에 맞춰서 입력해주세요')
                return;
            }
        }
        let chkPhone = (phoneArea.current?.value as string)+(phoneFirst.current?.value as string)+(phoneLast.current?.value as string);
        let chkMobileFirstNumber = mobilePhoneFirstNumber.current?.value as string;
        let chkMobileMiddleNumber = mobilePhoneMiddleNumber.current?.value as string;
        let chkMobileLastNumber = mobilePhoneLastNumber.current?.value as string;
        if(chkPhone.includes("-")){
            chkPhone = chkPhone.replace(/\-/g,'');
        }
        if(chkMobileFirstNumber.includes("-")){
            chkMobileFirstNumber = chkMobileFirstNumber.replace(/\-/g,'');
        }
        if(chkMobileMiddleNumber.includes("-")){
            chkMobileMiddleNumber = chkMobileMiddleNumber.replace(/\-/g,'');
        }
        if(chkMobileLastNumber.includes("-")){
            chkMobileLastNumber = chkMobileLastNumber.replace(/\-/g,'');
        }
        let model = {
            userId : userId.current?.value,
            password : password.current?.value,
            agencyCode : sysCd,
            departmentName : department.current?.value,
            username : name.current?.value,
            email : emailMain.current?.value + '@' + emailDomain.current?.value,
            telNumber : chkPhone,
            phoneNumber : chkMobileFirstNumber + '' + chkMobileMiddleNumber + '' + chkMobileLastNumber,
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


    function ok(data : any) : void {
        alert("회원가입 신청이 완료되었습니다.\n관리자 승인 후 이용 가능합니다.");
        navigate(ContextPath(API_DOMAIN_PATH.main));
    }

    function error(error : any) : void{
        alert(error);
    }
}


export default SignUpComponent
