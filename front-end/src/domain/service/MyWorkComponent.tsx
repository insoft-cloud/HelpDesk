import { ButtonComponent } from 'component/button/ButtonComponent'
import TittleComponent from 'component/div/TittleComponent';
import moment from 'moment';
import { API_DOMAIN_PATH, ContextPath } from 'utils/ContextPath';



/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 요청 현황 > 내 업무 화면 컴포넌트
 */

function MyWorkComponent() {    

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');
    
    return (
        <section>
            <TittleComponent tittle={"서비스 요청 현황"} subTittle={"나의 업무 및 요청의 진행 현황을 확인할 수 있습니다."}/> 
          
        <div className="content_wrap">
                
                <ul className="my_desk nav nav-pills mb-3 mt-5 justify-content-center">
                    <li className="nav-item">
                        <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myWork)} btnName='담당 업무' btnClassName='nav-link active' />
                    </li>
                    <li className='nav-item'>
                        <ButtonComponent url={ContextPath(API_DOMAIN_PATH.myRequest)} btnName='내 요청' btnClassName='nav-link' />
                    </li>
                </ul>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-sm">
                        {nowTime} 업데이트
                    </div>
                    <div>
                        <button className="btn btn-outline-primary btn-xs mb-1">오늘</button>
                        <button className="btn btn-outline-primary btn-xs mb-1">1주일</button>
                        <button className="btn btn-outline-primary btn-xs mb-1">1개월</button>
                        <button className="btn btn-outline-primary btn-xs mb-1">전체</button>
                        <button type="button" className="btn btn-primary btn-xs mb-1">
                          <span data-bs-toggle="tooltip" data-placement="top" title="통계">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"/>
                                <path d="M5 19h15a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 112 0v15z" fill="#fff"/>
                                <path d="M8.73 14.684a1 1 0 11-1.46-1.368l3.75-4a1 1 0 011.38-.077l2.959 2.526 3.856-4.885a1 1 0 011.57 1.24l-4.5 5.7a1 1 0 01-1.434.14l-3.024-2.58-3.097 3.304z" fill="#fff" opacity=".6"/>
                            </g>
                            </svg>
                        </span>
                        </button>
                    </div>
                </div>
        </div>
        </section>
    )
}
export default MyWorkComponent