import React from 'react'

function NoticeListComponent() {

    return (
        <div className="container">
            <div className="row justify-content-between m-5">
                <div className="col-11 p-2">
                    <a className="text-gray-900 text-decoration-underline fw-bold" href="{() => false}">
                        공지사항
                    </a>
                </div>
                <div className="col-1 p-2">
                    <a href="{() => false}">
                        더보기
                    </a>
                </div>
                <div className="col-12">
                    <ul className="list mb-0 ">
                        <li className="list-item">
                            <a className="list-link" href="{() => false}">[알림]시스템 업데이트 작업</a>
                        </li>
                        <li className="list-item">
                            <a className="list-link" href="{() => false}">[공지]이용약관 개정 안내</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default NoticeListComponent
