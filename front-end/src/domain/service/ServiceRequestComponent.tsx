import axios from "axios";
import TittleComponent from "component/div/TittleComponent";
import { useDebugValue, useEffect, useState } from "react";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";

function ServiceRequestComponent() {


    
  const [Ttl, SetEmail] = useState("");
  const [Cnts, SetPassword] = useState("");

    const state = useTokenState();
    let dispatch = useTokenDispatch()


         
    const submitHandler = (e) => {
        e.preventDefault();

    let form = {
        ttl : "Ttl",
        cnts : "Cnts",
    };
    axios.post("/user/service/requests/", {
        headers: {
            'Content-Type' : "application/json",
            'X-AUTH-TOKEN' : state.token + ""
        }, form
    })
        .then((res) => {
            console.log(res)

        })
        .catch(function (error:any){
            console.log(error)

        });

    };


const emailHandler = (e) => {
    e.preventDefault();
    SetEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    SetPassword(e.target.value);
  };


    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "ServiceRequest"})
        // axios.post("/user/service/requests/", form {
        //     headers: {
        //         'Content-Type' : "application/json",
        //         'X-AUTH-TOKEN' : state.token + ""
        //     }
        // })
        //     .then((res) => {
        //         console.log(res)

        //     })
        //     .catch(function (error:any){
        //         console.log(error)
    
        //     }); 
    }, [state.user]);




    return (
    <section>
        <TittleComponent tittle={"서비스 요청 작성"} subTittle={"서비스 오류,장애,기능 개선 등의 요청 사항을 신청할 수 있습니다."}/>
        <div>
            <form onSubmit={submitHandler}>
            <div>
                요청자
            </div>
            <div>
            <span>유형</span>
                <select>
                    <option>선택</option>
                    <option>장애</option>
                    <option>기능개선</option>
                </select>
            </div>
            <div>
            <span>시스템명</span>
                <select>
                    <option>선택</option>
                    <option>중소벤처24</option>
                    <option>정부24</option>
                </select>
            </div>
            

                제목 <input type='ttl' value={Ttl} onChange={emailHandler}></input>
                내용 <input type='cnts' value={Cnts} onChange={passwordHandler}></input> 
                
                <button type='reset'>취소</button>
                <button type='submit'>제출</button>
            </form>
        </div>
    </section>
  )
}
export default ServiceRequestComponent;