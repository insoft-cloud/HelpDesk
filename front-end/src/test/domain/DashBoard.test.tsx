import { render, screen } from "@testing-library/react";
import DashBoardComponent from "domain/service/dashboard/DashBoardComponent";


describe('DashBoard component test', () => {
    test('renders test', () => {
      render(<DashBoardComponent />);
      const miniTitle = screen.getByText("헬프데스크 현황");
      expect(miniTitle).toBeInTheDocument();
    });
  });