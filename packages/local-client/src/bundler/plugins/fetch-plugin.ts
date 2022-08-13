import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      //loading the input code from the user
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });
      //loading all the cached files from the indexedDB
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //check to see if already fetched file
        const cachedRes = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        //and if it is in the cache return immidiatelly
        if (cachedRes) {
          return cachedRes;
        }
      });
      //loading the css files from the imported pacakges
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerHTML = ${escaped};
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        //store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
      //loading the normal js files from the fetched pacakges
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        //store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
