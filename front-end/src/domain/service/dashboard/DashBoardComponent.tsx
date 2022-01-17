import ListComponent from 'component/list/ListComponent'
import React from 'react'

/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2021-01-17
 * @author      : 김지인
 * @description : 서비스 요청 현황 > 전체목록 화면 컴포넌트
 */

function DashBoardComponent() {    

    const testData : any[] = [{
        SVC_RQST_NO : '서비스요청번호',
        TY_CD : '유형코드(기능개선/장애)',
        PRIORT_CD : '우선순위코드(낮음/보통/높음/긴급)',
        TTL : '제목',
        REGIST_DT : '2020-10-10'
     },
     {
        SVC_RQST_NO : '서비스요청번호',
        TY_CD : '유형코드(기능개선/장애)',
        PRIORT_CD : '우선순위코드(낮음/보통/높음/긴급)',
        TTL : '제목',
        REGIST_DT : '2020-10-10'
     }
    ]

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
                            <a href="{() => false}" className='list-link'>전체목록</a>
                        </li>
                        <li className='list-group-item'>
                            <a href="{() => false}" className='list-link'>내 업무</a>
                        </li>
                        <li className='list-group-item'>
                            <a href="{() => false}" className='list-link'>내 요청</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div>
                    Today 헬프데스크 현황
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-5 col-lg-4 order-md-2'>
                    <ListComponent listName="신규 요청" listData={testData}/>
                    </div>
                    <div className='col-12 col-md-5 col-lg-4 order-md-2'>
                    <ListComponent listName="진행" listData={testData}/>
                        </div>
                        
                    <div className='col-12 col-md-5 col-lg-4 order-md-2'>
                    <ListComponent listName="완료/보류" listData={testData}/>
                        </div>
                    </div>
                </div>
            </div>
           </div>
          </div>
        </section>
    )
}
export default DashBoardComponent