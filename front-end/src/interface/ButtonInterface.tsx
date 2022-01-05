import React from "react";


interface ButtonInterface{
    url : string  | undefined;
}

export default class ButtonModel implements ButtonInterface{
    public url: string | undefined;
}