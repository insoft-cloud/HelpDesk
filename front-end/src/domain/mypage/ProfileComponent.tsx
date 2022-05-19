/**
 * @Project     : HelpDesk
 * @FileName    : ProfileComponent.tsx
 * @Date        : 2022-03-11
 * @author      : 김수진
 * @description : 프로필관리 컴포넌트
 */

import {procGetAxios, procGetAxiosHeader, procGetAxiosParameter, procPostAxios} from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import TittleComponent from "component/div/TittleComponent";
import moment from "moment";
import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { API_DOMAIN_PATH, API_SIGN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import {CodeDetail} from "../../utils/AdminCode";
import SystemNameComponent from "../../component/select/SelectComponent2";

function ProfileComponent(){
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const state = useTokenState();
    const [userData, setUserData] = useState<Object>('');
    const [agency,setAgency] = useState([]);
    const [url] = useState("/user/member/"+state.user);
    const [contentType] = useState("application/json");
    const [agencyCd,setAgencyCd] = useState("");
    const [agencyCdTableValue, setAgencyCdTableValue] = useState({});
    const [emailMain,setEmailMain] = useState("");
    const [emailDomain,setEmailDomain] = useState("");
    // const emailCf = useRef<HTMLInputElement>();
    const [_emailCheck, setEmailCheck] = useState(false);
    const [department,setDepartment] = useState("");
    const [rank,setRank] = useState("");
    const [phoneFirstNumber,setPhoneFirstNumber] = useState("");
    const [phoneMiddleNumber,setPhoneMiddleNumber] = useState("");
    const [phoneLastNumber,setPhoneLastNumber] = useState("");
    const [password,setPassword] = useState("");
    const [chkPassword,setChkPassword] = useState("");
    const [smsRcpt,setSmsRcpt] = useState(false);
    const [emailCf,setEmailCf] = useState(true);
    const regMobilePhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const regPwEngNum =  /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,}$/;
    const regPwEngNumSpc =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;

    const [emailCd, setEmailCd] = useState([{}])
    const [selectEmailCd] = useState('직접입력')
    const [emailInputYn, setEmailInputYn] = useState(true)

    // let sub_user_data ;
    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "profile", actTime: new Date().getTime().toString()})
        getData();
    }, [url,contentType]);

    useEffect( () => {
        procGetAxios("/admin/group/" + CodeDetail.emailCd + "/details_list", state.token, "application/json", getEmailCd)
    }, [state.token])

    useEffect( () => {
        if(selectEmailCd === '직접입력') {
            setEmailInputYn(true)
        } else {
            setEmailInputYn(false)
        }
    }, [selectEmailCd])

    function getEmailCd(data) {
        setEmailCd(data)
    }

    function getData(){
        procGetAxios(url,state.token,contentType,setData);
    }
    function setData(data) {
        setUserData(data)
        // sub_user_data = data;
        setDepartment(data['departmentName'])
        if(data['phoneNumber'].length == 11) {
            setPhoneFirstNumber(data['phoneNumber'].substring(0, 3))
            setPhoneMiddleNumber(data['phoneNumber'].substring(3, 7))
            setPhoneLastNumber(data['phoneNumber'].substring(7, data['phoneNumber'].length))
        } else {
            setPhoneFirstNumber(data['phoneNumber'].substring(0, 3))
            setPhoneMiddleNumber(data['phoneNumber'].substring(3, 6))
            setPhoneLastNumber(data['phoneNumber'].substring(6, data['phoneNumber'].length))
        }
        setEmailMain(data['email'].substring(0, data['email'].lastIndexOf('@')))
        setEmailDomain(data['email'].substring(data['email'].lastIndexOf('@') + 1, data['email'].length))
        setRank(data['rankCode'])
        setAgencyCd(data['agencyCode']);
        setSmsRcpt(data['smsRcptYN']==='Y'?true:false)
        procGetAxiosParameter("admin/group/SYS/details",state.token,contentType,data['agencyCode'],setCode);
    }

    function error (){
        console.log(error)
    }
    function setCode(data, key){

        data.content.forEach(r => {
            if(r['cdId'] === key){
                setAgencyCdTableValue({
                    value: r['cdId'],
                    label: r['name']
                });
                console.log(agencyCdTableValue)
            }
        })
        setAgency(data.content)
    }
    function signOut(data:any){
        if(window.confirm("중소벤처24 헬프 데스크를 탈퇴하시겠습니까?")){
            let body={
                userId : state.user,
                delYn : "Y",
                updateDt : moment()
            }
            procPostAxios("/user/member/"+state.user,state.token,contentType,body,getData,error)

            localStorage.removeItem("refreshToken");
            localStorage.removeItem("refreshTokenExpired");
            navigate(ContextPath(API_DOMAIN_PATH.main));
            alert("중소벤처24 헬프 데스크를 탈퇴하였습니다.");
        }
    }
    function save(){
        if(!regPwEngNum.test(password) && !regPwEngNumSpc.test(password)){
            alert("비밀번호는 숫자+영문자(10자이상) 또는 숫자+영문자+특수문자(8자이상)로 작성해주세요")
            return;
        }
        if(password.length > 100){
            alert("비밀번호는 100자 이내로 작성해주세요")
            return;
        }
        // if(department === ""){
        //     alert('소속부서/팀을 입력해주세요')
        //     return;
        // }else if(department.length > 256){
        //     alert('소속부서/팀은 256자 아내로 작성해주세요')
        //     return;
        // }
        if(rank === ""){
            alert('직급을 입력해주세요')
            return;
        }else if(rank.length > 16){
            alert('직급은 16자 아내로 작성해주세요')
            return;
        }
        if(password===chkPassword){
            if(phoneFirstNumber === "" || phoneMiddleNumber === "" || phoneLastNumber === ""){
                alert('휴대폰 번호를 입력해주세요')
                return;
            } else if(phoneFirstNumber.length !== 3 || (phoneMiddleNumber.length < 3 || phoneMiddleNumber.length > 4) || phoneLastNumber.length !== 4) {
                alert('휴대폰 번호 형식에 맞춰서 입력해주세요')
                return;
            }
            else if(!regMobilePhone.test(phoneFirstNumber + "" + phoneMiddleNumber + "" + phoneLastNumber)){
                alert('휴대폰 번호 형식에 맞춰서 입력해주세요')
                return;
            }
            if(_emailCheck || userData['email']===emailMain + '@' + emailDomain){
                let body = {
                    agencyCode : agencyCdTableValue['value'],
                    departmentName : department,
                    email : emailMain + '@' + emailDomain,
                    rankCode : rank,
                    phoneNumber : phoneFirstNumber + "" + phoneMiddleNumber + "" + phoneLastNumber,
                    smsRcptYN : smsRcpt?"Y":"N",
                    password : password===""?null:password
                }
                procPostAxios("/user/member/"+state.user,state.token,contentType,body,getData,error)
                alert("수정되었습니다.");
                setPassword("");
                setChkPassword("");
            }else{
                alert("이메일 중복체크 버튼을 확인해주세요");
            }
            // procPostAxios(API_SIGN_PATH+"/signin","","application/json", body, send, ()=>alert("비밀번호를 확인해주세요"));
        }

    }
    // function send(){
    //     if(_emailCheck || userData['email']===email){
    //         let body = {
    //             agencyCode : agencyCd,
    //             departmentName : department,
    //             email : email,
    //             rankCode : rank,
    //             phoneNumber : phone,
    //             smsRcptYN : smsRcpt?"Y":"N"
    //         }
    //         procPostAxios("/user/member/"+state.user,state.token,contentType,body,getData,error)
    //         alert("수정되었습니다.");
    //         setPassword("");
    //         setChkPassword("");
    //     }else{
    //         alert("이메일 중복체크 버튼을 확인해주세요");
    //     }
    // }
    function emailCheck(){
        var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(emailMain === "" || emailDomain === ""){
            alert('이메일을 입력해주세요.');
            return;
        }
        if (!regEmail.test(emailMain + '@' + emailDomain as string)) {
            alert('이메일 형식에 맞춰서 입력해주세요.');
            return;
        }else if((emailMain + '@' + emailDomain as string).length > 64){
            alert('이메일은 64자 이내로 작성해주세요');
            return;
        }
        procGetAxiosHeader(API_SIGN_PATH+"/members/email/"+ (emailMain + '@' + emailDomain) +"/exist", {},emailCheckResult);
    }

    function emailCheckResult(result){
        if(!result){
            setEmailCheck(true);
            setEmailCf(true);
            alert("중복된 이메일이 없습니다. 사용 가능합니다.");
        }else {
            setEmailCheck(false);
            setEmailCf(false);
            alert("중복인 이메일이 존재합니다. 다른 이메일을 입력하세요.");
        }
    }

    function codeChange(e){
        console.log(e)
    }

    return(
        <section>
            <TittleComponent tittle={"프로필 관리"} subTittle={"사용자의 개인정보를 확인해주세요."} />
            <div className="position-relative">
                <div className="shape shape-bottom shape-fluid-x text-light">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <div className="content-wrap">
                <div className="d-flex justify-content-center mt-5">
                    <div className="m-5 w-50">
                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                * 아이디
                            </label>
                            <div className="col-md-10  text-center align-self-center">
                                {userData['userId']}
                            </div>
                        </div>
                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                * 비밀번호
                            </label>
                            <div className="col-md-10">
                                <input className="form-control bg-light" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
                            </div>
                        </div>
                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                * 비밀번호확인
                            </label>
                            <div className="col-md-10">
                                <input className={"form-control bg-light "+(password!==chkPassword?"text-danger border-danger":"") } value={chkPassword} onChange={e=>setChkPassword(e.target.value)} type="password" />
                            </div>
                        </div>
                        {
                            password.length > 0 || chkPassword.length > 0 ?
                                password !== chkPassword ?
                                    <div className="text-danger h6 mt-1">비밀번호가 일치하지 않습니다</div>
                                    : !regPwEngNum.test(password) && !regPwEngNumSpc.test(password) ?
                                        <div className="text-danger h6 mt-1">비밀번호는 숫자+영문자(10자이상) 또는 숫자+영문자+특수문자(8자이상)로 작성해주세요</div>
                                        : password.length > 100 ?
                                            <div className="text-danger h6 mt-1">비밀번호는 100자 이내로 작성해주세요</div>
                                            : ""
                                : ""
                        }
                        <div className="form-group form-inline row">
                            <SystemNameComponent onChange={setAgencyCdTableValue} urlData={CodeDetail.sysCd}labelName="*소속기관" defaultName={agencyCdTableValue}  />
                            {/*<div className="col-md-10">*/}
                            {/*    <select className=" form-control form-select text-center" value={agencyCd} onChange={e=>setAgencyCd(e.target.value)}>*/}
                            {/*    {agency.map((e,i)=>{*/}
                            {/*            return <option className="d-block" key={i} value={e['cdId']}>{e['name']}</option>*/}
                            {/*        })}*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                        </div>
                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                소속부서/팀
                            </label>
                            <div className="col-md-10">
                                <input className="form-control bg-light text-center" type="text" value={department} onChange={e=>{setDepartment(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                * 직급
                            </label>
                            <div className="col-md-10">
                                <input className="form-control bg-light text-center" type="text" value={rank} onChange={e=>{setRank(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                * 이름
                            </label>
                            <div className="col-md-10 text-center align-self-center">
                                {userData['username']}
                            </div>
                        </div>
                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                * 이메일
                            </label>
                            <div className="col-md-10 input-group-text border-0">
                                <input className="form-control bg-light text-center" type="text" value={emailMain} onChange={ e => {
                                    setEmailMain(e.target.value);
                                    if(userData['email'] !== e.target.value + '@' + emailDomain) {
                                        setEmailCheck(false);
                                        setEmailCf(false);
                                    } else {
                                        setEmailCheck(true);
                                        setEmailCf(true);
                                    }}}/>
                                <span className="self-center align-self-center m-1">@</span>
                                {
                                    emailInputYn ?
                                        <input className="form-control bg-light text-center" type="text" value={emailDomain} onChange={ e => {
                                            setEmailDomain(e.target.value);
                                            if(userData['email'] !== emailMain + '@' + e.target.value) {
                                                setEmailCheck(false);
                                                setEmailCf(false);
                                            } else {
                                                setEmailCheck(true);
                                                setEmailCf(true);
                                            }}}/>
                                        : <input className="form-control bg-light text-center " type="text" value={emailDomain} disabled onChange={ e => {
                                            setEmailDomain(e.target.value);
                                            if(userData['email'] !== emailMain + '@' + e.target.value) {
                                                setEmailCheck(false);
                                                setEmailCf(false);
                                            } else {
                                                setEmailCheck(true);
                                                setEmailCf(true);
                                            }}}/>
                                }
                                <span className=" py-0 ps-1"/>
                                <select id="emailInputYn" className='form-select' onChange={e=> e.target.value === '직접입력' ?
                                    (setEmailInputYn(true), setEmailDomain(''), setEmailCf(false), setEmailCheck(false))
                                    : (userData['email'].substring(userData['email'].lastIndexOf('@') + 1, userData['email'].length) === e.target.value ?
                                        (setEmailInputYn(false), setEmailDomain(e.target.value), setEmailCf(true), setEmailCheck(true))
                                        : (setEmailInputYn(false), setEmailDomain(e.target.value), setEmailCf(false), setEmailCheck(false))) }>
                                    {emailCd.map( (e, index) => {
                                        return <option key={index} className="d-block" value={e['name']} selected={e['name'] === '직접입력'}>{e['name']}</option>
                                    })}
                                </select>
                                <span className=" py-0 ps-1"/>
                                <button className="btn btn-primary " onClick={emailCheck} disabled={emailCf}>
                                    이메일 중복체크
                                </button>
                            </div>
                        </div>

                        <div className="form-group form-inline row">
                            <label className="col-form-label col-md-2">
                                * 휴대폰
                            </label>
                            <div className="col-md-10 d-flex m-0">
                                <input className="form-control bg-light text-center w-25" type="text" value={phoneFirstNumber} onChange={e=>{setPhoneFirstNumber(e.target.value)}} maxLength={3}/>
                                <span className="self-center align-self-center m-1">-</span>
                                <input className="form-control bg-light text-center w-50" type="text" value={phoneMiddleNumber} onChange={e=>{setPhoneMiddleNumber(e.target.value)}} maxLength={4}/>
                                <span className="self-center align-self-center m-1">-</span>
                                <input className="form-control bg-light text-center w-50" type="text" value={phoneLastNumber} onChange={e=>{setPhoneLastNumber(e.target.value)}} maxLength={4}/>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" id="chk" checked={smsRcpt} onChange={e=>setSmsRcpt(e.target.checked)}/>
                            <label className="col-form-label" htmlFor="chk">
                                서비스 요청 진행사항을 문자메세지로 받습니다.
                            </label>
                        </div>
                        <div className="d-flex justify-content-between mb-2 align-items-center mt-5">
                            <div className="col-6 d-flex">
                                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1" btnName="회원탈퇴" onEventHandler={signOut} url={"null"} />
                            </div>
                            <div className="col-auto ms-auto fs-sm text-muted">
                                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2  ml-3" btnName="취소" onEventHandler={null} url={ContextPath(API_DOMAIN_PATH.main)} />
                                <AdminButtonComponent btnClassName="btn btn-xs btn-outline-dark rounded-1 ms-2 ml-3" btnName="저장" onEventHandler={save} url={"null"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileComponent;
