import { useState, useRef, FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CRTFrame from '../components/CRTFrame';
import ThemeToggle from '../components/ThemeToggle';
import Nav from '../components/Nav';
import Toast from '../components/Toast';

const API = import.meta.env.VITE_API_BASE ?? '';

interface Pledge {
  name?: string;
  message: string;
  timestamp: number;
}

async function fetchPledges(): Promise<Pledge[]> {
  const res = await fetch(`${API}/api/pledge`);
  if (!res.ok) throw new Error(`Failed to load pledges: ${res.status}`);
  return res.json();
}

export default function Pledges() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState('');
  const queryClient = useQueryClient();
  const submitTimer = useRef<ReturnType<typeof setTimeout>>();

  const { data: pledges } = useQuery({ queryKey: ['pledges'], queryFn: fetchPledges });

  const mutation = useMutation({
    mutationFn: async (payload: { name?: string; message: string }) => {
      const res = await fetch(`${API}/api/pledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save pledge');
      return (await res.json()) as Pledge;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['pledges'] });
      const previous = queryClient.getQueryData<Pledge[]>(['pledges']) ?? [];
      const optimistic: Pledge = { ...payload, timestamp: Date.now() };
      queryClient.setQueryData(['pledges'], [optimistic, ...previous]);
      setMessage('');
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(['pledges'], context.previous);
      setToast('Something went wrong');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['pledges'] });
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed.length === 0 || trimmed.length > 300) {
      setToast('Message must be between 1 and 300 characters');
      return;
    }
    if (submitTimer.current) clearTimeout(submitTimer.current);
    submitTimer.current = setTimeout(() => {
      mutation.mutate({ name: name.trim() || undefined, message: trimmed });
    }, 300);
  }

  return (
    <CRTFrame>
      <Nav />
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="border border-[var(--color-text)] bg-transparent p-2"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            maxLength={300}
            required
            className="border border-[var(--color-text)] bg-transparent p-2"
          />
          <button type="submit" className="self-start border border-[var(--color-text)] px-4 py-2">
            Submit
          </button>
        </form>

        {pledges && pledges.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {pledges.map((p) => (
              <li key={p.timestamp} className="border border-[var(--color-text)] p-2">
                {p.name && <strong className="block">{p.name}</strong>}
                <span>{p.message}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pledges yet. Be the first!</p>
        )}
      </div>
      {toast && <Toast message={toast} />}
      <ThemeToggle className="absolute top-4 right-4" />
    </CRTFrame>
  );
}
