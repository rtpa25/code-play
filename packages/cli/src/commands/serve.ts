import { Command } from 'commander';
import { serve } from '@code-play-rp/local-api/dist';
import path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

export const serverCommand = new Command()
  .command('serve [filename]')
  .description('open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );

      console.log(
        `opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`
      );
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        console.log(
          'Port already in use try running on a different port with -p flag and port address'
        );
      } else {
        console.log('Here is the problem', error.message);
      }
      process.exit(1);
    }
  });
