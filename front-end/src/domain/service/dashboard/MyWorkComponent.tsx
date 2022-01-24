import { ButtonComponent } from 'component/button/ButtonComponent'
import ListComponent from 'component/list/ListComponent'
import ListHearderComponent from 'component/list/ListHearderComponent'
import React from 'react'

/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2021-01-21
 * @author      : 김지인
 * @description : 서비스 요청 현황 > 내 업무 화면 컴포넌트
 */

function MyWorkComponent() {    

    const testData : any[] = [{
        SYS_CD : 'S-10',
        TY_CD : '기능개선',
        PRIORT_CD : '낮음',
        TTL : '제목',
        REGIST_DT : '2020-10-10',
        UPD_DT : '2020-10-12',
        GOAL_DT : '2020-10-15',
        SST : "신규"
     },
     {
        SVC_RQST_NO : '서비스요청번호',
        TY_CD : '유형코드(기능개선/장애)',
        PRIORT_CD : '우선순위코드(낮음/보통/높음/긴급)',
        TTL : '제목',
        REGIST_DT : '2020-10-10',
        UPD_DT : '2020-10-13',
        GOAL_DT : '2020-10-16',
        SST : "진행"
     },
     {
        SVC_RQST_NO : '서비스요청번호',
        TY_CD : '유형코드(기능개선/장애)',
        PRIORT_CD : '우선순위코드(낮음/보통/높음/긴급)',
        TTL : '제목',
        REGIST_DT : '2020-10-10',
        UPD_DT : '2020-10-13',
        GOAL_DT : '2020-10-16',
        SST : "완료"
     },
     {
        SVC_RQST_NO : '서비스요청번호',
        TY_CD : '유형코드(기능개선/장애)',
        PRIORT_CD : '우선순위코드(낮음/보통/높음/긴급)',
        TTL : '제목',
        REGIST_DT : '2020-10-10',
        UPD_DT : '2020-10-13',
        GOAL_DT : '2020-10-16',
        SST : "보류"
     }
    ]

    return (
        <section className='pt-4 pt-md-11'>
          <div className="container">
           <div className="row align-items-center">
            
            <div>
                <h1>서비스 요청 현황</h1>
                <hr></hr>
                <p>지난 30일간 서비스 요청하신 진행사항 요약입니다.</p>
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
                            <a href="{() => false}" className='list-link'>내 요청</a>
                        </li>
                    </ul>
                </div>
                <div className='p-2'>
                    <h3>나의 업무 현황</h3>
                    <div className="row align-items-center">
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
export default MyWorkComponent