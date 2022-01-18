import { render, screen } from "@testing-library/react";
import HomeComponent from "domain/main/HomeComponent";

describe('Home component test', () => {
    test('renders test', () => {
      render(<HomeComponent />);
      const mainImg = screen.getByRole('img');
      expect(mainImg).toHaveAttribute('alt', '...');
    });
  });