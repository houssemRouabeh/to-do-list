import React from 'react';
import { render, screen } from './test-utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the color mode switcher', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it('renders the Tasks component', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /to do list/i })
    ).toBeInTheDocument();
  });
});
