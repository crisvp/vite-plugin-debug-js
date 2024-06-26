import Debug from "debug";
import { debug } from "virtual:debug-js";
import { describe, expect, it, vi } from "vitest";

const dropCalls = process.env.DROP_DEBUG_CALLS;

const f = Debug("x");
describe("vite-plugin-debug-js", () => {
  it("is running in a browser context", () => {
    expect(typeof window).toBe("object");
    expect(window.console.log).toBeDefined();
    expect(window.console.debug).toBeDefined();
    expect(globalThis).toBe(window);
    expect(globalThis.console).toBe(window.console);
    expect(globalThis.console).toBe(console);
  });

  it("calls console.log with namespace", async () => {
    const logSpy = vi.spyOn(Debug, "log");
    debug("This is a test");
    if (dropCalls) expect(logSpy).not.toHaveBeenCalled();
    else {
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "vite-app:test:plugin.browser.spec.ts This is a test"
        )
      );
    }
  });
});
