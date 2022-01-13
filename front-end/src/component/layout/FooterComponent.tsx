import React from 'react'
import footerImg from "assets/img/ect-logo-big.svg"

function FooterComponent() {
    return (
        <>
        <div className="footer_nav">
            <ul className="fl_wrap">
                <li><a href="{() => false}">이용약관</a></li>
                <li><a href="{() => false}" className="txt_blue">개인정보처리방침</a></li>
            </ul>
        </div>
        <div className="footer_info fl_wrap">
            <div className="footer_logo fl_left">
                <img src={ footerImg } alt="중소벤처24" />
            </div>
            <div className="footer_adds fl_left">
                <dl className="fl_wrap">
                    <dt>중소벤처24 시스템 장애 문의</dt>
                    <dd>(044) 390-0990, (044) 390-0991 <span>메일문의</span> smeshelp@tipa.or.kr</dd>
                </dl>
                <dl className="fl_wrap">
                    <dt>중소벤처기업부</dt>
                    <dd>30121, 세종특별자치시 가름로 180(어진동), 세종파이낸스센터3차 4층~6층 <span>대표전화</span> 국번없이 1357</dd>
                </dl>
                <dl className="fl_wrap">
                    <dt>[운영기관] 중소기업기술정보진흥원</dt>
                    <dd>(30141, 세종특별자치시 집현중앙로 79, 중소기업기술정보진흥원(TIPA)</dd>
                </dl>
                <div className="copyright mt20">copyright ⓒ <b>중소벤처기업부</b>. all rights reserved.</div>
            </div>
        </div>
        </>
    )
}
export default FooterComponent