import React from 'react'

function NoticeComponent() {

    return (
        <div className="container-fluid">
            <span>
                <a href="{() => false}">
                    공지사항
                </a>
            </span>
            <ul className="list mb-0 ">
                <li className="list-item">
                    <a className="list-link" href="{() => false}">[알림] 시스템 업데이트 작업</a>
                </li>
                <li className="list-item">
                    <a className="list-link" href="{() => false}">[공지] 이용약관 개정 안내</a>
                </li>
            </ul>
        </div>
    );
};
export default NoticeComponent
