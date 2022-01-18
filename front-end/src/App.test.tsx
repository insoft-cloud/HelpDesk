import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('App component test', () => {
  test('renders test', () => {
    render(<App />);
    const mainImg = screen.getByRole('img');
    expect(mainImg).toHaveAttribute('alt', '...');
  });
});
