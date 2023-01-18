import { render, screen } from '@testing-library/react';
import NotFound from '.';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),

  useNavigate: () => jest.fn(),
}));

describe('NotFound component', () => {
  it('renders Ooops! title', () => {
    render(<NotFound />);
    const linkElement = screen.getByText(/Ooops!/i);

    expect(linkElement).toBeInTheDocument();
  });

  it('renders image', () => {
    render(<NotFound />);
    const linkElement = screen.getByAltText(/sleeping cat/i);

    expect(linkElement).toBeInTheDocument();
  });
});
