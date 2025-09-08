import type { AddressInfo } from 'node:net';
import { describe, it, expect, vi } from 'vitest';
import app, { resetVisits, resetPledges } from './index';

describe('GET /api/visits', () => {
  it('increments and returns visit count', async () => {
    resetVisits();
    const server = app.listen(0);
    const { port } = server.address() as AddressInfo;

    const res1 = await fetch(`http://localhost:${port}/api/visits`);
    const json1 = (await res1.json()) as { total: number };
    expect(json1).toEqual({ total: 1 });

    const res2 = await fetch(`http://localhost:${port}/api/visits`);
    const json2 = (await res2.json()) as { total: number };
    expect(json2).toEqual({ total: 2 });

    server.close();
  });
});

describe('POST /api/pledge', () => {
  it('stores and returns a pledge', async () => {
    resetPledges();
    const server = app.listen(0);
    const { port } = server.address() as AddressInfo;

    const res = await fetch(`http://localhost:${port}/api/pledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Ada', message: 'Hello world' }),
    });
    expect(res.status).toBe(200);
    const json = (await res.json()) as { name?: string; message: string; timestamp: number };
    expect(json.name).toBe('Ada');
    expect(json.message).toBe('Hello world');
    expect(typeof json.timestamp).toBe('number');
    server.close();
  });

  it('validates message length', async () => {
    resetPledges();
    const server = app.listen(0);
    const { port } = server.address() as AddressInfo;

    const res = await fetch(`http://localhost:${port}/api/pledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '' }),
    });
    expect(res.status).toBe(400);
    server.close();
  });
});

describe('GET /api/pledge', () => {
  it('returns pledges newest first', async () => {
    resetPledges();
    const server = app.listen(0);
    const { port } = server.address() as AddressInfo;

    vi.setSystemTime(new Date('2020-01-01').getTime());
    await fetch(`http://localhost:${port}/api/pledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'first' }),
    });

    vi.setSystemTime(new Date('2020-01-02').getTime());
    await fetch(`http://localhost:${port}/api/pledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'second' }),
    });

    const res = await fetch(`http://localhost:${port}/api/pledge`);
    const json = (await res.json()) as { message: string }[];
    expect(json.map((p) => p.message)).toEqual(['second', 'first']);

    server.close();
  });
});
