import { procGetAxios } from "axios/Axios";
import { useEffect, useState } from "react";
import { CodeDetail } from "utils/AdminCode";
import { useTokenState } from "utils/TokenContext";
import "./ServiceCountComponent.css";

/**
 * @Project     : HelpDesk
 * @FileName    : ServiceCountComponent.tsx
 * @Date        : 2022-03-23
 * @author      : 김지인
 * @description : 상태별 서비스 요청 카운트
 */


export function CountComponent({data}) {
    
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [codeDlt, setCodeDlt] : any = useState([])
    
    useEffect( () => {
        procGetAxios("/admin/group/"+CodeDetail.prcsSttsCd+"/details", state.token, contentType, SelectData)
    }, [CodeDetail.prcsSttsCd]);
    function SelectData(data) {
        setCodeDlt(data.content)
    }

    if(data){
        let compareCodeDlt =   codeDlt.map(a => a.cdId)
        let comparePrcsSttsCd = data.map(a => a.procs_stts_cd)

        if(compareCodeDlt !== comparePrcsSttsCd){
            let addData = compareCodeDlt.filter(value => !comparePrcsSttsCd.includes(value))         
                addData.forEach(element => {
                let pushData = {
                    procs_stts_cd : element,
                    count : 0
                }
                data.push(pushData)
            });
        }
    }

    return (
    <div className="d-flex card shadow">
                        <div className="card-footer">
                            <div className="col_5 text-center">
                            <div className="border-right cursor-default">
                                <h3 className="fs-1 text-primary cursor-default">{data.reduce((total, value) => total = total + value.count, 0)}</h3>
                                <p className="mb-0 fs-sm text-muted cursor-default">전체</p>
                            </div>
                            {codeDlt.map( ( (a, index)   =>
                                <div className=" text-primary border-right cursor-default" key={index}>
                                    { data.map( b => (a.cdId === b.procs_stts_cd ?
                                        <h3 key={b.procs_stts_cd} className={b.procs_stts_cd+" fs-1 cursor-default"}>{b.count}</h3> :
                                       null
                                        )
                                    )}
                                <p className="mb-0 fs-sm text-muted cursor-default">{a.name}</p>
                            </div>
                                 ))}
                            
                            </div>
                        </div>
                        </div>
  )
}
