import FooterComponent from 'component/layout/FooterComponent';
import React from 'react';
import mainImage from "./assets/img/dashboard/mainImage.png";
import HeaderComponent from "./component/layout/HeaderComponent";
import Button2Component from "./component/button/Button2Component";

function App() {

  // const testData : any[] = [{
  //   firstname: 'hello',
  //   lastname : 'world',
  //   testValue : '@test'
  // },
  //   {
  //     firstname: 'hello2',
  //     lastname : 'world2',
  //     testValue : '@test2'
  //   },
  //   {
  //     firstname: 'hello3',
  //     lastname : 'world3',
  //     testValue : '@test3'
  //   }
  // ];
  //
  // const testData2 : any[] = [{
  //   firstname: 'hello4',
  //   lastname : 'world4',
  //   testValue : '@test4'
  // },
  //   {
  //     firstname: 'hello5',
  //     lastname : 'world5',
  //     testValue : '@test5'
  //   },
  //   {
  //     firstname: 'hello6',
  //     lastname : 'world6',
  //     testValue : '@test6'
  //   }
  // ];
  return (
        <div>
          <HeaderComponent/>
          <div className="App">
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
                <Button2Component/>
              </div>
              <div>

              </div>
              {/*<TableComponent tableData={testData}></TableComponent>*/}
              {/*<TableComponent tableClassName={"table table-dark"} tableData={testData2}></TableComponent>*/}
              {/*  <Link to={ContextPath("/invoices")}>Invoices</Link> |{" "}*/}
              {/*  <Link to={ContextPath("/expenses")}>Expenses</Link>*/}
            </div>
          </div>
          <FooterComponent/>
        </div>
  );
}

export default App;



