import React, { useEffect } from "react";
import 'assets/js/theme';

// Transition
const transitionDuration = 200;

// Breakpoint
const desktopSize = 992;

function HeaderComponent(){

    useEffect(()=> {
        const showEvents = ['mouseenter', 'focusin'];
        const hideEvents = ['mouseleave', 'click', 'focusout'];
        let drops = document.querySelectorAll('.navbar-nav .dropdown, .navbar-nav .dropend');
        console.log(drops);
        drops.forEach(function (dropdown) {
            const menu = dropdown.querySelector('.dropdown-menu');
            // Show drop
            showEvents.forEach(function (event) {
                dropdown.addEventListener(event, function () {
                    showDrop(menu);
                });
            });

            // Hide drop
            hideEvents.forEach(function (event) {
                dropdown.addEventListener(event, function (e) {
                    hideDrop(e, menu);
                });
            });
        });
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand" href="{() => false}">
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
}

function showDrop(menu) {
    if (window.innerWidth < desktopSize) {
        return;
    }

    menu.classList.add('showing');

    setTimeout(function () {
        menu.classList.remove('showing');
        menu.classList.add('show');
    }, 1);
}

// Hide drop
function hideDrop(e, menu) {
    setTimeout(function () {
        if (window.innerWidth < desktopSize) {
            return;
        }

        if (!menu.classList.contains('show')) {
            return;
        }

        if (e.type === 'click' && e.target.closest('.dropdown-menu form')) {
            return;
        }

        menu.classList.add('showing');
        menu.classList.remove('show');

        setTimeout(function () {
            menu.classList.remove('showing');
        }, transitionDuration);
    }, 2);
}

export default HeaderComponent

