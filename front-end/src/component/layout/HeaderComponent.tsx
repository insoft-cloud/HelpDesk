import React, { useEffect, useState } from "react";
import logo from "assets/img/ect-logo-big.svg";
import './HeaderComponent.css'
import AOS from 'aos';
import { ButtonComponent } from "component/button/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import {API_ADMIN_PATH, API_DOMAIN_PATH, API_LOGIN, API_MYPAGE, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import TimerComponent from "./TimerComponent";
import {procGetAxios} from "../../axios/Axios";
import {AuthCode} from "../../utils/AdminCode";

/**
 * @Project     : HelpDesk
 * @FileName    : HeaderComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 화면 상단에 고정되는 헤더 컴포넌트
 */

function HeaderComponent(){
    const state = useTokenState();
    const auth = state.auth;
    const navigate = useNavigate();
    let logCheck :string = '';
    let dispatch = useTokenDispatch();
    const contentType = "application/json"
    const [authName, setAuthName] = useState('')

    useState( () => {AOS.init(); AOS.refresh();});

    useEffect(()=> {
        import('assets/js/theme');
    }, []);

    useEffect( () => {
        if(auth !== null && auth !== undefined) {
            procGetAxios('/admin/auth/' + auth, state.token, contentType, getAuthName)
        }
    }, [auth])

    function getAuthName(data) {
        setAuthName(data.name)
    }

    let refreshToken = localStorage.getItem("refreshToken");
    if(refreshToken==null){
        logCheck = '로그인';
    }else{
        logCheck = '로그아웃';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div className="container-fluid">
                <Link className="navbar-brand" to={ContextPath(API_DOMAIN_PATH.main)} >
                    <img src={ logo } className="navbar-brand-img" alt="중소벤처24 Help Desk" />
                    <span>Help Desk</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <i className="fe fe-x"></i>
                    </button>
                    <ul className="navbar-nav nav d-flex content_wrap justify-content-center fl_left">
                        {state.auth !== AuthCode.superAdmin ?
                            <>
                            <li className="nav-item">
                                <ButtonComponent btnClassName="nav-link"
                                                 url={ContextPath(API_DOMAIN_PATH.serviceAll)} btnName="전체 서비스"/>
                            </li>
                            <li className="nav-item">
                                <ButtonComponent btnClassName="nav-link"
                                                 url={ContextPath(API_DOMAIN_PATH.myRequest)} btnName="요청 현황"/>
                            </li>
                            </>
                            : null
                        }
                        <li className="nav-item">
                            <ButtonComponent btnClassName="nav-link"
                                             url={ContextPath(API_DOMAIN_PATH.notice)} btnName="공지사항" />
                        </li>
                        {(auth===AuthCode.superAdmin || auth===AuthCode.Admin || auth===AuthCode.Manager)?
                        <>
                        <li className="nav-item drop-menu">
                            <a className="nav-link dropdown-toggle" id="navbarDocumentation"  data-bs-toggle="dropdown"
                               href="{() => false}" >
                                서비스관리
                            </a>
                            <div className="nav-item drop-menu-sub">
                                        <div className="row gx-0">
                                            <div className="col-12 col-lg-12">

                                                <h6 className="dropdown-header">
                                                    서비스관리
                                                </h6>
                                                {auth===AuthCode.Admin?
                                                    <>
                                                <ButtonComponent btnClassName="nav-link"
                                                url={ContextPath(API_ADMIN_PATH.codeGroup)} btnName="서비스코드" />
                                                <ButtonComponent btnClassName="nav-link" 
                                                url={ContextPath(API_ADMIN_PATH.managerList)} btnName="서비스담당자" />
                                                <ButtonComponent btnClassName="nav-link"
                                                 url={ContextPath(API_ADMIN_PATH.complimentStat)} btnName="민원통계" />
                                                    </>
                                                :
                                                    ""}
                                                <ButtonComponent btnClassName="nav-link"
                                                url={ContextPath(API_ADMIN_PATH.memberManage)} btnName="회원관리" />


                                            </div>
                                        </div>
                                </div>
                        </li>
                        </>
                        :null}
                        <li className="nav-item drop-menu">
                            {(refreshToken==null)
                                ?  <ButtonComponent btnClassName="nav-link" url={ContextPath(API_LOGIN.singUp)} btnName="회원가입" />
                                :   <>
                                    <a className="nav-link dropdown-toggle" id="navbarDocumentation" data-bs-toggle="dropdown"
                                       href="{() => false}" >
                                        마이페이지
                                    </a>
                                    <div className="nav-item drop-menu-sub" aria-labelledby="navbarPages">
                                                <div className="row gx-0">
                                                    <div className="col-12 col-lg-12">

                                                        <h6 className="dropdown-header">
                                                            마이페이지
                                                        </h6>

                                                        <ButtonComponent btnClassName="nav-link"
                                                                         url={ContextPath(API_MYPAGE.profile)} btnName="프로필 관리" />
                                                        {state.auth !== AuthCode.superAdmin ?
                                                            <ButtonComponent btnClassName="nav-link"
                                                                             url={ContextPath(API_MYPAGE.alert)}
                                                                             btnName="알림 내역"/>
                                                        :null}
                                                    </div>
                                                </div>
                                            </div>
                                    </>
                            }
                        </li>
                        <li className="nav-item">
                            {(refreshToken==null)
                            ?<Link className="nav-link" id="navbarDocumentation" to={ContextPath(API_LOGIN.singIn)} aria-expanded="false">{logCheck}</Link>
                            :<Link className="nav-link" onClick={logout} to={ContextPath(API_DOMAIN_PATH.main)}>{logCheck}</Link>}
                        </li>
                        {
                            (refreshToken!=null) ?
                                <div className="list-link">
                                    <ButtonComponent btnClassName="nav-link"
                                                     url={ContextPath(API_MYPAGE.profile)}
                                                     btnName={state.name + ' / ' + authName} />
                                    <TimerComponent key={state.actTime} />
                                </div>
                                : null
                        }
                    </ul>
                </div>
                {(auth!==AuthCode.superAdmin)?<ButtonComponent btnName='신규 요청' url={ContextPath(API_DOMAIN_PATH.serviceRequest)} btnClassName="navbar-btn btn btn-sm btn-primary lift absolute-right" />:""}
            </div>
        </nav>
    );

    function logout(data : any){

        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
        tokenExpired: data['tokenExpired'], user: data['userId'], name : data['userName'], auth : data['auth'], actTime: new Date().getTime().toString() });

        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenExpired");
        navigate(ContextPath(API_DOMAIN_PATH.main));
    }
};
export default HeaderComponent

