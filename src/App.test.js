import { render, screen } from '@testing-library/react';
import App from './App';

test('renders test message', () => {
  render(<App />);
  const element = screen.getByText(/hi, this is for test/i);
  expect(element).toBeInTheDocument();
});
