import FooterComponent from 'component/layout/FooterComponent';
import NoticeComponent from 'component/list/NoticeComponent';
import RequestListComponent from 'component/list/RequestListComponent';
import HomeComponent from 'component/HomeComponent';
import React from 'react';
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
              <HomeComponent />
                <div>
                  <div>
                    <Button2Component />
                  </div>
                  <RequestListComponent />
                </div>
                  <NoticeComponent />
              </div> 
            <FooterComponent/>
        </div>
  );
}

export default App;



