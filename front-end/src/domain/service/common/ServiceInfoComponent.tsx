import { procGetAxios } from 'axios/Axios';
import { useEffect, useState } from 'react'
import { AuthCode } from 'utils/AdminCode';
import { useTokenState } from 'utils/TokenContext';
import ServiceComentComponent from '../detail/ServiceComentComponent';
import ServiceDetailComponent from '../detail/ServiceDetailComponent';
import ServiceManagmentComponent from '../detail/ServiceManagmentComponent';
import {useNavigate} from "react-router-dom";
import {txtBlock} from "../../../utils/CommonText";
import {API_DOMAIN_PATH, ContextPath} from "../../../utils/ContextPath";

/**
 * @Project     : HelpDesk
 * @FileName    : ServiceInfoComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 서비스 요청 상세정보(요청 내용, 서비스 관리, 진행사항 코멘트) 컴포넌트
 */


 function ServiceInfoComponent({rqstId}) {

    const [chargeNo, setChargeNo] = useState('')
    const [check, setCheck] = useState<number>(0)
    const state = useTokenState();
    const navigate = useNavigate();
    const auth = state.auth;

    useEffect( () => {
        procGetAxios('/user/service/request/'+rqstId+'/charges', state.token,  "application/json", ok)
        procGetAxios('user/service/request/'+ rqstId +"/histories/count", state.token, "application/json", setCount )
        if(state.auth===AuthCode.superAdmin){
            alert(txtBlock.authBlock);
            navigate(ContextPath(API_DOMAIN_PATH.main));
        }
    }, [rqstId, check])

    function ok(data){
        if(data.content.length < 1){
            setChargeNo('');
        } else {
            setChargeNo(data.content[0].id)
        }
    }
    function setCount(data){
        setCheck(data)
    }
    
  return (
      <>
    <div className="scroll_y pd30 pt00">
                            <div className="card shadow">
                                <ServiceDetailComponent rqstId ={ rqstId } />
                            </div>
                            { auth === AuthCode.Admin || auth === AuthCode.Manager ?
                            <div className="shadow mt-5">
                                <ServiceManagmentComponent rqstId={rqstId} chId={chargeNo} setCheck={setCheck}/>
                            </div>
                             : <></> } 
                             <div className="shadow mt-5">
                            <ServiceComentComponent rqstId={rqstId} check={check}/>
                            </div> 
                        </div>
    </>
  )
}
export default ServiceInfoComponent;
