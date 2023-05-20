# vite-plugin-debug-js

This is a small plugin for Vite to import the [debug](https://github.com/debug-js/debug) package.

It provides a virtual module that sets up the namespace based on the path and file name. Because
being lazy is its own reward.

## Getting Started

### Installation

```sh
pnpm add -D vite-plugin-debug-js debug
```

Then add to your `vite.config.ts`:

```typescript
import vitePluginDebug from 'vite-plugin-debug-js';

export default defineConfig({
  plugins: [
    vitePluginDebug(),
  ],
});
```

### Usage

Import and call:

```typescript
import { debug } from 'virtual:debug-js';

debug("Hello, world!");

// Depending on your environment, you should see something similar to:
//    2023-05-16 13:43:11.1030 vite-app:lib:hello.ts Hello, world!
```

### Types

Add to `vite-env.d.ts` or anywhere else in the project:

```typescript
declare module "virtual:debug-js" {
  import { Debugger } from "debug";
  const debug: Debugger;
}
```

## Doing more

### Configuration

The following options can be passed to the plugin:

```typescript
export interface ViteDebugOptions {
  /** The absolute path to the root of the projecct. This will be used to generate
   *  Ids for Debug, among other things.
   */
  rootDir: string;

  /** The namespace to use for Debug.  */
  debugNamespace: string;

  /** Enable debugging for this namespace to be active. It is also possible to set
   *  this to 'false' and use the standard Debug methods of enabling/disabling.
   */
  debugEnabled?: boolean;

  /** Names of path components not to include in the namespace (e.g. 'src')
   */
  stripComponents?: string[];
}
```

### Further reading

[debug](https://github.com/debug-js/debug) offers some neat features for both
browser and node environments; see its documentation for more details. This
plugin is just a wrapper around the import so you don't have to think about namespaces.
