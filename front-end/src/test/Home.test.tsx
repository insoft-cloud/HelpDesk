import { render, screen } from "@testing-library/react";
import HomeComponent from "component/HomeComponent";

describe('Home component test', () => {
    test('renders test', () => {
      render(<HomeComponent />);
      const mainImg = screen.getByRole('img');
      expect(mainImg).toHaveAttribute('alt', 'main');
    });
  });