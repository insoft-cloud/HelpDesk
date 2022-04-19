
import {useEffect, useMemo, useRef, useState} from 'react'
import "component/modal/Modal.css";
import { useTokenState } from 'utils/TokenContext';
import TableComponent from 'component/table/TableComponent';
import { procGetAxios, procPostAxios } from 'axios/Axios';
import sendEms from "../../utils/SendEms";
import sendUms from "../../utils/SendUms";
import { CodeDetail } from 'utils/AdminCode';
import PagingComponent from 'component/list/PagingComponent';
import { txtAlert } from 'utils/CommonText';

let ddd= [];

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

    const [selectChargeNameList, setSelectChargeNameList] = useState([])
    const selectChargeList:any = useRef([])
    const setSelectChargeList = (data) => {
      selectChargeList.current = data
    }


    const [rqstData, setRqstData] = useState({})

    const state = useTokenState();
    const [contentType] = useState("application/json");

    const [chargeList, setChargeList] : any = useState(['a','a']);
    const [chargeId, setChargeId] : any = useState();

    const [check, setCheck] : any = useState();
    
    const [pageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);

    const [inputTxt, setInputTxt] = useState('');
    const [isSelected, setIsSelected] : any = useState('username');

    const [jobCd, setJobCd] : any = useState([]);
    const [category, setCate] : any = useState([]);
    const [search, setSearch] : any = useState('');

    const [isChecked, setIsChecked] : any = useState();

    let userData = [];

    let table_sub_data;

    useEffect( () => {
      procGetAxios("/user/members/manager"+search, state.token + "", contentType, Member)
      procGetAxios("/user/service/request/"+ rqstId +"/charges", state.token, contentType, getchargeId)      
      setSelectChargeList([])
      procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setRequestInfoData)
  }, [page, pageSize, search]);

  function Member(data){

    let dataFiltered = data.filter(x => x.jobCode !== '')
    let arr:any=[];
    dataFiltered.map((e,i)=>{
      if(Math.floor(i/pageSize)===page){
        arr.push(e)
      }
    })
    table_sub_data = arr;
    procGetAxios("/admin/group/"+CodeDetail.jobCd+"/details", state.token,contentType, compareCodeDetail);
    procGetAxios("/admin/group/"+CodeDetail.searchCategory+"/details", state.token,contentType, getCate);

    setTotalPages(Math.ceil(dataFiltered.length/pageSize));

  }
  function getCate(data){
    setCate(data.content)
  }
  function compareCodeDetail(data)
  {
    setJobCd(data.content)
  
    table_sub_data.forEach(table => {
        data.content.forEach(r => {
          if(table.jobCode ===r.cdId){
            table.jobCode = r.name;
          }
        });
      });
    
      setChargeList(table_sub_data);
      userData = table_sub_data;
      console.log(userData)
  }

  function getchargeId(data){
    setChargeId(data.content.map(a => a.userId))
  }
  function clickSearch(){
    let txt = '{"' + isSelected + '":"' + inputTxt + '"},'
    setSearch('?search='+encodeURI(txt))
  }
  function clickOption(e){

    
    let myCheckbox = document.getElementsByName("operInst");
    Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;
      });
        e.target.checked = true;

    if(e.target.checked){
    
      console.log(e.target)
      let operInst = e.target.value;
      let option = '{ "jobCode":"' + operInst + '"}'
      setSearch('?search='+encodeURI(option))
      setPage(0)
    }
    else{
      setSearch('')
      setPage(0)
    }
  }

  function setRequestInfoData(data) {
    setRqstData(data)
  }


  function checkbox(e, i) {

    let myCheckbox = document.getElementsByName("name");
    Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;
      });
        e.target.checked = true;

    if(e.target.checked){
      let index = i      
    setCheck(userData[index]) 

    const tmpList = selectChargeList.current.concat({userId : userData[index]['userId'], userNm : userData[index]['username']})
    setSelectChargeList(tmpList)
  } else {
    const tmpList = selectChargeList.current.concat()
    tmpList.splice(tmpList.findIndex(d => d.userId === userData[i]['userId']), 1)
    setSelectChargeList(tmpList)
  }
}

  function ok(){
    let postData = {
      chrgprNm : check.username
    }

    procPostAxios('/user/service/request/'+rqstId, state.token + "", contentType, postData, alram, error)


  function alram(){
    let arr_nm = new Array()
    selectChargeList.current.forEach(element => {
       arr_nm.push(element.userNm)
    })
    obj_SMS.smsType = "charge"
    obj_SMS.idList.push(rqstData['reqId'])
    obj_SMS.reqTyCd = rqstData['tyCd']
    obj_SMS.reqTitle = rqstData['ttl']
    obj_SMS.reqChargeName = arr_nm.toString()

    obj_EMS.mailType = "charge"
    obj_EMS.userName = rqstData['reqNm']
    obj_EMS.idList.push(rqstData['reqId'])
    obj_EMS.reqTyCd = rqstData['tyCd']
    obj_EMS.reqTitle = rqstData['ttl']
    obj_EMS.reqChargeName = arr_nm.toString()

    sendEms(obj_EMS, state, contentType)
    sendUms(obj_SMS, state, contentType)

    alert(txtAlert.createCharge)

    let hisData ={
      inputMsg :   
      '<p><span class="mention" data-index="0" data-denotation-char="@" data-value="'+check.username+'" data-id="'+check.userId+'"><span contenteditable="false"><span class="ql-mention-denotation-char">@</span>'+check.username+'</span></span>님이 담당자로 지정되었습니다.</>',
     // '@' + check.username + '님이 담당자로 지정되었습니다.'
      userId : state.user,
      userNm : state.name,
      delYn : false
    }
  
      procPostAxios('/user/service/request/'+ rqstId +'/history', state.token, contentType, hisData, refresh, error )
    } 
  }
  function onKeyPress(e) {
    if(e==='Enter'){
      clickSearch();
    }
}

  function refresh(){
    close()
    window.location.reload()
  }

  function error(){
    console.log(error)
  }

  function saveHandler(){

   let result = chargeId.some( a => { return a === check.userId})


  if( result ){

       alert(txtAlert.usedCharge)

  } else{
      let chargeData = {
        userId : check.userId,
        userNm : check.username,
        agencyCode : check.agencyCode,
        departmentName : check.departmentName
      }
      procPostAxios("/user/service/request/"+ rqstId +"/charge", state.token+"", contentType, chargeData, ok, error)
   }
  }

  const columns = useMemo( () => [
    {
      Header: '',
      id: 'index',
      accessor: (_row: any, i : number) => <input name={'name'} type="checkbox" key={i} value={check} onChange={(e) => checkbox(e, i)} />
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
     {/* tabindex="-1" */}
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

                  {/* style="width: 100px;" */}

                  <select className="form-select form-select-sm" onChange={(e) => setIsSelected(e.target.value)}>
                      <option value='username'>이름</option>
                      <option value='userId'>아이디</option> 
                    </select>
                  </div>

                  <span className="input-group-text border-0 pe-1">
                    <i className="fe fe-search"></i>
                  </span>

                  <input className="form-control form-control-sm border-0 px-1" type="text" aria-label="Search our blog..." placeholder="검색어를 입력해주세요" onChange={(e) => setInputTxt(e.target.value)}  onKeyPress={e=>onKeyPress(e.key)} value={inputTxt} />

                  <span className="input-group-text border-0 py-0 ps-1 pe-3">
                    <button className="btn btn-xs btn-primary" onClick={clickSearch}>검색</button>
                  </span>

                </div>
              </div>
              
            </div>
            

            <div className="row mt-3 fs-sm ml00 mr00">
              <div className="col-12 col-md-6 list-group-item">
              {jobCd.map( (a, index) => 
                <div key={index}>
                  <div>
                    <input name="operInst" type="checkbox" value={a.name} defaultChecked  onClick={e => { clickOption(e);}}  />
                    <label className="" >{a.name}</label>
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
                    <PagingComponent page={page} setPage={setPage} totalPages={totalPages} />
                  </nav>
                </div>
              </div>
            </div>
            
            <div className="text-end">
              
              <button className="btn btn-primary btn-sm mt-3 lift" onClick={saveHandler}>
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
