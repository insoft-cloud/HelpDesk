import { procGetAxios } from "axios/Axios";
import { useEffect, useMemo, useState } from "react";
import { useTokenState } from "utils/TokenContext";
import "component/modal/Modal.css";

function MemberModalComponent({open,close,header,modalSize}){
    // let dispatch = useTokenDispatch();
    const state = useTokenState();
    const [contentType] = useState("application/json");
    // const [tableData, setTableData] = useState([]);
    function getData(){
       procGetAxios("user/members",state.token,contentType,setData);
    }
    function setData(data) {
    // setTableData(data.content)
    }
    function error(){
    console.log(error)
    }
    useEffect(() => {
    getData();
    },[state.token,contentType])
    function save() {
        alert("해당 기능은 개발설계에서 제외된 내용입니다")
        close()
        // let body = {

        // }
        // procPatchAxios("",state.token,contentType,body,getData,error)
    }
    const columns = useMemo(
    () => [
        {Header : "항목", accessor: 'aaaa'},
        {Header : "상세기능", accessor: 'aaaa'},
        {Header : "사용자", accessor: 'aaaa'},
    ]
    ,[])

    const SelectBox = () => {
        return (
            <select className="form-select" disabled>
                <option>모든 권한</option>    
                <option>본인 작성/담당</option>    
                <option>권한 없음</option>
            </select>
        )   
    }
    return (
        <div className={open?'openModal modal' : 'modal'}>
            {open?(
                <section className={modalSize}>
                    <header>
                        개인별 권한 설정 : &nbsp;
                        <span className="text-primary">{header}</span> &nbsp;
                        <span className="text-danger small">해당 기능 제외</span>
                        <button className="close" onClick={close}>
                            {''} &times;{''}
                        </button>
                        
                        <hr />
                    </header>
            <div>
            <table className="table border-top table-bordered align-middle">
                <thead>
                    <tr className="align-middle ">
                        <th className="btn-dark-soft">항목</th>
                        <th className="btn-dark-soft">상세 기능</th>
                        <th>
                            <select className="form-select-sm form-control-sm" disabled>
                                <option>관리자</option>
                                <option>운영자</option>
                                <option>사용자</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="bg-light" colSpan={3}>서비스 이용(작성)</td>
                    </tr>
                    <tr>
                        <td rowSpan={3}>서비스 요청</td>
                        <td>서비스 요청글 작성</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>서비스 요청글 수정</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>서비스 요청글 삭제</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={4}>서비스 처리</td>
                        <td>담당자 지정</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>진행상황 기재 및 코멘트 작성</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>처리 현황 변경 및 완료 처리</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>서비스 만족도 평가</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={4}>공지사항</td>
                        <td>공지사항 작성 (비공개 작성)</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>공지사항 수정</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>공지사항 삭제</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>공지사항 승인 (공개처리)</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-light" colSpan={3}>서비스 이용(열람)</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>전체 서비스</td>
                        <td>서비스 목록 열람</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>서비스 요청 상세</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={3}>요청 현황</td>
                        <td>전체 목록 열람</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>내 업무 열람</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>내 요청 열람</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>공지사항</td>
                        <td>공지사항 열람</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-light" colSpan={3}>관리자</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>서비스 관리</td>
                        <td>코드 관리</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>운영자 지정</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>회원 관리</td>
                        <td>회원 관리</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                    <tr>
                        <td>통계</td>
                        <td>민원 통계</td>
                        <td>
                            <SelectBox />
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <footer className="d-flex justify-content-center">
                        {/* <button className="btn btn-xs ms-2" onClick={close}>취소</button> */}
                        <button className="btn btn-xs ms-2" onClick={save}>확인 </button>
                    </footer>
                </section>
            ):null}
        </div>
    )
}

export default MemberModalComponent;