import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { I18nProvider } from '../i18n';

function renderHome() {
  return render(
    <I18nProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </I18nProvider>,
  );
}

describe('Home page', () => {
  it('renders title and visitor number', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ total: 42 }),
    }) as any;

    renderHome();

    expect(
      await screen.findByRole('heading', { name: 'Užupis Cat — Retro Tribute' }),
    ).toBeInTheDocument();
    expect(await screen.findByText('Visitor #42')).toBeInTheDocument();
  });

  it('shows toast when scratching', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ total: 1 }),
    }) as any;

    class AudioContextMock {
      public currentTime = 0;
      createOscillator() {
        return {
          type: '',
          frequency: { setValueAtTime: jest.fn() },
          connect: jest.fn(),
          start: jest.fn(),
          stop: jest.fn(),
        } as any;
      }
      createGain() {
        return {
          connect: jest.fn(),
          gain: {
            setValueAtTime: jest.fn(),
            exponentialRampToValueAtTime: jest.fn(),
          },
        } as any;
      }
      destination = {} as any;
    }
    (global as any).AudioContext = AudioContextMock as any;

    renderHome();

    fireEvent.click(screen.getByRole('button', { name: 'Scratch Ear' }));

    expect(
      await screen.findByRole('status'),
    ).toHaveTextContent('Fear scratched away. Go create something kind.');
    jest.useRealTimers();
  });
});
