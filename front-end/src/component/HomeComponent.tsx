import React from 'react'
import mainImage from "assets/img/dashboard/mainImage.png";

function HomeComponent() {
    return (
        <div className="container">
            <div className="row p-1 m-5">
              <div className="col-4">
                <div className="row">
                  <div className="col-10">
                    <h1 className="fw-bold">
                      Help Desk
                        Support
                    </h1>
                  </div>
                  <div className="col-10">
                  <p>효율적인 업무관리를 위한<br/>
                    최적의 시스템을 제공합니다.<br/><br/>
                    회원가입 및 로그인 후<br/>
                    서비스 요청사항을 작성하고<br/>
                    피드백 받을 수 있습니다.<br/>
                  </p>
                  </div>
                </div>
              </div>
            <img src={mainImage} alt={"main"} className="col-8"/>
          </div>    
        </div>
    );
}
export default HomeComponent
