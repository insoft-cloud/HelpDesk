import React from 'react'

function FooterComponent() {
    return (
        <div className="container-fluid bg-gray-300 p-4">
            <h4 className="fw-bold p-1">중소벤처기업부</h4>
                <div className="p-2">
                    <a className="text-gray-900 fs-6" href="{() => false}">이용약관</a>｜            
                    <a className="text-gray-900 fs-6" href="{() => false}">개인정보처리방침</a>
                </div>
                <div className="p-1">
                    <p>
                        중소벤처24 시스템 장애 문의 : (044) 300-0991 ｜ 메일문의 : smeshelp@tipa.or.kr<br/>
                        중소벤처기업부 : 30121 세종특별자치시 가름로 180(어진동), 세종파이낸스센터3차 4층~6층 / 대표전화 : 국번없이 1357<br/>
                        [운영기관]중소기업기술정보진흥원 : 30141, 세종특별자치시 집현중앙로 79, 중소기업기술정보진흥원(TIPA)<br/>
                        COPYRIGHT ⓒ 중소벤처기업부. ALL RIGHTS RESERVED.
                    </p>
                </div>
        </div>
    )
}
export default FooterComponent