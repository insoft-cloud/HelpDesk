import React from 'react'

function RequestListComponent() {
    return (
        <div>
            <span>
                <a href="{() => false}">
                     최근 등록된 업무 목록
                </a>
            </span>
            <ul className="list mb-0 ">
                <li className="list-item">
                    <a className="list-link" href="{() => false}">[장애] 이지패스 회원가입 오류 있습니다. 확인해주세요.</a>
                </li>
                <li className="list-item">
                    <a className="list-link" href="{() => false}">[개선] 이용안내 내용이 업데이트가 안되어서 도움이 안됩니다.</a>
                </li>
            </ul>
        </div>
    );
}

export default RequestListComponent