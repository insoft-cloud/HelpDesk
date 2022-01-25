import { ButtonComponent } from "component/button/ButtonComponent";
import ListComponent from "component/list/ListComponent";
import ListHearderComponent from "component/list/ListHearderComponent";
import moment from "moment"


/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 서비스 요청 현황 > 내 요청 화면 컴포넌트
 */

 function MyRequestComponent() {    
    const testData : any[] = []

    const nowTime = moment().format('YYYY-MM-DD HH:mm');

    return (
        <section className='pt-4 pt-md-11'>
          <div className="container">
           <div className="row align-items-center">
            
            <div>
                <h1>서비스 요청 현황</h1>
                <hr></hr>
                <p>지난 30일간 서비스 요청건의 진행사항 요약입니다.</p>
            </div>

            <div>
                <div>
                    <ul className='list mb-0 list-group list-group-horizontal'>
                        <li className='list-group-item'>
                            <ButtonComponent url="/dashBoard" btnName='전체목록' btnClassName='list-link' />
                        </li>
                        <li className='list-group-item'>
                            <ButtonComponent url="/dashBoard/myWork" btnName='내 업무' btnClassName='list-link' />
                        </li>
                        <li className='list-group-item'>
                            <ButtonComponent url="/dashBoard/myRequest" btnName='내 요청' btnClassName='list-link' />
                        </li>
                    </ul>
                </div>
                <div className='p-2'>
                    <h3>나의 서비스 요청</h3>
                    <div>
                        {nowTime} 업데이트
                    </div>
                    <div className="row align-items-center">
                        <ListHearderComponent listName="진행" listData={testData}/>
                        <ListHearderComponent listName="진행" listData={testData}/>
                        <ListHearderComponent listName="완료" listData={testData}/>
                        <ListHearderComponent listName="보류" listData={testData}/>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-5 col-lg-4 order-md-2'>
                    <ListComponent listName="진행" listData={testData}/>
                    </div>
                    <div className='col-12 col-md-5 col-lg-4 order-md-2'>
                    <ListComponent listName="완료" listData={testData}/>
                        </div>
                        
                    <div className='col-12 col-md-5 col-lg-4 order-md-2'>
                    <ListComponent listName="보류" listData={testData}/>
                        </div>
                    </div>
                </div>
            </div>
           </div>
          </div>
        </section>
    )
}
export default MyRequestComponent