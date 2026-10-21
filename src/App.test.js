import { render, screen } from '@testing-library/react';
import App from './App';

test('renders news category navigation and the default headlines', async () => {
  process.env.REACT_APP_NEWS_API_KEY = 'test-api-key';
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ status: 'ok', articles: [], totalResults: 0 }),
  });

  render(<App />);

  expect(screen.getByRole('link', { name: 'Sports' })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /top general headlines/i })).toBeInTheDocument();
});
