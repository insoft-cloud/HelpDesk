import axios, { AxiosRequestHeaders } from 'axios';
import { procGetAxiosHeader } from 'axios/Axios';
import ServiceTableComponent from 'component/table/ServiceTableComponent';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';

/**
 * @Project     : HelpDesk
 * @FileName    : ServiceAllComponent.tsx
 * @Date        : 2021-01-25
 * @author      : 김지인
 * @description : 전체 서비스 화면 컴포넌트
 */

 
function ServiceAllComponent() {

    let dispatch = useTokenDispatch()
    let header : AxiosRequestHeaders
    const state = useTokenState();   
    
    useState(() => {
        
        header = {
            'Content-Type' : "application/json",
            'X-AUTH-TOKEN' : state.token + ""
        };    
        procGetAxiosHeader("/user/service/req-attachs/test", header, callback);
    })

    function callback(data : any){
        console.log(data);
    }

    const nowTime = moment().format('YYYY년 MM월 DD일 HH:mm');

    const testData = [{}]
    
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
                    {nowTime} 업데이트
                </div>
                <hr></hr>
                <div>
                    <input placeholder='키워드 혹은 일련번호를 입력해주세요'></input>
                </div>
                <div>    
                    <div>
                        <h4>진행 사항</h4>
                    </div>
                    <div>
                        <ServiceTableComponent tableData={testData}/>
                    </div>
                </div>
            </div>
           </div>
          </div>
        </section>
    )
}
export default ServiceAllComponent