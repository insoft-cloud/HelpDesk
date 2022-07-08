import { procGetAxios, procPostAxios } from 'axios/Axios';
import { ButtonComponent } from 'component/button/ButtonComponent';
import TittleComponent from 'component/div/TittleComponent';
import PagingComponent from 'component/list/PagingComponent';
import TableComponent2 from 'component/table/TableComponent2';
import moment from 'moment';
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthCode, CodeDetail } from 'utils/AdminCode';
import { API_DOMAIN_PATH, ContextPath } from 'utils/ContextPath';
import { useTokenDispatch, useTokenState } from 'utils/TokenContext';
import SortButtonComponent from "../../component/button/SortButtonComponent";


/**
 * @Project     : HelpDesk
 * @FileName    : NoticeComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 공지사항 목록 화면 컴포넌트
 */


export default function NoticeComponent() {

    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const auth = state.auth;

    const [tableData, setTableData] = useState([]);
    const [contentType] = useState("application/json");

    const search = encodeURI('{"ntcregistyn":"Y"}')

    const [page, setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [pageSize] = useState(7);

    const [sort, setSort] = useState('sort=registDt,desc');

    let table_sub_data;

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "notice", actTime: new Date().getTime().toString()})
        if(auth === AuthCode.Admin || auth === AuthCode.Manager){
            procGetAxios('/user/notices?'+ sort +"&page="+page+"&size="+pageSize, state.token, contentType, getTableData )
        } else {
            procGetAxios('/user/notices?' + sort + '&search='+search+"&page="+page+"&size="+pageSize, state.token, contentType, getTableData )
        }
    }, [contentType, auth, pageSize, state.token, state.user, search, page, sort])


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
      rdcnt : view +1
    }
    procPostAxios('/user/notice/'+id, state.token, contentType, postData, op, error)  
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
          accessor: (_row: any, i : number) => (i + 1 ) + (page *pageSize) 
        },
        {
            Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'sort=ttl'} btnName='제목'/>, id: 'ttl',
            accessor : a => <Link  to={ContextPath(API_DOMAIN_PATH.noticeDetail)+`/${a.id}`} onClick={ () => viewCount(a.rdcnt, a.id) } >{a.ttl.length < 50 ? a.ttl : a.ttl.slice(0, 50) + '...'}</Link>
        },
        {
          Header : <SortButtonComponent sort={sort} setSort={setSort} sortData={'sort=ctgrycd'} btnName='카테고리'/>, id: 'category',
          accessor:'ctgrycd'
        },
        {
          Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'sort=registDt'} btnName='등록일'/>, id: 'registDt',
          accessor: a => <Fragment>{moment(a.registDt).format("YYYY.MM.DD")}</Fragment>
        },
        {
          Header: <SortButtonComponent sort={sort} setSort={setSort} sortData={'sort=rdcnt'} btnName='조회수'/>, id: 'rdcnt',
          accessor: 'rdcnt'
        }        
    ], [page, sort])

  

    return (
    <section>
        <TittleComponent tittle="공지사항" subTittle="중소벤처24 헬프데스크 공지입니다." />

    <div className="content_wrap">

      
      
      <div className="d-flex justify-content-center mt-7">
        <div className="w-75">
          
          
          <div className="card mt-3">
            <div className="card-body pb-0">

              {(auth === AuthCode.Admin)
              ?
              <div className="text-end mb-2">
                  <ButtonComponent url={ContextPath(API_DOMAIN_PATH.newNotice)} btnName={'신규 등록'} btnClassName={"btn btn-primary btn-xs"}/>
              </div>
              : <></>}
              
              <TableComponent2 data={tableData} columns={columns}/>
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
