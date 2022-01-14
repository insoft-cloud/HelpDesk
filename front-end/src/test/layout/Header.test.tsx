import { render, screen } from '@testing-library/react';
import HeaderComponent from 'component/layout/HeaderComponent';
import React from 'react';

describe('Header component test', () => {
    test('render test', () => {
        render(<HeaderComponent />);
        const navbar = screen.getByText('로그인');
        expect(navbar).toBeInTheDocument();
    });
});