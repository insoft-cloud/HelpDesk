/**
 * @Project     : HelpDesk
 * @FileName    : ProfileComponent.tsx
 * @Date        : 2022-03-11
 * @author      : 김수진
 * @description : 프로필관리 컴포넌트
 */

import { procGetAxios, procGetAxiosHeader, procPostAxios } from "axios/Axios";
import AdminButtonComponent from "component/button/AdminButtonComponent";
import TittleComponent from "component/div/TittleComponent";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DOMAIN_PATH, API_SIGN_PATH, ContextPath } from "utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import LoginModel from "../../interface/Login/LoginModel";

function ProfileComponent(){
    let dispatch = useTokenDispatch();
    const navigate = useNavigate();
    const state = useTokenState();
    const [userData, setUserData] = useState<Object>('');
    const [agency,setAgency] = useState([]);
    const [url] = useState("/user/member/"+state.user);
    const [contentType] = useState("application/json");
    const [agencyCd,setAgencyCd] = useState("");
    const [email,setEmail] = useState("");
    // const emailCf = useRef<HTMLInputElement>();
    const [_emailCheck, setEmailCheck] = useState(false);
    const [department,setDepartment] = useState("");
    const [rank,setRank] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [chkPassword,setChkPassword] = useState("");
    const [smsRcpt,setSmsRcpt] = useState(false);
    const [emailCf,setEmailCf] = useState(true);
    let sub_user_data ;
    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "profile"})
        getData();
    }, [url,contentType,state.token]);
    function getData(){
    procGetAxios(url,state.token,contentType,setData);
    procGetAxios("admin/group/SYS/details",state.token,contentType,setCode);
    }
    function setData(data) {
        setUserData(data)
        sub_user_data = data;
        setDepartment(data['departmentName'])
        setPhone(data['phoneNumber'])
        setEmail(data['email'])
        setRank(data['rankCode'])
        setAgencyCd(data['agencyCode'])
        setSmsRcpt(data['smsRcptYN']==='Y'?true:false)
    }
    function error (){
        console.log(error)
    }
    function setCode(data){
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
            
            sessionStorage.removeItem("refreshToken");
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("refreshTokenExpired");
            navigate(ContextPath(API_DOMAIN_PATH.main));    
            alert("중소벤처24 헬프 데스크를 탈퇴하였습니다.");
        }
    }
    function save(){
        if(password===chkPassword){
            // let loginModel : LoginModel = new LoginModel(state.user, password);
            if(_emailCheck || userData['email']===email){
                let body = {
                    agencyCode : agencyCd,
                    departmentName : department,
                    email : email,
                    rankCode : rank,
                    phoneNumber : phone,
                    smsRcptYN : smsRcpt?"Y":"N",
                    password : password===""?null:password
                }
                console.log(body)
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
    function send(){
        if(_emailCheck || userData['email']===email){
            let body = {
                agencyCode : agencyCd,
                departmentName : department,
                email : email,
                rankCode : rank,
                phoneNumber : phone,
                smsRcptYN : smsRcpt?"Y":"N"
            }
            procPostAxios("/user/member/"+state.user,state.token,contentType,body,getData,error)
            alert("수정되었습니다.");
            setPassword("");
            setChkPassword("");
        }else{
            alert("이메일 중복체크 버튼을 확인해주세요");
        }
    }
    function emailCheck(){
        if(email!==userData['email']){
            procGetAxiosHeader(API_SIGN_PATH+"/members/email/"+email+"/exist", {},emailCheckResult);
        }
    }
    function emailCheckResult(result){
        if(!result){
            setEmailCheck(true);
            setEmailCf(true)
            alert("중복체크 완료");
        }else {
            setEmailCheck(false);
            alert("이메일 중복입니다.");
        }
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
                            아이디
                        </label>
                        <div className="col-md-10  text-center">
                            {userData['userId']}
                        </div>
                    </div>
                    <div className="form-group form-inline row">
                        <label className="col-form-label col-md-2">
                            비밀번호
                        </label>
                        <div className="col-md-10">
                            <input className="form-control bg-light" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
                        </div>
                    </div>
                    <div className="form-group form-inline row">
                        <label className="col-form-label col-md-2">
                            비밀번호확인
                        </label>
                        <div className="col-md-10">
                            <input className={"form-control bg-light "+(password!==chkPassword?"text-danger border-danger":"") } value={chkPassword} onChange={e=>setChkPassword(e.target.value)} type="password" />
                        </div>
                    </div>
                    <div className="form-group form-inline row">
                        <label className="col-form-label col-md-2">
                            소속기관
                        </label>
                        <div className="col-md-10">
                            <select className=" form-control form-select text-center" value={agencyCd} onChange={e=>setAgencyCd(e.target.value)}>
                            {agency.map((e,i)=>{
                                    return <option className="d-block" key={i} value={e['cdId']}>{e['name']}</option>
                                })}
                            </select>
                        </div>
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
                            직급
                        </label>
                        <div className="col-md-10">
                            <input className="form-control bg-light text-center" type="text" value={rank} onChange={e=>{setRank(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="form-group form-inline row">
                        <label className="col-form-label col-md-2">
                            이름
                        </label>
                        <div className="col-md-10 text-center">
                            {userData['username']}
                        </div>
                    </div>
                    <div className="form-group form-inline row">
                        <label className="col-form-label col-md-2">
                            이메일
                        </label>
                        <div className="col-md-8">
                        <input className="form-control bg-light text-center"type="text" value={email} onChange={e=>{setEmail(e.target.value); setEmailCheck(false); setEmailCf(false)}}/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary form-button" onClick={emailCheck} disabled={emailCf}>
                                중복체크
                            </button>
                        </div>
                    </div>
                    <div className="form-group form-inline row">
                        <label className="col-form-label col-md-2">
                            휴대폰
                        </label>
                        <div className="col-md-10">
                        <input className="form-control bg-light text-center" type="text" value={phone} onChange={e=>{setPhone(e.target.value)}}/>
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