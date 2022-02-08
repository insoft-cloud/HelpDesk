import React from "react";

function InputComponent({InputType : input}){
    return (
        <input type={input.type} className={input.className} id={input.id} onChange={input.onChange} placeholder={input.placeholder}/>
    )
}
export default InputComponent;