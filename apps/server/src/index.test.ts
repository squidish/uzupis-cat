import type { AddressInfo } from 'node:net';
import { describe, it, expect } from 'vitest';
import app, { resetVisits } from './index';

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
