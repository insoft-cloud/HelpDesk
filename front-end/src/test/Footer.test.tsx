import { render, screen } from "@testing-library/react";
import FooterComponent from "component/layout/FooterComponent";

describe('Footer component test', () => {
    test('render test', () => {
        render(<FooterComponent />);
        const footer = screen.getByText('이용약관');
        expect(footer).toBeInTheDocument();
    });
});