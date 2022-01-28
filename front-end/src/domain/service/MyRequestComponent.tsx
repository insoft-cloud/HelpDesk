import { ButtonComponent } from "component/button/ButtonComponent";
import MyRequestTableComponent from "component/table/MyRequestTableComponent";
import moment from "moment"
import { API_DOMAIN_PATH } from "utils/ContextPath";


/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 요청 현황 > 내 요청 화면 컴포넌트
 */

 function MyRequestComponent() {    

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    return (
        <section className='pt-4 pt-md-11'>
          <div className="container">
           <div className="row align-items-center">
            
            <div>
                <h1>서비스 요청 현황</h1>
                <hr></hr>
                <p>나의 업무 및 요청의 진행 현황을 확인할 수 있습니다.</p>
            </div>

            <div>
                <div>
                    <ul className='list mb-0 list-group list-group-horizontal'>
                        <li className='list-group-item'>
                            <ButtonComponent url={API_DOMAIN_PATH.myWork} btnName='내 업무' btnClassName='list-link' />
                        </li>
                        <li className='list-group-item'>
                            <ButtonComponent url={API_DOMAIN_PATH.myRequest} btnName='내 요청' btnClassName='list-link' />
                        </li>
                    </ul>
                </div>
                <div>
                    <div>
                        {nowTime} 업데이트
                    </div>
                    <div>
                        <div>
                            <MyRequestTableComponent />
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