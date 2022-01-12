import { render, screen } from "@testing-library/react";
import RequestListComponent from "component/list/RequestListComponent";

describe('RequestList component test', () => {
    test('render test', () => {
        render(<RequestListComponent />);
        const footer = screen.getByText('최근 등록된 업무 목록');
        expect(footer).toBeInTheDocument();
    });
});