#!/usr/bin/env node
import { program } from 'commander';
import { serverCommand } from './commands/serve';

program.addCommand(serverCommand);

program.parse(process.argv);
