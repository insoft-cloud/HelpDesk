import FooterComponent from 'component/layout/FooterComponent';
import RequestListComponent from 'component/list/RequestListComponent';
import HomeComponent from 'component/HomeComponent';
import React from 'react';
import HeaderComponent from "./component/layout/HeaderComponent";
import NewServiceRequestButtonComponent from './component/button/NewServiceRequestButtonComponent';
import ServiceProgressButtonComponent from './component/button/ServiceProgressButtonComponent';
import NoticeListComponent from 'component/list/NoticeListComponent';

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
              <div>
                <div>
                  <HomeComponent />
                    <div>
                      <div className="row justify-content-center">
                         <NewServiceRequestButtonComponent />
                         <ServiceProgressButtonComponent />
                      </div>
                      <RequestListComponent />
                    </div>
                    <NoticeListComponent />
                </div> 
              </div>
            <FooterComponent/>
        </div>
  );
}

export default App;



