import path from "path";

import vitePluginDebug from "./src/plugin";

export default {
  test: {
    name: "vite-plugin-debug-js",
    include: ["test/**/*.spec.ts"],
    environment: "happy-dom",
    environmentMatchGlobs: [
      ["test/**/*.browser.spec.ts", "happy-dom"],
      ["test/**/*.node.spec.ts", "node"],
    ],
  },
  plugins: [
    vitePluginDebug({
      rootDir: path.resolve(__dirname),
      debugNamespace: "vite-app",
      debugEnabled: true,
      stripComponents: [".", ".."],
      dropDebugCalls: !!process.env.DROP_DEBUG_CALLS,
    }),
  ],
};
