import {useEffect, useState} from 'react'
import mainImage from "assets/img/new_img/main_visual.png";
import './HomeComponent.css'
import 'assets/css/libs.bundle.css';
import { ButtonComponent } from 'component/button/ButtonComponent';
import {useTokenDispatch, useTokenState} from "../../utils/TokenContext";
import {API_ADMIN_PATH, API_DOMAIN_PATH, ContextPath} from 'utils/ContextPath';
import { AuthCode, CodeDetail } from 'utils/AdminCode';
import { procGetAxios, procPostAxios } from 'axios/Axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * @Project     : HelpDesk
 * @FileName    : ListComponent.tsx
 * @Date        : 2022-01-25
 * @author      : 김지인
 * @description : 메인화면 컴포넌트
 */

function HomeComponent() {

    let dispatch = useTokenDispatch()
    let refreshToken = localStorage.getItem("refreshToken");
    const state = useTokenState();
    const [contentType] = useState("application/json");
 
    const auth = state.auth;
    const search = encodeURI('{"ntcregistyn":"Y"}')
    const [listData, setListData] = useState([]);

    let sub_data;

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "HOME", actTime: new Date().getTime().toString()})
        if( refreshToken !== null){
        procGetAxios('/user/notices?sort=registDt,desc&search='+search+"&page=0&size=5", state.token, contentType, getTableData )
        }
    }, []);
    
    function getTableData(data){
      sub_data = data.content;
      procGetAxios("admin/group/"+CodeDetail.notice+"/details",state.token,"application.json", notiAdminCode)
    }
    function notiAdminCode(data){
      sub_data.forEach(tab => {
          data.content.forEach(e => {
              if(tab.ctgrycd===e.cdId){
                  tab.ctgrycd = e.name;
              }
          })
      })
      setListData(sub_data);    
  }
  function viewCount(view, id){
    let postData ={
      rdcnt : parseInt(view) +1
    }
    procPostAxios('/user/notice/'+id, state.token, contentType, postData, op, error) 
  }
  function op(){
    console.log('성공')
  }
  function error(){
    console.log('error')
  }

    return(
    <section className='pt-4 pt-md-11'>
      <div className="container">
         <div className="row align-items-center ">
          <div className="col-12 col-md-5 col-lg-6 order-md-2">
            <img src={ mainImage } className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0" alt="..." data-aos="fade-up" data-aos-delay="100" />
          </div>
          <div className="col-12 col-md-7 col-lg-6 order-md-1" data-aos="fade-up">

            <h1 className="display-3 text-center text-md-start mb-lg-4">
                Help Desk
            </h1>

            <p className="lead text-center text-md-start mb-6 mb-lg-8">
                효율적인 업무관리를 위한 최적의 시스템을 제공합니다.<br/><br/>

                회원가입 및 로그인 후 서비스 요청사항을 작성하고<br/>
                피드백 받을 수 있습니다.
            </p>

            <div className="text-center text-md-start main_btn">
                <p>
                    <ButtonComponent btnName='신규 서비스 요청 작성' url={ContextPath(API_DOMAIN_PATH.serviceRequest)}
                                     btnClassName="btn btn-primary shadow lift"/>
                </p>
                <p>
                    <ButtonComponent btnName='서비스 요청 진행사항 확인' url={ContextPath(API_DOMAIN_PATH.myRequest)}
                                     btnClassName="btn btn-primary-soft lift"/>
                </p>
                {auth === AuthCode.Admin ?
                    <p>
                        <ButtonComponent btnName='서비스관리' url={ContextPath(API_ADMIN_PATH.codeGroup)} btnClassName="btn btn-dark-soft lift" />
                    </p>
                :auth === AuthCode.Manager  || auth === AuthCode.superAdmin ?
                    <p>
                        <ButtonComponent btnName='권한 관리' url={ContextPath(API_ADMIN_PATH.memberManage)}
                                         btnClassName="btn btn-dark-soft shadow lift"/>
                    </p>
                : null
                }
            </div>
        </div>
      </div>
      <div className="row mt-7 mb-11 main_notice" data-aos="fade-up" data-aos-delay="100">
      {( refreshToken == null ) ? null :
        <div className="">   
        <h3>공지사항</h3>
        <ul className="list-group">

        {listData.map((list_data : any, index : number) => (

          <li className="d-flex justify-content-between list-group-item cursor-pointer" key={index}>
            <div className="col-21">
              
              <div className={list_data.ctgrycd === '공지' ? "badge badge-rounded-circle-lg bg-primary-soft pl10 pr10 pt05" : list_data.ctgrycd === '안내' ? "badge badge-rounded-circle-lg bg-success-soft pl10 pr10 pt05" : "badge badge-rounded-circle-lg bg-dark-soft pl10 pr10 pt05"}>
                {list_data.ctgrycd}
              </div>
            </div>
            <div className="col-10">
              <div className="d-flex justify-content-between col align-items-center">
      
                <div className="mb-0 notice_title">
                  <Link  to={ContextPath(API_DOMAIN_PATH.noticeDetail)+`/${list_data.id}`} onClick={ () => viewCount(list_data.rdcnt, list_data.id) } className="black" >{list_data.ttl}</Link>
                </div>
                <div className="fs-sm text-muted mb-0 text-end">{moment(list_data.registDt).format("YYYY.MM.DD HH:MM")}</div>
              </div>
            </div>
          </li>
        ))}    
        </ul>
      </div>

        }
      </div>
    </div>
  </section>
  )
}
export default HomeComponent
