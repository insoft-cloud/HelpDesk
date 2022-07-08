import {LabelType} from "../../interface/label/LabelType";
import React from "react";


function LabelComponent({LabelType : label} ){
    return (
        <label className={label.className} htmlFor={label.htmlFor}>
            {label.text}
        </label>
    )
}

export default LabelComponent;