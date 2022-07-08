import { Link } from 'react-router-dom';
import { ButtonModel } from '../../interface/ButtonInterface';

/**
 * @Project     : HelpDesk
 * @FileName    : ButtonComponent.tsx
 * @Date        : 2022-01-20
 * @author      : 김지인
 * @description : interface 선언에 따라 재사용 가능한 버튼 컴포넌트
 */


export const ButtonComponent = ({url, btnName, btnClassName} : ButtonModel) => {
    return (
        <Link className={btnClassName}
           to={url} target="_self" rel="noopener noreferrer">
            {btnName}
        </Link>
    );
}

