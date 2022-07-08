import {procGetAxios, procGetAxiosHeader} from "axios/Axios";
import { useEffect, useState } from "react";
import Select from 'react-select';

export default function SelectComponent2({ urlData, onChange, labelName, defaultName}) {

    const [codeDlt, setCodeDlt] : any = useState([])

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
                value={defaultName}
                onChange={onChange}
                options={options}
                placeholder='선택'
            />
        </>
    )
}

export function SelectComponentCountyCd({ urlData, onChange, defaultName }) {

    const [codeDlt, setCodeDlt] : any = useState([])

    useEffect( () => {
        procGetAxiosHeader("/admin/group/"+urlData+"/details_list", {}, SelectData)
    }, [urlData]);

    function SelectData(data) {
        setCodeDlt(data.sort((a, b) => {
            return a.name.localeCompare(b.name)
        }))
    }
    const options = codeDlt.map( (i) =>  {
        return {
            value: i.cdId,
            label: i.name
        }
    } );
    return (

        <>
            <Select
                className="col-lg-3"
                value={defaultName}
                onChange={onChange}
                options={options}
                placeholder='선택'
            />
        </>
    )
}
