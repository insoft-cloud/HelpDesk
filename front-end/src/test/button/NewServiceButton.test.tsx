import {render, screen} from "@testing-library/react";
import NewServiceRequestButtonComponent from "component/button/NewServiceRequestButtonComponent";

describe('Button component test', () => {
    test('render test', () => {
        render(<NewServiceRequestButtonComponent />);
        const btn = screen.getByText('신규 서비스 요청 작성');
        expect(btn).toBeInTheDocument();
    });
});