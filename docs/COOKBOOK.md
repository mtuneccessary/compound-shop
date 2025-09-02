# CLI Cookbook

- Print market metrics:
  - `npm run cli -- markets`
- Fund USDC to your wallet from a whale and approve Comet:
  - `npm run cli -- fund-and-approve --token USDC --from 0x... --amount 100`
- Run the full demo (after funding):
  - `npm run cli -- comet-demo`
- Change RPC URL (custom):
  - `npm run cli -- markets --rpc http://127.0.0.1:8546`
- Use a custom private key for local wallet:
  - `npm run cli -- comet-demo --private-key 0x...`
- Run smoke (CI/dev):
  - `npm run smoke` 