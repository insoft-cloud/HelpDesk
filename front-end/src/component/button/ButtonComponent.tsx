import React from "react";
import ButtonModel from "../../interface/ButtonInterface";



export const ButtonComponent = ({url} : ButtonModel) => {
    return (
        <a className="navbar-btn btn btn-sm btn-primary lift ms-auto"
           href={url} target="_blank" rel="noopener noreferrer">
            Buy now
        </a>
    );
}