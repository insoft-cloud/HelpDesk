import React from "react";
import HeaderComponent from "../layout/HeaderComponent";

function InputComponent({InputType : input}){
    return (
        <input
            type={input.type}
            className={input.className}
            ref={input.ref}
            onChange=
            {
                null === input.onChange ? null : input.onChange
            }
            placeholder={input.placeholder}/>
    )
}
export default InputComponent;