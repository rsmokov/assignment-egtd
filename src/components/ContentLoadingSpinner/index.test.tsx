import { render, screen } from '@testing-library/react';
import ContentLoadingSpinner from './';

it('renders learn react link', () => {
  render(<ContentLoadingSpinner />);
  const linkElement = screen.getByRole('img');

  expect(linkElement).toBeInTheDocument();
});
