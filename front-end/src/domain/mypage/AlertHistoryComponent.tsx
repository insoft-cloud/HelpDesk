import { procGetAxios } from "axios/Axios";
import TittleComponent from "component/div/TittleComponent";
import { useEffect, useState } from "react";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import AlertListComponent from "./AlertListComponent";
import PagingComponent from "../../component/list/PagingComponent";
import { CodeDetail } from "utils/AdminCode";

function AlertHistoryComponent(){
    const condition_sv = {
        conditionColNm : 'prcsSttsCd', // 조건 컬럼명
        // conditionNmList, conditionClsNmList, conditionValList는 모두 배열 형태로 저장
        // 항목별로 같은 index 값을 사용하니 사용에 주의할 것
        conditionNmList : ['complete', 'hold'], // 조건 컬럼에서 필터링 하려는 값의 목록
        conditionClsNmList : ['badge badge-rounded-circle bg-danger-soft pl10 pr10 pt05', 'badge badge-rounded-circle bg-dark-soft pl10 pr10 pt05'], // 각 필터링 값에 부여할 css className
        conditionValList : ['완료', '보류'], // 각 필터링 값이 페이지에 보여지는 실제 값
        linkColumn : 'id', // 클릭했을 때 modal 창으로 나타날 컴포넌트에게 전해줄 매개변수 값, 비어있으면('') 모달창을 띄우지 않음 - ex) e['id'] => e[condition.linkColumn]
        tyCd : 'tyCd', // "[타이틀] 제목" 에서 타이틀 란에 들어갈 컬럼명
        ttl : 'ttl', // "[타이틀] 제목" 에서 제목 란에 들어갈 컬럼명
        registDt : 'registDt', // 등록일자 컬럼명
        cnts : '' // 본문(내용) 컬럼명, '' 빈 문자열인 경우 내용 부분을 출력하지 않음
    }

    const condition_tr = {
        conditionColNm : 'trsmsTyCd',
        conditionNmList : ['sms', 'mail'],
        conditionClsNmList : ['badge badge-rounded-circle bg-info-soft pl10 pr10 pt05', 'badge badge-rounded-circle bg-success-soft pl10 pr10 pt05'],
        conditionValList : ['문자', '메일'],
        linkColumn : '',
        tyCd : 'tyCd',
        ttl : 'ttl',
        registDt : 'trsmsDt',
        cnts : 'cnts'
    }

    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(0)
    const [pageSize] = useState(20)

    let dispatch = useTokenDispatch()
    const state = useTokenState()
    const [contentType] = useState("application/json")
    const [tableData, setTableData] = useState<Object[]>([])
    const [tab,setTab] = useState('service')
    const [url,setUrl] = useState("/user/service/requests/" + state.user + "/prcsSttsCd?prcsSttsCdList=" + condition_sv.conditionNmList + "&page=" + page + "&size=" + pageSize)
    const [condition,setCondition] = useState(condition_sv)

    let table_sub_data;

    useEffect(() => {
        if(tab === 'service') {
            setUrl("/user/service/requests/" + state.user + "/prcsSttsCd?prcsSttsCdList=" + condition_sv.conditionNmList + "&page=" + page + "&size=" + pageSize)
        } else {
            setUrl('/user/transmissions/' + state.user + "?page=" + page + "&size=" + pageSize)
        }
    }, [page])
   useEffect(()=>{
        if(tab === 'service') {
            setPage(0)
            setCondition(condition_sv)
            setUrl("/user/service/requests/" + state.user + "/prcsSttsCd?prcsSttsCdList=" + condition_sv.conditionNmList + "&page=" + page + "&size=" + pageSize)
        } else {
            setPage(0)
            setCondition(condition_tr)
            setUrl('/user/transmissions/' + state.user + "?page=" + page + "&size=" + pageSize)
        }
    }, [tab])
    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "alertHistory"})
        getData()
    }, [url])
    function getData(){
        procGetAxios(url,state.token,contentType,setData)
    }
    function setData(data) {
        setTotalPages(data.totalPages)        
        table_sub_data = data.content;
        procGetAxios("admin/group/"+CodeDetail.tyCd+"/details",state.token,"application.json", tyCdAdminCode)
    }
    function tyCdAdminCode(data){
        table_sub_data.forEach(tab => {
            data.content.forEach(e => {
                if(tab.tyCd===e.cdId){
                    tab.tyCd = e.name;
                }
            })
        })
        setTableData(table_sub_data);    
    }

    return(
        <section>
            <TittleComponent tittle={"알림 내역"} subTittle={"Help Desk 내에서 개인별 요청 서비스 현황을 확인할 수 있습니다"}/>
            <div className="position-relative">
                <div className="shape shape-bottom shape-fluid-x text-light">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <div className="content-wrap">
                <ul className="my_desk nav nav-pills mb-3 mt-5 justify-content-center">
                    <li className="nav-item">
                        <button className={tab==='service'?"btn btn-lg btn-dark rounded-1":"btn btn-lg rounded-1"} onClick={()=>setTab('service')}>서비스 요청 결과</button>
                    </li>
                    <li className="nav-item">
                        <button className={tab==='message'?"btn btn-lg btn-dark rounded-1":"btn btn-lg rounded-1"} onClick={()=>setTab('message')}>문자/메일 알림</button>
                    </li>
                </ul>
                <div className="d-flex justify-content-center mt-7">
                    <div className="w-75">
                        <div className="card mt-3">
                            {
                                tableData.length > 0 ?
                                    <>
                                        <div className="card-body">
                                            <AlertListComponent data={tableData} condition={condition} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                        <PagingComponent page={page} setPage={setPage} totalPages={totalPages} />
                                        </div>
                                    </>
                                    :
                                    <>
                                    <div className="card-body d-flex justify-content-center">
                                        알림 내역이 존재하지 않습니다.
                                    </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AlertHistoryComponent;
