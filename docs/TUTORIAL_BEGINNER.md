# Beginner Tutorial: First Steps with Compound Connect Tools

This tutorial walks you through running a local mainnet fork, funding a wallet with tokens, approving Comet, and executing a simple supply/borrow/repay flow using the CLI.

## Prerequisites
- Node.js 16+
- Infura API key (for mainnet forking)

## 1) Install and Configure
```
npm install
```
Create `.env` in the project root:
```
INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY
```

## 2) Start a Local Mainnet Fork
In terminal A:
```
npm run fork
```
This starts Hardhat at `http://127.0.0.1:8545` and forks mainnet using your Infura URL.

## 3) Inspect Market Data (Read-Only)
In terminal B:
```
npm run cli -- markets
```
You should see supply/borrow rates and utilization for Comet USDC.

## 4) Fund and Approve Tokens
To run write operations, you need tokens and ERC-20 approvals. On a fork you can impersonate a well-funded address ("whale"). Example for USDC:
```
npm run cli -- fund-and-approve --token USDC --from 0xWhaleAddress --amount 100
```
Notes:
- Replace `0xWhaleAddress` with a real USDC holder on mainnet.
- The command tops up ETH for gas on both accounts and approves Comet to spend the token from your local wallet.

For WBTC (for collateral):
```
npm run cli -- fund-and-approve --token WBTC --from 0xWhaleAddress --amount 0.001
```

## 5) Run the Demo Flow
```
npm run cli -- comet-demo
```
The demo:
- Supplies a small amount of WBTC
- Borrows USDC
- Repays part of the USDC

## Troubleshooting
- Ensure the fork is running (terminal A) before running commands.
- If a command fails with connection errors, wait a few seconds and retry.
- If approvals or balances are insufficient, re-run the `fund-and-approve` command.

## Next Steps
- Explore recipes in `docs/COOKBOOK.md`.
- Add your own tool following `docs/HOW_TO_ADD_A_TOOL.md`. 