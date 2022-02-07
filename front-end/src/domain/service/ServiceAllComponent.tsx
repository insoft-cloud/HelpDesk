import ServiceTableComponent from 'component/table/ServiceTableComponent';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTokenDispatch } from 'utils/TokenContext';

/**
 * @Project     : HelpDesk
 * @FileName    : ServiceAllComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 전체 서비스 화면 컴포넌트
 */

 
function ServiceAllComponent() {

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    let dispatch = useTokenDispatch()

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "ServiceAll"})
    }, []);
    
    
    
    return (
        <section className='pt-4 pt-md-11'>
          <div className="container">
           <div className="row align-items-center">
            
            <div>
                <h1>서비스 요청 목록</h1>
                <hr></hr>
                <p>나의 업무 및 요청의 진행 현황을 확인할 수 있습니다.</p>
            </div>

            <div>
                <div>
                    {nowTime} 업데이트
                </div>
                <hr></hr>
                <div>
                    검색
                </div>
                <div>    
                    <div>
                        <h4>진행 사항</h4>
                    </div>
                    <div>
                      <ServiceTableComponent /> 
                    </div>
                    <div>
                    </div>
                </div>
            </div>
           </div>
          </div>
        </section>
    )

    
}
export default ServiceAllComponent