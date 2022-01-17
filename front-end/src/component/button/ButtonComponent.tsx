import React from 'react'
import ButtonModel from "../../interface/ButtonInterface";

/**
 * @Project     : HelpDesk
 * @FileName    : ButtonComponent.tsx
 * @Date        : 2021-01-17
 * @author      : 김지인
 * @description : interface 선언에 따라 재사용 가능한 버튼 컴포넌트
 */


export const ButtonComponent = ({url, btnName, btnClassName} : ButtonModel) => {
    return (
        <a className={btnClassName}
           href={url} target="_self" rel="noopener noreferrer">
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

