import ButtonModel from "interface/ButtonInterface";
import React from "react";
import { FunctionComponent } from "react";

function AdminButtonComponent({btnName}:any,onEventHandler:Function) {

    return(
        <button className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift" 
        onClick={()=>onEventHandler}>
        {btnName}
        </button>
    )
}

export default AdminButtonComponent; 