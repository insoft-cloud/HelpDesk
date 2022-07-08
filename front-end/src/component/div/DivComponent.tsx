import {DivType, LabelType} from "../../interface/label/LabelType";
import React from "react";
import LabelComponent from "../label/LabelComponent";
import InputComponent from "../input/InputComponent";

function DivComponent({DivType : div}){
    return (
        <div className={div.className}>
            <LabelComponent LabelType={div.labelType} />
            <InputComponent InputType={div.inputType} />
        </div>
    )
}
export  default DivComponent;