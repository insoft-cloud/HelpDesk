import React from "react";



function AdminButtonComponent( {btnName}: any,
    onEventHandler) {

    return(
        <button className="btn btn-xs btn-outline-dark rounded-1 ms-2 lift ml-3 " 
        onClick= { onEventHandler } >
            {btnName}
        </button>
    )
}

export default AdminButtonComponent; 