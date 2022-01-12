import {render, screen} from "@testing-library/react";
import ServiceProgressButtonComponent from "component/button/ServiceProgressButtonComponent";

describe('Button component test', () => {
    test('render test', () => {
        render(<ServiceProgressButtonComponent />);
        const btn = screen.getByText('서비스 요청 진행사항 확인');
        expect(btn).toBeInTheDocument();
    });
});