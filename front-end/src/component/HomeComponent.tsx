import React from 'react'
import mainImage from "assets/img/dashboard/mainImage.png";

function HomeComponent() {
    return (
        <div>
              <div>
                <div>
                  Help Desk
                  Support
                </div>
                <div>
                  효율적인 업무관리를 위한
                  최적의 시스템을 제공합니다.
                  회원가입 및 로그인 후
                  서비스 요청사항을 작성하고
                  피드백 받을 수 있습니다.
                </div>
                <img src={mainImage} alt={"main"}>
                </img>
              </div>
              <div>

              </div>
              {/*<TableComponent tableData={testData}></TableComponent>*/}
              {/*<TableComponent tableClassName={"table table-dark"} tableData={testData2}></TableComponent>*/}
              {/*  <Link to={ContextPath("/invoices")}>Invoices</Link> |{" "}*/}
              {/*  <Link to={ContextPath("/expenses")}>Expenses</Link>*/}
            </div>
    )
}
export default HomeComponent
