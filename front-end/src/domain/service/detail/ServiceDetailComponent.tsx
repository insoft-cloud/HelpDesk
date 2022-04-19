import axios from "axios";
import { procGetAxios, procPostAxios } from "axios/Axios";
import AttachServiceComponent from "component/attach/AttachServiceComponent";
import { SelectedComponent } from "component/select/SelectComponent";
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
 * @description : 서비스 상세조회 컴포넌트
 */


function ServiceDetailComponent ( {rqstId} ){
  const state = useTokenState();  
  const [edit, setEdit] = useState(false);
  const [contentType] = useState("application/json");
  const [detailData, setDetailData] : any = useState({});
  const [evlData, setEvlData] : any = useState([]);
 
  const [cnts, setCnts] = useState();
  const [ttl, setTtl] = useState();
  const [evl, setEvl] = useState();

  const ref : any  = useRef(null);

  let sub_data;

  const Handler = (e) => {
    e.preventDefault();
    setTtl(e.target.value);
  };
  

  const onClickEdit = () => { 
    setEdit(true)
  };

  useEffect(() => {
    if(rqstId != null){
      procGetAxios('/user/service/request/'+ rqstId, state.token, contentType, setData)
      procGetAxios("admin/group/"+CodeDetail.evl+"/details",state.token,"application.json", getEvlCode)
  } 
}, [rqstId, edit])

function getData(){
  procGetAxios('/user/service/request/'+ rqstId, state.token+"", contentType, setData)
}

function setData(data){
  sub_data = data;
  procGetAxios("admin/group/"+CodeDetail.prcsSttsCd+"/details",state.token,"application.json", prcsAdminCode)
  procGetAxios("admin/group/"+CodeDetail.sysCd+"/details",state.token,"application.json", sysAdminCode)
}
function prcsAdminCode(data){
 
  data.content.forEach(e => {
    if (sub_data.prcsSttsCd=== e.cdId){
      sub_data.prcsSttsCd = e.name;
        }
      })
} 
function sysAdminCode(data){
  data.content.forEach(e => {
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
}

function onClickUpdate(e){
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

                  { edit  && state.user === detailData.reqId ? ( <input type='text' defaultValue={(detailData.ttl != null ) ? detailData.ttl : ""} value={ttl} onChange={Handler} />)

                  : (

                  <h5>
                     <span className="fs-xs text-primary-desat mr10">
                        [
                          {detailData.prcsSttsCd}
                        ]</span>
                         {detailData.ttl} </h5>  
                  )

                }
              {state.user === detailData.reqId && detailData.prcsSttsCd !== txtValue.compelete ? (
                   edit === false && state.user === detailData.reqId ? ( 
                  <button className="btn btn-success-soft btn-pill btn-xs mb-1" onClick={onClickEdit}>수정</button>
                  ) :
                  <div>
                  <button className="btn btn-primary-soft btn-pill btn-xs mb-1" onClick={onClickUpdate}>저장</button>
                  <button className="btn btn-secondary-soft btn-pill btn-xs mb-1" onClick={() => setEdit(false)}>취소</button>
                  </div>

                ) : <></>}
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
                  : <></>
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
                    // className="m-3 pb-2" view ql-editor
                   )
                  } 
                    <hr className="card-meta-divider" />
                    <dl className="mb-0">
                      <dt className="col-auto">첨부파일</dt>
                      <AttachServiceComponent rqstId={rqstId} />
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
