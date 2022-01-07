
import React from "react";


export const ContextPath = (url : string) => {
    console.log(process.env.REACT_APP_CONTEXT_PATH);
    return process.env.REACT_APP_CONTEXT_PATH + url
}