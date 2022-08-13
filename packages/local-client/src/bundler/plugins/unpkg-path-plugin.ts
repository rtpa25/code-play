import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      /*
        filter is basically regex property to match the file  type in such way there can be multiple onResolve and onLoad calls for files of different types
      */

      /*
        nameSpace is basically another technique to match the files on which a certain combination of onReolve and onLoad will be called
      */

      //resolving the entrypoint of the package
      build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
        return { path: args.path, namespace: 'a' };
      });

      //resolving the relative imports in the index.js file <entrypoint>
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
          namespace: 'a',
        };
      });

      //resolving the main file from the root pacakge from unpkg
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
