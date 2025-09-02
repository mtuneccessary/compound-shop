#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const comet_demo_1 = require("./tools/comet-demo");
const markets_1 = require("./tools/markets");
const fund_and_approve_1 = require("./tools/fund-and-approve");
const program = new commander_1.Command();
program
    .name('compound-tools')
    .description('CLI for Compound v3 demo tools')
    .version('1.0.0');
program
    .command('comet-demo')
    .description('Run the Comet USDC demo (supply/borrow/repay)')
    .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
    .option('--private-key <hex>', 'Private key (0x...) for local wallet')
    .action((opts) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, comet_demo_1.cometDemo)({ rpcUrl: opts.rpc, privateKey: opts.privateKey });
}));
program
    .command('markets')
    .description('Print Comet USDC market info (supply/borrow rates, utilization)')
    .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
    .action((opts) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, markets_1.markets)({ rpcUrl: opts.rpc });
}));
program
    .command('fund-and-approve')
    .description('Impersonate whale, transfer token to recipient, and approve Comet')
    .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
    .requiredOption('--token <WBTC|USDC>', 'Token symbol to transfer and approve')
    .requiredOption('--from <address>', 'Impersonation whale address')
    .option('--to <address>', 'Recipient address (defaults to local wallet)')
    .option('--amount <amount>', 'Human amount to transfer (e.g., 0.001)', '0.001')
    .option('--private-key <hex>', 'Private key (0x...) for local wallet')
    .action((opts) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fund_and_approve_1.fundAndApprove)({
        rpcUrl: opts.rpc,
        privateKey: opts.privateKey,
        token: opts.token,
        from: opts.from,
        to: opts.to,
        amount: opts.amount,
    });
}));
program.parseAsync(process.argv);
