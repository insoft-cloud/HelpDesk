import React, { useEffect, useState } from "react";
import logo from "assets/img/ect-logo-big.svg";
import './HeaderComponent.css'
import { ButtonComponent } from "component/button/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import {API_DOMAIN_PATH, API_LOGIN, ContextPath} from "../../utils/ContextPath";
import { useTokenDispatch } from "utils/TokenContext";

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

    useEffect(()=> {
        import('assets/js/theme');
    }, []);  

    let refreshToken = sessionStorage.getItem("refreshToken");
    if(refreshToken==null){
        logCheck = '로그인';
    }else{
        logCheck = '로그아웃';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand" href="{() => false}">
                    <img src={ logo } className="navbar-brand-img" alt="중소벤처24 Help Desk" />
                    <span>Help Desk</span>
                </a>
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
                            url={API_DOMAIN_PATH.serviceAll} btnName="전체 서비스" />
                        </li>
                        <li className="nav-item">
                            <ButtonComponent btnClassName="nav-link" 
                            url={API_DOMAIN_PATH.myWork} btnName="요청 현황" />
                        </li>
                        <li className="nav-item">
                            <ButtonComponent btnClassName="nav-link" 
                            url={API_DOMAIN_PATH.notice} btnName="공지사항" />
                        </li>
                        <li className="nav-item">
                            {(refreshToken==null)
                            ?<Link className="nav-link" id="navbarDocumentation" to={ContextPath(API_LOGIN.singIn)} aria-expanded="false">{logCheck}</Link>
                            : <Link className="nav-link" onClick={logout} to={ContextPath(API_DOMAIN_PATH.main)}>{logCheck}</Link>}

                            
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDocumentation" data-bs-toggle="dropdown"
                               href="{() => false}" aria-expanded="false">
                                마이페이지
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg" aria-labelledby="navbarPages">
                                <div className="row gx-0">
                                    <div className="col-6">
                                        <div className="row gx-0">
                                            <div className="col-12 col-lg-6">

                                                <h6 className="dropdown-header">
                                                    마이페이지
                                                </h6>

                                                <a className="dropdown-item" href="{() => false}">
                                                    프로필 관리
                                                </a>
                                                <a className="dropdown-item" href="{() => false}">
                                                    알림 내역
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>


    );

    function logout(data : any){
        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
        tokenExpired: data['tokenExpired'] });
        
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("refreshTokenExpired");
        navigate(ContextPath(API_DOMAIN_PATH.main));
    }
};
export default HeaderComponent

