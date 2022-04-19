import { procGetAxios } from 'axios/Axios';
import { useEffect, useState } from 'react'
import { AuthCode } from 'utils/AdminCode';
import { useTokenState } from 'utils/TokenContext';
import ServiceComentComponent from '../detail/ServiceComentComponent';
import ServiceDetailComponent from '../detail/ServiceDetailComponent';
import ServiceManagmentComponent from '../detail/ServiceManagmentComponent';

 function ServiceInfoComponent({rqstId}) {

    const [chargeNo, setChargeNo] = useState('')
    const state = useTokenState();
    const auth = sessionStorage.getItem("auth");

    useEffect( () => {
        procGetAxios('/user/service/request/'+rqstId+'/charges', state.token,  "application/json", ok)

    }, [rqstId])

    function ok(data){
        if(data.content.length < 1){
            setChargeNo('');
        
        } else {
            setChargeNo(data.content[0].id)
        }
    }
    
  return (
      <>
    <div className="scroll_y pd30 pt00">
                            <div className="card shadow">
                                <ServiceDetailComponent rqstId ={ rqstId } />
                            </div>
                            { auth === AuthCode.superAdmin || auth === AuthCode.Admin ?
                            <div className="shadow mt-5">
                                <ServiceManagmentComponent rqstId={rqstId} chId={chargeNo} />
                            </div>
                             : <></> } 
                            {chargeNo === '' ? 
                            <></>
                            : <div className="shadow mt-5">
                            <ServiceComentComponent rqstId={rqstId} />
                        </div> }
                        </div>
    </>
  )
}
export default ServiceInfoComponent;