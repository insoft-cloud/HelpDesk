import React from 'react'

function RequestListComponent() {
    return (
        <div className="container">
            <div className="row justify-content-between m-5">
                <div className="col-11 p-2">
                    <a className="text-gray-900 text-decoration-underline m-0 fw-bold" href="{() => false}">
                        최근 등록된 업무 목록
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
                            <a className="list-link" href="{() => false}">[장애] 이지패스 회원가입 오류 있습니다. 확인해주세요.</a>
                        </li>
                        <li className="list-item">
                            <a className="list-link" href="{() => false}">[개선] 이용안내 내용이 업데이트가 안되어서 도움이 안됩니다.</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RequestListComponent