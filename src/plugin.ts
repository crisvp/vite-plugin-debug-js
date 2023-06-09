import path from "path";

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

export default function vitePluginDebug(options?: Partial<ViteDebugOptions>) {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  const virtualModuleId = "virtual:debug-js";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  const rootDir = options?.rootDir ?? path.resolve(dirName);
  const nameSpace = options?.debugNamespace ?? "vite-app";
  const debugEnabled = options?.debugEnabled ?? true;
  const stripComponents = [".", "..", ...(options?.stripComponents ?? [])];

  function idToNamespace(id: string) {
    const relativePath = path.relative(rootDir, id);
    return [
      nameSpace,
      ...relativePath
        .split(path.sep)
        .filter((p) => !stripComponents.includes(p)),
    ].join(":");
  }

  return {
    name: "vite-plugin-debug-js",
    async resolveId(id: string, importer?: string) {
      if (!importer) return null;
      if (id === virtualModuleId)
        return resolvedVirtualModuleId + "?importer=" + importer;

      return null;
    },
    async load(id: string) {
      if (!id.startsWith(resolvedVirtualModuleId)) return null;

      const importer = id.split("?")[1].split("=")[1];
      return {
        code: `
            import Debug from 'debug';
            ${debugEnabled ? `Debug.enable('${nameSpace}:*');` : ""};
            export const debug = Debug('${idToNamespace(
              importer ?? "unknown"
            )}');
      `,
      };
    },
  };
}
