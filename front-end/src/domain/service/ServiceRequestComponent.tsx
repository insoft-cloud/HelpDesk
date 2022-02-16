import axios from "axios";
import TittleComponent from "component/div/TittleComponent";
import QuillEditorComponent from "component/qill/QuillEditorComponent";
import { useEffect, useRef, useState } from "react";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";




function ServiceRequestComponent () {
    let dispatch = useTokenDispatch();
    const state = useTokenState();

    useEffect(() => {
                dispatch({ type: 'SET_PAGE', page: "ServiceRequest"});        
            }, []);


    const quillRef = useRef();
    const [content, setContent] = useState("");
    const [cont, setCont] = useState<string>('');

    const [postData, setPostData] : any = useState({ ttl : '', cnts : ''});


    const form = new FormData();    

    const onChangeTitle = (e: any) => {        
        const newdata = {...postData}
        newdata[e.target.id] = e.target.value
        setPostData(newdata)
        // setTitle(event.target.value);
    };
    
    // 첨부파일 
    const addFile = (event: any): void => {
        event.preventDefault();
        for(let key of Object.keys(event.target.files)) {
            if (key !== 'length') {
              form.append('file', event.target.files[key]);
            }
          }
    }


    const changeHandler = (e) => {
            e.preventDefault();
            console.log(postData)
        
                axios.post("/user/service/request",  postData,{
            
                        headers: {
                            'Content-Type' : "application/json",
                            'X-AUTH-TOKEN' : state.token + ""
                        }
                    })
                        .then((res) => {
                            setPostData(res.data)
                            console.log(res.data)
                
                        })
                        .catch(function (error:any){
                            console.log(error)
                
                        })
            
        };

    return (
        <section>
             <TittleComponent tittle={"서비스 요청 작성"} subTittle={"서비스 오류,장애,기능 개선 등의 요청 사항을 신청할 수 있습니다."}/>
        <form
            id="myDialog"
            onSubmit={changeHandler}
        >
            <table className="tb_data tb_write">
                <tbody>
                <tr>
                    <th>제목</th>
                    <td colSpan={3}>
                        <input
                            type="text"
                            placeholder="제목을 입력하세요."
                            className="form_fullWidth"
                            id="ttl" value={postData.ttl}
                            onChange={onChangeTitle}
                        />
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td colSpan={3} style={{height:'300px'}}>
                          <QuillEditorComponent id='cnts' quillRef={quillRef} htmlContent={postData.cnts} setHtmlContent={onChangeTitle} />
                    </td>
                </tr>
                <tr>
                    <th>첨부파일</th>
                    <td colSpan={3}>
                        <input type='file' id='fileUpload' onChange={addFile}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <button type='reset'>취소</button>
            <button type='submit'>제출</button>
        </form>
        </section>
    );
}

export default ServiceRequestComponent;








// function ServiceRequestComponent() {
    
//   const [postData, setPostData] : any = useState({ ttl : '', cnts : ''});

//     let dispatch = useTokenDispatch();
//     const state = useTokenState();

// const inputHandler = (e) => {
//     const newdata = {...postData}
//     newdata[e.target.name] = e.target.value
//     setPostData(newdata)
// }

// const [type, setType] = useState('기능개선');

// const tabs = [
//     { value: 'err', text: '장애' },
//     { value: 'imp', text: '기능개선' }
//  ]



  
// const changeHandler = (e) => {
//     e.preventDefault();
//     console.log(postData)

//         axios.post("/user/service/request",  postData,{
    
//                 headers: {
//                     'Content-Type' : "application/json",
//                     'X-AUTH-TOKEN' : state.token + ""
//                 }
//             })
//                 .then((res) => {
//                     console.log(res.data)
        
//                 })
//                 .catch(function (error:any){
//                     console.log(error)
        
//                 })
    
// };


//     useEffect(() => {
//         dispatch({ type: 'SET_PAGE', page: "ServiceRequest"});        
//     }, []);




//     return (
//     <section>
//         <TittleComponent tittle={"서비스 요청 작성"} subTittle={"서비스 오류,장애,기능 개선 등의 요청 사항을 신청할 수 있습니다."}/>
       



//         <div className="container" >
//             <div className="lf-menu-nav"><span>설정</span><span>기능개선</span></div>
//             <div className="lf-contents pd12">
//                 <div className="top-controls">
//                     <a href="/"><button className="lf-button primary float-right">목록으로</button></a>
//                 </div>

//                 <div style={{ padding: "12px" }}>
                  
//                     <div className="form-group">

//                     </div>
//                     <div className="form-group">
//                     <input type="text" placeholder="제목" className="form-control" name="ttl" value={postData.ttl} onChange={inputHandler} />
//                     </div>
//                     <div style={{height:'300px'}}>
//                         <QuillEditorComponent quillRef={''} htmlContent={''} setHtmlContent={''}/>
//                     </div>
//                 </div>
//         </div>
//         </div>
       
       
       
       
       
       
//         <div>
//             <form onSubmit={changeHandler}>
//             <div>
//                 요청자
//             </div>
//             <div>
//             <span>유형</span>
//                 <select>
//                     <option>선택</option>
//                     <option>장애</option>
//                     <option>기능개선</option>
//                 </select>
//             </div>
//             <div>
//             <span>시스템명</span>
//                 <select>
//                     <option>선택</option>
//                     <option>중소벤처24</option>
//                     <option>정부24</option>
//                 </select>
//             </div>
            

//                 제목 <input type='text' name="ttl" value={postData.ttl} onChange={inputHandler}></input>
//                 내용 <input type='text' name="cnts" value={postData.cnts} onChange={inputHandler}></input>
                
//                 <button type='reset'>취소</button>
//                 <button type='submit'>제출</button>
//             </form>
//         </div> 
//     </section>
//   )
// }
// export default ServiceRequestComponent;



