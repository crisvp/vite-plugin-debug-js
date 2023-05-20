import Debug from 'debug';
import { debug } from 'virtual:debug';
import { describe, expect, it, vi } from 'vitest';

describe('vite-plugin-debug', () => {
  it('is running in a browser context', () => {
    expect(typeof window).toBe('undefined');
    expect(globalThis.console).toBe(console);
  });

  it('calls console.log with namespace', async () => {
    const logSpy = vi.spyOn(Debug, 'log');

    debug('This is a test');

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('my-app:test:plugin.node.spec.ts This is a test'));
  });
});
