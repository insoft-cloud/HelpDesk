import React, { useEffect } from "react";
// import 'assets/js/theme';


function HeaderComponent(){
    useEffect(()=> {
        import('assets/js/theme');
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand text-gray-900" href="{() => false}">
                    중소벤처24 Help Desk
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
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarLandings" data-bs-toggle="dropdown"
                               href="{() => false}" aria-expanded="false">
                                대시보드
                            </a>
                            <div className="dropdown-menu dropdown-menu-xl p-0" aria-labelledby="navbarLandings">
                                <div className="row gx-0">                                    
                                    <div className="col-12 col-lg-6">
                                        <div className="dropdown-body">
                                            <div className="row gx-0">
                                                <div className="col-6">

                                                    <h6 className="dropdown-header">
                                                        대시보드
                                                    </h6>
                                                    <a className="dropdown-item" href="{() => false}">
                                                        서비스 요청 현황
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarPages" data-bs-toggle="dropdown" href="{() => false}"
                                aria-expanded="false">
                                서비스
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg" aria-labelledby="navbarPages">
                                <div className="row gx-0">
                                    <div className="col-6">
                                        <div className="row gx-0">
                                            <div className="col-12 col-lg-6">

                                                <h6 className="dropdown-header">
                                                    서비스
                                                </h6>

                                                <a className="dropdown-item" href="{() => false}">
                                                    서비스 요청 목록
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarAccount" data-bs-toggle="dropdown"
                               href="{() => false}" aria-expanded="false">
                                포럼
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg" aria-labelledby="navbarPages">
                                <div className="row gx-0">
                                    <div className="col-6">
                                        <div className="row gx-0">
                                            <div className="col-12 col-lg-6">

                                                <h6 className="dropdown-header">
                                                    포럼
                                                </h6>

                                                <a className="dropdown-item" href="{() => false}">
                                                    공지사항
                                                </a>
                                                <a className="dropdown-item" href="{() => false}">
                                                    게시판
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDocumentation" data-bs-toggle="dropdown"
                               href="{() => false}" aria-expanded="false">
                                로그인
                            </a>
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
                                                <a className="dropdown-item" href="{() => false}">
                                                    활동 이력
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
};
export default HeaderComponent

