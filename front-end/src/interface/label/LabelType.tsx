import {ChangeEventHandler, RefObject} from "react";

export type LabelType = {
    className? : string | ""
    htmlFor? : string | ""
    text? : string | ""
}

export type InputType = {
    type? : string | ""
    className? : string | ""
    onChange? : ChangeEventHandler<HTMLInputElement> | null
    ref? : RefObject<any>
    placeholder? : string | ""
    maxLength? : number | ""
}

export type DivType = {
    inputType? : InputType
    labelType? : LabelType
    className? : string | ""
}