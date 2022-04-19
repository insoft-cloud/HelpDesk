import { procGetAxios, procPostAxios } from "axios/Axios";
import CheckTableComponent from "component/table/CheckTableComponent";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";
import "component/modal/Modal.css";
import CheckPagingComponent from "../list/CheckPagingComponent";
function ManagerModalComponent({open, close, header,modalSize}){
    let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [isSelected,setIsSelected] = useState('all');
    const [category,setCategory] = useState<any[]>([]);
    const [oper,setOper] = useState([]);
    const [inputTxt,setInputTxt] = useState('');
    const [chkValue,setValue] = useState('all');
    const [memberUrl,setMemberUrl] = useState('/user/members/user?sort=userId');
    const [auth,setAuth] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([])
    // const [total, setTotal] = useState(0);
      //페이징
    const [pageSize] = useState(7);
    const [page, setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    //체크박스
    const [chkArr, setChkArr] = useState<Array<number>>(new Array());
    const checkedArray: number[] = [];
    let key = '{"agencyCode":"'+chkValue+'"}';
    useEffect(()=>{
        dispatch({ type: 'SET_PAGE', page: "codeGroup"})
        getData()
    },[state.token,chkValue,page]);

    function getData() {
        let search = searchKeyword();
        let addUrl;
        if(chkValue==="all"){
            addUrl = "&search="+encodeURI(search);
        }else{
            addUrl = "&key="+encodeURI(key)+"&search="+encodeURI(search)
        }
        procGetAxios("/user/members/user?sort=userId"+addUrl,state.token,"application/json",setData);
        procGetAxios("admin/group/SYS/details",state.token,"application.json",setCode);
        procGetAxios("admin/group/SEAR_CATE/details",state.token,"application.json",setCate);
        procGetAxios("/admin/auths?sort=id", state.token, contentType, getAuth);
      }
    function setData(data){
        let arr:any[]=[];
        data.map((e,i)=>{
            if(Math.floor(i/pageSize)===page){
                arr.push(e)
            }
        })
        setTableData(arr)
        setTotalPages(Math.ceil(data.length/pageSize));
    }
    function error(result){
        console.log(result)
    }
    function setCode(data){
        setOper(data.content);
    }
    function getAuth(data){
        setAuth(data.content);
    }
    function setCate(data){
        setCategory(data.content);
    }
    //전체체크
    const allCheck = (e) =>{
        if(e){
            let end = pageSize;
            if(page+1===totalPages){
                end = tableData.length%pageSize;
            }
            if(end===0) end=pageSize;
            for(let i=0; i<end; i++){
                checkedArray.push(i);
            }
            setChkArr(checkedArray);
        }else{
            setChkArr([]);
        }
    }
    //개별체크
    const changeHandler = useCallback(
    (e,index) => {
        if(e){
            setChkArr([...chkArr,index])
        }else{
            setChkArr(chkArr.filter((i)=>i!==index))
        }
    },[chkArr])

    function searchKeyword(){
        let txt = "{";
        if (isSelected === 'all') {
            category.map((e, i) => {
                txt += '"' + e.cdId + '":"' + inputTxt + '"'
                if (i !== category.length - 1) { txt += ',' }
            })
        } else {
            txt += '"' + isSelected + '":"' + inputTxt + '"'
        }
        txt += "}"

        return txt;
    }
    const search = () => {
        let search = searchKeyword();
        let addUrl;
        if(chkValue==="all"){
            addUrl = "&search="+encodeURI(search);
        }else{
            addUrl = "&key="+encodeURI(key)+"&search="+encodeURI(search)
        }
        procGetAxios("/user/members/user?sort=userId"+addUrl,state.token,"application/json",setData);
        // procGetAxios("/admin/groups",state.token,contentType,setData);
        setPage(0)
    }

    const columns = useMemo(
        () => [
            {Header : "아이디",accessor: "userId"},
            {Header : "이름",accessor: "username"},
            {Header : "직급",accessor: "rankCode"},
        ],[])

    
    function checkHandle () {
        if (window.confirm("권한을 변경하시겠습니까?")) {
            chkArr.map(e=>{
                let body:any = {
                    userId : tableData[e]['userId'],
                    updateDt: moment(),
                    auth : auth[1]
                }
                procPostAxios("/user/member/" + body.userId, state.token, contentType, body, close, error);
            })
        }
    }
    function onKeyPress(e) {
        if(e==='Enter'){
            search();
        }
    }
    return(
        <div className={open?'openModal modal' : 'modal'}>
            {open?(
                <section className={modalSize}>
                    <header>
                        <span>{header}</span>
                        <button className="close" onClick={close}>
                            {''} &times;{''}
                        </button>
                        <hr />
                    </header>
                    <div className="d-flex justify-content-between w-auto input-group input-group-sm">
                        <select className="ml-3 mb-3 p-1" onChange={(e) =>setIsSelected(e.target.value)}>
                            <option value="all">전체</option>
                            {category.map(e=>{
                                return <option key={e.cdId} value={e.cdId}>{e.name}</option>    
                            })}
                        </select>
                        <input type="search" className="border border-secondary form-control p-2 ms-2 mb-3" onChange={(e)=>setInputTxt(e.target.value)} onKeyPress={e=>onKeyPress(e.key)} value={inputTxt} />
                        <button className="btn btn-s btn-secondary mb-3 display-4" onClick={search}>검색</button>
                    </div>
                    <div className="instBox">
                        <p>기관을 선택하면 우측에 이름이 표시됩니다</p>
                        <label className="list-unstyled d-block"><input type="radio" name="inst" value="all" defaultChecked={true} onChange={e=>{setValue(e.target.value); setPage(0)}}/>전체</label>
                        {oper.map((e,i)=>{
                            return <label className="list-unstyled d-block" key={i}><input type="radio" name="inst" value={e['cdId']} onChange={e=>{setValue(e.target.value); setPage(0)}}/>{e['name']}</label>
                        })}
                    </div>
                    <div className="memBox">
                        <CheckTableComponent data={tableData} columns={columns} limit={page+1===totalPages?tableData.length%pageSize===0?pageSize:tableData.length%pageSize:pageSize} changeHandler={changeHandler} allCheck={allCheck} chkArr={chkArr} />
                        <div className="d-flex justify-content-center">
                            <nav aria-label="Page navigation example">
                                <CheckPagingComponent page={page} setPage={setPage} totalPages={totalPages} setChkArr={setChkArr} />
                            </nav>
                        </div>
                    </div>
                    
                    <footer className="d-flex justify-content-center">
                        <button className="btn btn-xs ms-2" onClick={close}>닫기</button>
                        <button className="btn btn-xs ms-2" onClick={checkHandle}>선택 </button>
                    </footer>
                </section>
            ):null}
        </div>
    )

    
}

export default ManagerModalComponent;