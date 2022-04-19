import { useState } from "react";

function InputEditComponent({value,getValue,idx,id}){
    
    const [test,setTest] = useState(value);
    
    function sendValue (e) {
        setTest(e) //화면input
        getValue(e,idx,id) // setData
    }
    return(
        <input 
            type="text" 
            className="form-control border border-secondary" 
            value={test}
            onChange={(e)=>{ sendValue(e.target.value)}}/>        
    )        
}
export default InputEditComponent;