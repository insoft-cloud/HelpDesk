import { render, screen } from "@testing-library/react";
import NoticeListComponent from "component/list/NoticeListComponent";

describe('NoticeList component test', () => {
    test('render test', () => {
        render(<NoticeListComponent />);
        const footer = screen.getByText('공지사항');
        expect(footer).toBeInTheDocument();
    });
});