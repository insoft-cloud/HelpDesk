import { procGetAxios, procPostAxios } from "axios/Axios";
import AttachServiceComponent from "component/attach/AttachServiceComponent";
import QuillEditorComponent from "component/qill/QuillEditorComponent";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useTokenState } from "utils/TokenContext";
import { CodeDetail } from "utils/AdminCode";
import { txtAlert, txtValue } from "utils/CommonText";
import "react-quill/dist/quill.core.css";


/**
 * @Project     : HelpDesk
 * @FileName    : ServiceDetailComponent.tsx
 * @Date        : 2022-02-14
 * @author      : 김지인
 * @description : 서비스 상세 > 요청 내용 컴포넌트
 */


function ServiceDetailComponent ( {rqstId} ){
  const state = useTokenState();  
  const [edit, setEdit] = useState(false);
  const [contentType] = useState("application/json");
  const [detailData, setDetailData] : any = useState({});
  const [evlData, setEvlData] : any = useState([]);
 
  const [cnts, setCnts] = useState<String>();
  const [ttl, setTtl] = useState<String>(detailData.ttl) ;
  const [evl, setEvl] = useState();

  const ref : any  = useRef(null);

  let sub_ttl;
  let sub_data;

  const Handler = (e) => {
    e.preventDefault();
    sub_ttl = e.target.value
    if(sub_ttl !== null){
      setTtl(e.target.value);
  }
  };
  const onClickEdit = () => { 
    setEdit(true)
  };

  useEffect(() => {
    if(rqstId != null){
      setEdit(false)
      procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setData)
      procGetAxios("admin/group/"+CodeDetail.evl+"/details",state.token,"application.json", getEvlCode)
  } 
}, [rqstId])

function getData(){
  procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setData)
}
function setData(data){
  sub_data = data;
  procGetAxios("admin/group/"+CodeDetail.prcsSttsCd+"/details",state.token,"application.json", prcsAdminCode)
  procGetAxios("admin/group/"+CodeDetail.sysCd+"/details_list",state.token,"application.json", sysAdminCode)
}
function prcsAdminCode(data){
  data.content.forEach(e => {
    if (sub_data.prcsSttsCd=== e.cdId){
      sub_data.prcsSttsCd = e.name;
        }
      })
} 
function sysAdminCode(data){
  data.forEach(e => {
    if (sub_data.sysCd=== e.cdId){
      sub_data.sysCd = e.name;
         }
      })
      setDetailData(sub_data)    
}
function getEvlCode(data){
  setEvlData(data.content)
}
function getEvl(e){
  setEvl(e.target.value)
}
function onClickEvl(e){
    let postData = {
      evl : evl 
    }
    procPostAxios('/user/service/request/'+rqstId, state.token, contentType, postData, pushEvl, error)
}
function pushEvl(){
 alert(txtAlert.evl)
 getData()
}

function onClickUpdate(e){

  if(ttl === detailData.ttl && detailData.cnts === cnts){
   alert('수정된 내역이 없습니다.')
    return
  }

  let  pattern = /\s/g
  let checkCnts = cnts?.replace(pattern, '')

  if(ttl === '' || ttl?.replace(pattern, '')==='' ){
    alert(txtAlert.emptyTtl)
    return
  }
  if(checkCnts?.replace(/(<([^>]+)>)/gi, '') === ''){
    alert(txtAlert.emptyCnts)
    return
  }
  if(ttl.length > 128){
    alert(txtAlert.overTtl)
    return
  }

  let postData={
    id : rqstId,
    ttl : ttl,
    cnts : cnts
  }
  procPostAxios('/user/service/request/'+rqstId,  state.token, contentType, postData, ok, error ) 
}
 
function ok(){
  getData()
  alert(txtAlert.edit)
  setEdit(false)        
}

function error(){
  console.log("error")
}
  return ( 
    <div className="card-body">
         {
         detailData.id != null ? (
          <>
                <div className="d-flex justify-content-between">
                  { edit  && state.user === detailData.reqId ?
                  ( <input type='text' defaultValue={ detailData.ttl } value={sub_ttl} onChange={Handler} />)
                  : (
                    <div className="mx-3">
                  <h5>
                     <span className="fs-xs text-primary-desat">
                        [
                          {detailData.prcsSttsCd}
                        ]</span>
                         {detailData.ttl} </h5> </div>
                  )
                }
              {state.user === detailData.reqId && detailData.prcsSttsCd !== txtValue.compelete ? (
                   edit === false && state.user === detailData.reqId ? ( <div className="d-flex text-nowrap">
                  <button className="btn btn-success-soft btn-pill btn-xs mb-1" onClick={onClickEdit}>수정</button></div>
                  ) :
                  <div>
                  <button className="btn btn-primary-soft btn-pill btn-xs mb-1" onClick={onClickUpdate}>저장</button>
                  <button className="btn btn-secondary-soft btn-pill btn-xs mb-1" onClick={() => setEdit(false)}>취소</button>
                  </div>
                ) : null}
                  </div> 
                  <hr className="card-meta-divider mb-2" />
                  {state.user === detailData.reqId && detailData.prcsSttsCd === txtValue.compelete && detailData.evl == null
                  ? (<>         
                  <div className="row bg-gray-200 fs-sm p-2 align-items-center p-lg-3"> 
                    <h5 className="text-center">서비스 처리가 완료되었습니다.</h5>
                    <h6 className="text-center text-uppercase text-muted">서비스 만족 정도에 체크해주세요.</h6>
                    <div className="row justify-content-center">

                    {evlData.map( (data, index) =>  
                         <span className="col-2 pr00" key={index}>
                         <input name="evl" type="radio" value={data.cdId} onClick={ e => getEvl(e) } defaultChecked={ detailData.evl === data.cdId} />
                         <label>{data.name}</label>
                       </span>
                    )}
                    </div>
                    <div className="text-end">
                    <button className="btn btn-info btn-pill btn-xs mb-1" onClick={onClickEvl}>제출</button>
                    </div>                    
                  </div>
              
                  <hr className="card-meta-divider mb-2" /> 
                  </>)
                  : null
                  } 
                  <div className="fs-sm">                   
                    <dl className="row mb-0">
                      <dt className="col-auto">요청자</dt>
                      <dd className="col-6 ms-n5"> {detailData.reqNm} </dd>
                    </dl>
                    <dl className="row mb-0">
                      <dt className="col-auto">시스템</dt>
                      <dd className="col-6 ms-n5"> {detailData.sysCd} </dd>
                    </dl>
                    <dl className="row mb-0">
                      <dt className="col-auto">요청일</dt>
                      <dd className="col-6 ms-n5"> {moment(detailData.registDt).format("YYYY/MM/DD HH:MM")} </dd>
                    </dl> 
                    <hr className="card-meta-divider" />                    
                  {edit  && state.user === detailData.reqId ? ( <QuillEditorComponent quillRef={ref} content={detailData.cnts} setContent={setCnts} />)
                  : (
                    <div className="border-white ql-editor" dangerouslySetInnerHTML={{__html: detailData.cnts}} />
                   )
                  } 
                    <hr className="card-meta-divider" />
                    <dl className="mb-0">
                      { edit && state.user === detailData.reqId ?
                      <AttachServiceComponent rqstId={rqstId} edit={true} />
                    : <div>
                       <AttachServiceComponent rqstId={rqstId} edit={false} />
                    </div> }
                    </dl>
              </div>
              </>
           ) 
           : '목록에서 개별 요청건을 선택하면 상세 정보가 표시됩니다.'
      }        
    </div>
  );
}
export default ServiceDetailComponent;
