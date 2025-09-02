#!/usr/bin/env node
import { Command } from 'commander';
import { cometDemo } from './tools/comet-demo';
import { markets } from './tools/markets';
import { fundAndApprove } from './tools/fund-and-approve';

const program = new Command();

program
  .name('compound-tools')
  .description('CLI for Compound v3 demo tools')
  .version('1.0.0');

program
  .command('comet-demo')
  .description('Run the Comet USDC demo (supply/borrow/repay)')
  .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
  .option('--private-key <hex>', 'Private key (0x...) for local wallet')
  .action(async (opts) => {
    await cometDemo({ rpcUrl: opts.rpc, privateKey: opts.privateKey });
  });

program
  .command('markets')
  .description('Print Comet USDC market info (supply/borrow rates, utilization)')
  .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
  .action(async (opts) => {
    await markets({ rpcUrl: opts.rpc });
  });

program
  .command('fund-and-approve')
  .description('Impersonate whale, transfer token to recipient, and approve Comet')
  .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
  .requiredOption('--token <WBTC|USDC>', 'Token symbol to transfer and approve')
  .requiredOption('--from <address>', 'Impersonation whale address')
  .option('--to <address>', 'Recipient address (defaults to local wallet)')
  .option('--amount <amount>', 'Human amount to transfer (e.g., 0.001)', '0.001')
  .option('--private-key <hex>', 'Private key (0x...) for local wallet')
  .action(async (opts) => {
    await fundAndApprove({
      rpcUrl: opts.rpc,
      privateKey: opts.privateKey,
      token: opts.token,
      from: opts.from,
      to: opts.to,
      amount: opts.amount,
    });
  });

program.parseAsync(process.argv); 