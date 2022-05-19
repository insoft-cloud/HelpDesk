import {procGetAxios, procGetAxiosHeader} from "axios/Axios";
import { useEffect, useState } from "react";
import { useTokenState } from "utils/TokenContext";
import Select from 'react-select';



export default function SelectComponent({ urlData, onChange, labelName}) {

    const [codeDlt, setCodeDlt] : any = useState([])
    const [selectedOption] = useState<string>('default');

    useEffect( () => {
        procGetAxiosHeader("/admin/group/"+urlData+"/details_list", {}, SelectData)
    }, [urlData]);

    function SelectData(data) {
        setCodeDlt(data)
    }
    const options = codeDlt.map( (i) =>  {
        return {
            value: i.cdId,
            label: i.name
        }
    } );
    return (
        <>
            <label className="col-form-label col-md-2">{labelName}</label>

            <Select
                className="col-md-10"
                defaultValue={selectedOption}
                onChange={onChange}
                options={options}
                placeholder='선택'
            />
        </>
    )
}



export function SelectPrcComponent({ urlData, onChange }) {

    const state = useTokenState();
    const [contentType] = useState("application/json");
    const [codeDlt, setCodeDlt] : any = useState([])

    useEffect( () => {
        procGetAxios("/admin/group/"+urlData+"/details", state.token, contentType, SelectData)
    }, [urlData, state.token, contentType]);

    function SelectData(data) {
        setCodeDlt(data.content)
    }


    return (
        <>
            <select className="form-select form-select-xs " size={1} aria-label="Default select example" onChange={onChange} defaultValue='default'>
                <option value="default">전체</option>
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
    }, [urlData,state.token,contentType,codeDlt]);

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
