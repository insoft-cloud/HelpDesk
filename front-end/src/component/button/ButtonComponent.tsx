import React from 'react'
import ButtonModel from "../../interface/ButtonInterface";



export const ButtonComponent = ({url, btnName, btnClassName} : ButtonModel) => {
    return (
        <a className={btnClassName}
           href={url} target="_blank" rel="noopener noreferrer">
            {btnName}
        </a>
    );
}


// function ButtonComponent( btnName : any, func : Function) {
//     return (
//         <button onClick={ func }>{ btnName }</button>
//     )
// }
// export default ButtonComponent

