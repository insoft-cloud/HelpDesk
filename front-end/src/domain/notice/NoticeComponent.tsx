import axios from 'axios';
import { procGetAxios, procPostAxios } from 'axios/Axios';
import { ButtonComponent } from 'component/button/ButtonComponent';
import TittleComponent from 'component/div/TittleComponent';
import PageComponent from 'component/list/PageComponent'
import PagingComponent from 'component/list/PagingComponent';
import TableComponent from 'component/table/TableComponent';
import moment from 'moment';
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthCode, CodeDetail } from 'utils/AdminCode';
import { API_DOMAIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';

export default function NoticeComponent() {

    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const auth = sessionStorage.getItem("auth");

    const [tableData, setTableData] = useState([]);
    const [contentType] = useState("application/json");

    const search = encodeURI('{"ntcregistyn":"Y"}')

    const [page, setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [pageSize] = useState(7);

    let table_sub_data;

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "notice"})

        if(auth === AuthCode.superAdmin || auth === AuthCode.Admin){
        procGetAxios('/user/notices?sort=registDt,desc'+"&page="+page+"&size="+pageSize, state.token, contentType, getTableData )
      } else {
        procGetAxios('/user/notices?sort=registDt,desc&search='+search+"&page="+page+"&size="+pageSize, state.token, contentType, getTableData )
      }
    }, [state.user, search, page, pageSize])


    function getTableData(data){

      table_sub_data = data.content;
      procGetAxios("admin/group/"+CodeDetail.notice+"/details",state.token,"application.json", notiAdminCode)
      setTotalPages(data.totalPages)
    }
    function notiAdminCode(data){
      table_sub_data.forEach(tab => {
          data.content.forEach(e => {
              if(tab.ctgrycd===e.cdId){
                  tab.ctgrycd = e.name;
              }
          })
      })
      setTableData(table_sub_data);    
  }
  function viewCount(view, id){
    let postData ={
      rdcnt : parseInt(view) +1
    }
    procPostAxios('/user/notice/'+id, state.token, contentType, postData, op, error)
  
    console.log(postData)
  }
  function op(){
    console.log('성공')
  }
  function error(){
    console.log('error')
  }


    const columns = useMemo( () => [
        {
          Header: '번호',
          id: 'index',
          accessor: (_row: any, i : number) => i + 1
        },
        {
            Header: '카테고리',
            accessor:'ctgrycd'
        },
        {
          Header: '제목', id: 'ttl',
          accessor : a => <Link  to={ContextPath(API_DOMAIN_PATH.noticeDetail)+`/${a.id}`} onClick={ () => viewCount(a.rdcnt, a.id) } >{a.ttl}</Link>

        },
        {
            Header : '등록일', id : 'registDt',
            accessor: a => <Fragment>{moment(a.registDt).format("YYYY.MM.DD")}</Fragment>
        },
        {
            Header: '조회수', 
            accessor: 'rdcnt'
          },        
    ], [])

  

    return (
    <section>
        <TittleComponent tittle="공지사항" subTittle="중소벤처24 헬프데스크 공지입니다." />

    <div className="content_wrap">

      
      
      <div className="d-flex justify-content-center mt-7">
        <div className="w-75">
          
          
          <div className="card mt-3">
            <div className="card-body pb-0">

              {(auth === AuthCode.superAdmin || auth === AuthCode.Admin) 
              ?
              <div className="text-end mb-2">
                  <ButtonComponent url={ContextPath(API_DOMAIN_PATH.newNotice)} btnName={'신규 등록'} btnClassName={"btn btn-primary btn-xs"}/>
              </div>
              : <></>}
              
              <TableComponent data={tableData} columns={columns}/>
              <div className="d-flex justify-content-center">
                <PagingComponent page={page} setPage={setPage} totalPages={totalPages} />
              </div>  
              
              
            </div>
          </div>
          
        </div>

      </div>

    </div>
  </section>

  )
}
