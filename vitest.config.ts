import path from "path";
import { defineConfig } from "vitest/config";

import vitePluginDebug from "./src/plugin";

export default defineConfig({
  plugins: [
    vitePluginDebug({
      rootDir: path.resolve(__dirname),
      debugNamespace: "vite-app",
      debugEnabled: true,
      stripComponents: [".", ".."],
    }),
  ],
  test: {
    name: "vite-plugin-debug-js",
    include: ["test/**/*.spec.ts"],
    environment: "happy-dom",
    environmentMatchGlobs: [
      ["test/**/*.browser.spec.ts", "happy-dom"],
      ["test/**/*.node.spec.ts", "node"],
    ],
  },
});
