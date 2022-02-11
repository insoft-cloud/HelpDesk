import axios from "axios";
import { useEffect, useState } from "react";
import { useTokenDispatch, useTokenState } from "utils/TokenContext";

function ServiceRequestComponent() {
  let dispatch = useTokenDispatch()

    const state = useTokenState();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', page: "myRequest"})
        axios.post("/user/service/requests/"+state.user, {
            headers: {
                'Content-Type' : "application/json",
                'X-AUTH-TOKEN' : state.token + ""
            }
        })
            .then(({data}) => {
                setTableData(data)
            })
            .catch(function (error:any){
                console.log(error)
    
            }); 
    }, [state.user]);

    return (
    <div>
        <form>
            제목 <input></input>
            내용 <input></input> 

            <button>취소</button>
            <button>제출</button>
        </form>
    </div>
  )
}
export default ServiceRequestComponent