import AdminHeaderComponent from 'component/admin/AdminHeaderComponent';
import AdminButtonComponent from 'component/admin/AdminButtonComponent';
import FooterComponent from 'component/layout/FooterComponent';
import React from 'react';
import GraphComponent from './GraphComponent';


function AdminMainComponent() {
    
  
  const testData : any[] = [{
    firstname: 'hello',
    lastname : 'world',
    testValue : '@test'
  },
    {
      firstname: 'hello2',
      lastname : 'world2',
      testValue : '@test2'
    },
    {
      firstname: 'hello3',
      lastname : 'world3',
      testValue : '@test3'
    },
    {
      firstname: 'hello4',
      lastname : 'world4',
      testValue : '@test4'
    },
    {
      firstname: 'hello5',
      lastname : 'world5',
      testValue : '@test5'
    },
    {
      firstname: 'hello2',
      lastname : 'world2',
      testValue : '@test2'
    },
    {
      firstname: 'hello3',
      lastname : 'world3',
      testValue : '@test3'
    }
  ];
  
  const testData2 : any[] = [{
    firstname: 'hello4',
    lastname : 'world4',
    testValue : '@test4'
  },
    {
      firstname: 'hello5', 
      lastname : 'world5',
      testValue : '@test5'
    },
    {
      firstname: 'hello6',
      lastname : 'world6',
      testValue : '@test6'
    }
  ];


  // const testResult = (e) => {
  //     alert("후에에엥");
  //     e.preventDefault();
  // }
  function testResult() {
    alert("이벤트!");
  };

function testResult2() {
  alert("이벤트삭제!");
};

  
  return (
        <div className="m-3">
            <AdminHeaderComponent/>
              <div className="AdminMainComponent">
                <div className="d-flex justify-content-end mr-3">
                  <AdminButtonComponent btnName="추가" onEventHandler={() => testResult} />
                  <AdminButtonComponent btnName="삭제" onEventHandler={testResult} />
                  </div>
                  <div>
                  <GraphComponent tableClassName="asdarbenrfbv" tableData={testData}  />
                </div>
              </div> 
        </div>
          
  );
}

export default AdminMainComponent;



