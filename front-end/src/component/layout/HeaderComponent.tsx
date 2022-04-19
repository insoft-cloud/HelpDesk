import React, { useEffect, useState } from "react";
import logo from "assets/img/ect-logo-big.svg";
import './HeaderComponent.css'
import AOS from 'aos';
import { ButtonComponent } from "component/button/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import {API_ADMIN_PATH, API_DOMAIN_PATH, API_LOGIN, API_MYPAGE, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import {useTokenDispatch, useTokenState, useTokenStateExpired} from "utils/TokenContext";

/**
 * @Project     : HelpDesk
 * @FileName    : HeaderComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 화면 상단에 고정되는 헤더 컴포넌트
 */

function HeaderComponent(){
    const navigate = useNavigate();
    let logCheck :string = '';
    let dispatch = useTokenDispatch()
    const auth = sessionStorage.getItem("auth");

    useState( () => {AOS.init(); AOS.refresh();});

    useEffect(()=> {
        import('assets/js/theme');
    }, []);
    // useTokenStateExpired(useTokenState().tokenExpired)
    // if(Number(useTokenState().tokenExpired) < new Date().getTime()){
    //     sessionStorage.clear();
    //
    // }
    let refreshToken = sessionStorage.getItem("refreshToken");
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
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <ButtonComponent btnClassName="nav-link" 
                            url={ContextPath(API_DOMAIN_PATH.serviceAll)} btnName="전체 서비스" />
                        </li>
                        <li className="nav-item">
                            <ButtonComponent btnClassName="nav-link" 
                            url={ContextPath(API_DOMAIN_PATH.myRequest)} btnName="요청 현황" />
                        </li>
                        <li className="nav-item">
                            <ButtonComponent btnClassName="nav-link" 
                            url={ContextPath(API_DOMAIN_PATH.notice)} btnName="공지사항" />
                        </li>
                        {(auth==='admin')?
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
                                                <ButtonComponent btnClassName="nav-link" 
                                                url={ContextPath(API_ADMIN_PATH.codeGroup)} btnName="서비스코드" />
                                                <ButtonComponent btnClassName="nav-link" 
                                                url={ContextPath(API_ADMIN_PATH.managerList)} btnName="서비스운영자" />
                                                <ButtonComponent btnClassName="nav-link" 
                                                url={ContextPath(API_ADMIN_PATH.memberManage)} btnName="회원관리" />
                                                <ButtonComponent btnClassName="nav-link"
                                                url={ContextPath(API_ADMIN_PATH.complimentStat)} btnName="민원통계" />
                                            </div>
                                        </div>
                                </div>
                        </li>
                        </>
                        :null}
                        <li className="nav-item drop-menu">
                            {(refreshToken==null)
                                ?  <ButtonComponent btnClassName="nav-link" url={ContextPath(API_LOGIN.singUp)} btnName="회원가입" />
                                :<>
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
                                                        <ButtonComponent btnClassName="nav-link"
                                                                         url={ContextPath(API_MYPAGE.alert)} btnName="알림 내역" />
                                                        <Link className="nav-link" onClick={logout} to={ContextPath(API_DOMAIN_PATH.main)}>{logCheck}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                </>
                            }
                        </li>
                        <li className="nav-item">
                            {(refreshToken==null)
                            ?<Link className="nav-link" id="navbarDocumentation" to={ContextPath(API_LOGIN.singIn)} aria-expanded="false">{logCheck}</Link>
                            :""}
                        </li>
                    </ul>
                    <ButtonComponent btnName='신규 요청' url={ContextPath(API_DOMAIN_PATH.serviceRequest)} btnClassName="navbar-btn btn btn-sm btn-primary lift ms-auto" />
                </div>
            </div>
        </nav>
    );

    function logout(data : any){

        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
        tokenExpired: data['tokenExpired'], user: data['userId'], name : data['userName'] });
        
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("refreshTokenExpired");
        navigate(ContextPath(API_DOMAIN_PATH.main));
    }
};
export default HeaderComponent

