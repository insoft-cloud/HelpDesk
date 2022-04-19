import { procGetAxios } from "axios/Axios";
import { Fragment, useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";



export default function SelectComponent({ urlData, onChange, labelName}) {
    
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [codeDlt, setCodeDlt] : any = useState([])
  
    useEffect( () => {
        procGetAxios("/admin/group/"+urlData+"/details", state.token, contentType, SelectData)
    }, []);
  
    function SelectData(data) {
        setCodeDlt(data.content)
    }


    return (
    <>
    <label className="form-label">{labelName}</label>
    <select className="form-select" size={1} aria-label="Default select example" onChange={onChange} defaultValue='default'>
    <option value="default" hidden>선택</option>
    {codeDlt.map( (a  => 
             <option key={a.id} value={a.cdId}>{a.name}</option>
        ))}

    </select>
    </>
  )
}



export function SelectPrcComponent({ urlData, onChange }) {
    
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [codeDlt, setCodeDlt] : any = useState([])
  
    useEffect( () => {
        procGetAxios("/admin/group/"+urlData+"/details", state.token, contentType, SelectData)
    }, []);
  
    function SelectData(data) {
        setCodeDlt(data.content)
    }


    return (
    <>
    <select className="form-select form-select-xs" size={1} aria-label="Default select example" onChange={onChange} defaultValue='default'>
    <option value="default">전체</option>
    {codeDlt.map( (a  => 
             <option key={a.id} value={a.cdId}>{a.name}</option>
        ))}
    </select>
    </>
  )
}


export function SelectChangeComponent({ urlData, onChange, data }) {
    
    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [codeDlt, setCodeDlt] : any = useState([])
  
    useEffect( () => {
        procGetAxios("/admin/group/"+urlData+"/details", state.token, contentType, SelectData)
    }, []);
  
    function SelectData(data) {
        setCodeDlt(data.content)
    }

    return (
    <>
    <select className='form-select form-select-xs' size={1} aria-label="Default select example" onChange={onChange} defaultValue={data}>
    <option hidden value={data}>{ data == null ? '선택' : (codeDlt.map((a => a.cdId === data ? a.name : null)))}</option>
    {codeDlt.map( (a  => 
             <option key={a.id} value={a.cdId}>{a.name}</option>
        ))}

    </select>
    </>
  )
}



export function SelectedComponent({ urlData, select}) {

    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [codeDlt, setCodeDlt] : any = useState([])
  
    useEffect( () => {
        procGetAxios("/admin/group/"+urlData+"/details", state.token, contentType, SelectedData)
    }, []);
  
    function SelectedData(data) {
             data.content.forEach(e => {
                if(select ===e.cdId){
                    e.cdId = e.name;
                    setCodeDlt(e.cdId);
                }
            })
    }

    return (
<>


        {codeDlt}
</> 
)
}
