import {procGetAxios, procPostAxios} from "axios/Axios";
import { useEffect, useMemo, useState} from 'react'
import "component/modal/Modal.css";
import { useTokenState } from 'utils/TokenContext';
import TableComponent from 'component/table/TableComponent';
import PagingComponent from 'component/list/PagingComponent';
import {CodeDetail} from "../../utils/AdminCode";
import sendEms from "../../utils/SendEms";
import sendUms from "../../utils/SendUms";
import {txtAlert} from "../../utils/CommonText";

/**
 * @Project     : HelpDesk
 * @FileName    : ModalComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 담당자 지정 모달 컴포넌트
 */

export default function ModalComponent( { rqstId, open, close} ) {
// EMS Object
  let obj_EMS: { reqTyCd: string; authDate: string; mailType: string; reqTitle: string; reqChargeName: string; tmpPwd: string; idList: any; userName: string, stats: string, comment: string };
  obj_EMS = {
    // 필수 입력 값
    mailType: "", // 메일 유형 (charge - 담당자 지정, pwdReset - 임시 비밀번호 발급, auth - 회원가입 승인, stats - 상태 변경(보류/완료))
    userName: "", // 사용자 이름
    idList: [], // 메일을 발송할 계정 목록 - 배열
    reqTyCd: "", // 유형 코드
    reqTitle: "", // 요청 제목

    // mailType 이 charge (담당자 지정) 일 때 필수 입력 값
    reqChargeName: "", // 담당자 이름

    // mailType 이 pwdReset (임시 비밀번호 발급) 일 때 필수 입력 값
    tmpPwd: "", // 임시 비밀번호

    // mailType 이 auth (회원가입 승인) 일 때 필수 입력 값
    authDate: "", // 승인 날짜

    // mailType 이 stats (상태 변경(보류/완료)) 일 때 필수 입력 값
    // 기획 상, 보류(hold) 또는 완료(complete) 상태일 때에만 메일이 발송되어야 합니다.
    stats: "", // 상태(hold/complete)

    // mailType 이 comment (댓글 등록) 일 때 필수 입력 값
    comment: "" // 댓글 내용
  }

  // SMS Object
  let obj_SMS: { reqTyCd: string; stats: string; smsType: string; reqTitle: string; reqChargeName: string; comment: string; idList: any };
  obj_SMS = {
    // 필수 입력 값
    smsType: "", // 문자 유형 (charge - 담당자 지정, comment - 댓글 등록, stats - 상태 변경(보류/완료))
    idList: [], // 문자를 발송할 계정 목록 - 배열
    reqTyCd: "", // 유형 코드
    reqTitle: "", // 요청 제목

    // smsType 이 charge (담당자 지정) 일 때 필수 입력 값
    reqChargeName: "", // 담당자 이름

    // smsType 이 comment (댓글 등록) 일 때 필수 입력 값
    comment: "", // 댓글 내용

    // smsType 이 stats (상태 변경(보류/완료)) 일 때 필수 입력 값
    // 기획 상, 보류(hold) 또는 완료(complete) 상태일 때에만 문자가 발송되어야 합니다.
    stats: "" // 상태(hold/complete)
  }

  const [chargeList, setChargeList] : any = useState([]) // 전체 담당자 목록 (List)
  const [currentChargeList, setCurrentChargeList] = useState([]) // 이미 저장되어있는 해당 요청 담당자의 목록
  const [selectedCharge, setSelectedCharge] = useState({}) // 선택된 담당자 정보

  const state = useTokenState()
  const [contentType] = useState("application/json")

  const [rqstData, setRqstData] = useState({})

  const [pageSize] = useState(5)
  const [page, setPage] = useState(0)
  const [totalPages,setTotalPages] = useState(0)

  const [searchTarget, setSearchTarget] = useState("jobCd")

  const [jobCd, setJobCd] : any = useState([]) // 전체 jobCode 목록
  const [selectedJobCd, setSelectedJobCd] = useState('전체') // 선택된 jobCode
  const [searchJobCd, setSearchJobCd] = useState("") // 조회 조건 (jobCode)
  const [searchKeyword, setSearchKeyword] = useState("") // 조회 조건 (input box)
  const [searchOption, setSearchOption] = useState("username") // 검색 조건

  useEffect( () => {
    procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setRqstData)
    procGetAxios("/user/service/request/chargeList/" + rqstId, state.token, contentType, setCurrentChargeList) // 현재 담당자로 저장되어있는 목록 조회
    procGetAxios("/admin/group/"+CodeDetail.jobCd+"/details", state.token,contentType, setJobCode); // jobCode 목록 조회
    if(searchTarget === 'jobCd') {
      procGetAxios("/user/members/manager?search=" + encodeURI(searchJobCd), state.token,contentType, setManagerList); // 매니저 목록 조회
    } else {
      procGetAxios("/user/members/manager?search=" + encodeURI(searchKeyword), state.token,contentType, setManagerList); // 매니저 목록 조회
    }
    resetRadio()
    setSelectedCharge({})
  }, [page, selectedJobCd, searchTarget, searchKeyword])

  function save() {
    // 현재 담당자 적용 여부 확인
    let existYn = false
    currentChargeList.forEach( charge => {
      if(charge === selectedCharge['userId']) {
        existYn = true
      }
    })

    if(existYn) {
      alert("이미 담당자로 지정되어 있습니다.")
    } else if(Object.keys(selectedCharge).length === 0) {
      alert("담당자를 선택해주세요.")
    } else {
      // 담당자 저장 작업
      let chargeData = {
        userId : selectedCharge['userId'],
        userNm : selectedCharge['username'],
        agencyCode : selectedCharge['agencyCode'],
        departmentName : selectedCharge['departmentName']
      }
      procPostAxios("/user/service/request/"+ rqstId +"/charge", state.token, contentType, chargeData, saveOk, error)
    }
  }

  function saveOk() {
    let postData = {
      chrgprNm: selectedCharge['username']
    }
    procPostAxios('/user/service/request/' + rqstId, state.token, contentType, postData, alram, error)
  }

  function alram(){
    obj_SMS.smsType = "charge"
    obj_SMS.idList.push(rqstData['reqId'])
    obj_SMS.reqTyCd = rqstData['tyCd']
    obj_SMS.reqTitle = rqstData['ttl']
    obj_SMS.reqChargeName = selectedCharge['username']

    obj_EMS.mailType = "charge"
    obj_EMS.userName = rqstData['reqNm']
    obj_EMS.idList.push(rqstData['reqId'])
    obj_EMS.reqTyCd = rqstData['tyCd']
    obj_EMS.reqTitle = rqstData['ttl']
    obj_EMS.reqChargeName = selectedCharge['username']

    sendEms(obj_EMS, state, contentType)
    sendUms(obj_SMS, state, contentType)

    alert(txtAlert.createCharge)

    let hisData = {
      inputMsg :
          '<p><span class="mention" data-index="0" data-denotation-char="@" data-value="'+selectedCharge['username']+'" data-id="'+selectedCharge['userId']+'"><span contenteditable="false"><span class="ql-mention-denotation-char">@</span>'+selectedCharge['username']+'</span></span>님이 담당자로 지정되었습니다.</>',
      userId : state.user,
      userNm : state.name,
      delYn : false,
      rqstCd : 'charge'
    }
    procPostAxios('/user/service/request/'+ rqstId +'/history', state.token, contentType, hisData, refresh, error )

  }

  function refresh(){
    close()    
  }

  function error(data) {
    alert(data)
  }

  function onEnter(e) {
    if(e.key === 'Enter') {
      keywordSearch();
    }
  }

  function keywordSearch() {
    setSearchTarget("keyword")

    let jobCd = document.getElementsByName("jobCode")
    for(let i = 0; i < jobCd.length; ++i) {
      if(jobCd[i]['value'] === '전체') {
        jobCd[i]['checked'] = true
      }
    }

    if(document.getElementById("searchKeyword") !== null && document.getElementById("searchKeyword") !== undefined) {
      // @ts-ignore
      if(document.getElementById("searchKeyword").value === "") {
        setSearchKeyword("")
      } else {
        // @ts-ignore
        setSearchKeyword('{"' + searchOption + '":"' + document.getElementById("searchKeyword").value + '"}')
      }
    }
  }

  function resetRadio() {
    let names = document.getElementsByName("name")
    names.forEach( name => {
      name['checked'] = false
    })
  }

  function setSelectedJobCode(data) {
    setSearchTarget("jobCd")

    if(data['name'] === '전체') {
      setSearchJobCd("")
    } else {
      setSearchJobCd('{"jobCode":"' + data['name'] + '"}')
    }
    setPage(0)
    setSelectedJobCd(data['name'])
  }

  function setJobCode(data) {
    setJobCd([{name:"전체", id:"all"}].concat(data['content']))
  }

  function setManagerList(data) {

    let dataFiltered = data.filter(x => x.jobCode !== '')
    let arr:any=[];
    dataFiltered.map((e,i)=>{
      if(Math.floor(i/pageSize)===page){
        arr.push(e)
      }
    })
    setChargeList(arr)
    setTotalPages(Math.ceil(dataFiltered.length/pageSize));
  }

  function setOption() {
    // @ts-ignore
    let option = document.getElementById("searchOption").children
    for(let i = 0; i < option.length; ++i) {
      if(option[i]['selected']) {
        setSearchOption(option[i]['value'])
      }
    }
  }

  const columns = useMemo( () => [
    {
      Header: '',
      id: 'index',
      accessor: (_row: any, i : number) => <input name={'name'} type="radio" key={i} onClick={() => setSelectedCharge(_row)}/>
    },
    {
      Header: '아이디',
      accessor : 'userId'
    },
    {
      Header: '이름',
      accessor : 'username'
    },
    {
      Header: '직급',
      accessor : 'rankCode'
    }
  ], [])

  return (
      <>
        <div className={open?'openModal modal' : 'modal'}>
          { open ? (
              <div className="modal-dialog modal-lg modal-dialog-centered" style={{maxWidth:"1000px"}} role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                    <h3 className="fw-bold mb-3 " id="modalExampleTitle">
                      담당자 지정
                    </h3>
                    <div>
                      <div className="rounded shadow mb-6">
                        <div className="input-group input-group-sm">
                          <div className="col-auto ms-auto" >
                            <select id="searchOption" onChange={ () => { setOption() } } className="form-select form-select-sm">
                              <option value='username'>이름</option>
                              <option value='userId'>아이디</option>
                            </select>
                          </div>
                          <span className="input-group-text border-0 pe-1">
                            <i className="fe fe-search"></i>
                          </span>
                          <input id="searchKeyword" onKeyPress={ e => onEnter(e) } className="form-control form-control-sm border-0 px-1" type="text" aria-label="Search our blog..." placeholder="검색어를 입력해주세요"/>
                          <span className="input-group-text border-0 py-0 ps-1 pe-3">
                            <button className="btn btn-xs btn-primary" onClick={ () => keywordSearch() }>검색</button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 fs-sm ml00 mr00">
                      <div className="col-12 col-md-6 list-group-item">
                        {jobCd.map( (a, index) =>
                            <div key={index}>
                              <div>
                                <input name="jobCode" type="radio" value={a['name']} onClick={ () => setSelectedJobCode(a)} defaultChecked={a['name'] === selectedJobCd}/>
                                <label className="" >{a['name']}</label>
                              </div>
                              <hr className="card-meta-divider mb-2" />
                            </div>
                        )}
                      </div>
                      <div className="col-12 col-md-6 p-0 pl10 ">
                        <div className="table-responsive fs-sm">
                          <TableComponent data={chargeList} columns={columns}/>
                        </div>
                        <div className="d-flex justify-content-center">
                          <nav aria-label="Page navigation example">
                            <PagingComponent page={page} setPage={setPage} totalPages={totalPages}/>
                          </nav>
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-primary btn-sm mt-3 lift" onClick={ () => save() }>
                        저장
                      </button>
                      <button className="btn btn-secondary btn-sm mt-3 lift" onClick={close} >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          ) : null}
        </div>
      </>
  )
}
