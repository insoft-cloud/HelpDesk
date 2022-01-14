import React from 'react'
import mainImage from "assets/img/dashboard/mainImage.png";
import'assets/css/style.css';

function HomeComponent() {
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
                    <a href="{() => false}" className="btn btn-primary shadow lift">
                        신규 서비스 요청 작성 <i className="fe fe-arrow-right d-none d-md-inline ms-3"></i>
                    </a>
                </p>
                <p>
                    <a href="{() => false}" className="btn btn-primary-soft lift">
                        서비스 요청 진행사항 확인
                    </a>
                </p>
                <p>
                    <a href="{() => false}" className="btn btn-dark-soft lift">
                        서비스 관리
                    </a>
                </p>
            </div>
        </div>
      </div>
    </div>
  </section>
  )
}
export default HomeComponent
