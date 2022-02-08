import {ChangeEventHandler} from "react";

export type LabelType = {
    className : string | ""
    htmlFor : string | ""
    text : string | ""
}

export type InputType = {
    type : string | ""
    className : string | ""
    id : string | ""
    onChange : ChangeEventHandler<HTMLInputElement>
    placeholder : string | ""
}

export type DivType = {
    inputType : InputType
    labelType : LabelType
    className : string | ""
}