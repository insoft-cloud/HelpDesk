import InputEditComponent from "component/input/InputEditComponent";
import { useState } from "react";

function TrComponent(){
    const [name,setName] = useState('');
    const [cdExplnt,setCdExplnt] = useState('');

    const getName = (text) => {
        setName(text);
    }
    const getCdExplnt = (text) => {
        setCdExplnt(text);
    }
    return(
        <tr>
            <td className="align-middle text-center col-md-1"></td>
            <td className="align-middle text-center col-md-2"><InputEditComponent value={name} getValue={getName} id="" idx=""/></td>
            <td className="align-middle text-center col-md-5"><InputEditComponent value={cdExplnt} getValue={getCdExplnt} id="" idx=""/></td>
            <td className="align-middle text-center col-md-1"></td>
            <td className="align-middle text-center col-md-2"></td>
            <td className="align-middle text-center col-md-1"></td>
        </tr>
    )
}
export default TrComponent;