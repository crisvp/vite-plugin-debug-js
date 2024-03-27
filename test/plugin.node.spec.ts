import Debug from "debug";
import { debug } from "virtual:debug-js";
import { describe, expect, it, vi } from "vitest";

const dropCalls = process.env.DROP_DEBUG_CALLS;

describe("vite-plugin-debug-js", () => {
  it("is not running in a browser context", () => {
    expect(typeof window).toBe("undefined");
    expect(globalThis.console).toBe(console);
  });

  it("calls console.log with namespace", async () => {
    if (dropCalls) expect(() => Debug).toThrow();
    else {
      expect(() => Debug).not.toThrow();
      const logSpy = vi.spyOn(Debug, "log");
      debug("This is a test");

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "vite-app:test:plugin.node.spec.ts This is a test"
        )
      );
    }
  });
});
