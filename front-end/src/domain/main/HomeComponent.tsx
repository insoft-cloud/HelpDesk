import {useEffect, useState} from 'react'
import mainImage from "assets/img/new_img/main_visual.png";
import './HomeComponent.css'
import 'assets/css/libs.bundle.css';
import { ButtonComponent } from 'component/button/ButtonComponent';
import {useTokenDispatch} from "../../utils/TokenContext";
import {API_ADMIN_PATH, API_DOMAIN_PATH, ContextPath} from 'utils/ContextPath';
import { AuthCode } from 'utils/AdminCode';

/**
 * @Project     : HelpDesk
 * @FileName    : ListComponent.tsx
 * @Date        : 2022-01-25
 * @author      : 김지인
 * @description : 메인화면 컴포넌트
 */

function HomeComponent() {

    let dispatch = useTokenDispatch()
    const auth = sessionStorage.getItem("auth");

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "HOME"})

    }, []);
    

    return(
    <section className='pt-4 pt-md-11'>
      <div className="container">
         <div className="row align-items-center ">
          <div className="col-12 col-md-5 col-lg-6 order-md-2">
            <img src={ mainImage } className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0" alt="..." data-aos="fade-up" data-aos-delay="100" />
          </div>
          <div className="col-12 col-md-7 col-lg-6 order-md-1" data-aos="fade-up">

            <h1 className="display-3 text-center text-md-start mb-lg-4">
                Help Desk
            </h1>

            <p className="lead text-center text-md-start mb-6 mb-lg-8">
                효율적인 업무관리를 위한 최적의 시스템을 제공합니다.<br/><br/>

                회원가입 및 로그인 후 서비스 요청사항을 작성하고<br/>
                피드백 받을 수 있습니다.
            </p>
            

            <div className="text-center text-md-start main_btn">
                <p>
                    <ButtonComponent btnName='신규 서비스 요청 작성' url={ContextPath(API_DOMAIN_PATH.serviceRequest)} btnClassName="btn btn-primary shadow lift" />
                </p>
                <p>
                    <ButtonComponent btnName='서비스 요청 진행사항 확인' url={ContextPath(API_DOMAIN_PATH.myRequest)} btnClassName="btn btn-primary-soft lift" />
                </p>
                {auth === AuthCode.superAdmin 
                ?
                <p>
                    <ButtonComponent btnName='서비스관리' url={ContextPath(API_ADMIN_PATH.codeGroup)} btnClassName="btn btn-dark-soft lift" />
                </p>
                : <></>
                }
            </div>
        </div>
      </div>
      <div className="row mt-11 mb-11 main_notice">
        {/* 
        <ListComponent listName="공지사항"/> */}
      </div>
    </div>
  </section>
  )
}
export default HomeComponent
