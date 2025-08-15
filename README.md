# Compound Demo (CLI)

This project demonstrates basic interactions with the Compound v3 (Comet) protocol using the Compound-js library and Ethers.js. It runs on a local Hardhat fork of the Ethereum mainnet.

## Description

The CLI provides pluggable tools. Included tools:
- `comet-demo`: supplies WBTC, borrows USDC, repays USDC
- `markets`: prints current supply/borrow rates and utilization
- `fund-and-approve`: impersonates a whale to fund an address with WBTC/USDC and approves Comet

It uses mainnet contract addresses and a default Hardhat private key for demonstration purposes.

## Prerequisites

- Node.js (v16 or later)
- An Infura API key (for mainnet forking)

## Installation

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your Infura URL:
   ```
   INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY
   ```

## Usage

1. Start the Hardhat node with mainnet forking:
   ```
   npm run fork
   ```

2. In a separate terminal, run the CLI:
   ```
   npm run demo
   ```
   Or directly:
   ```
   npm run cli -- markets
   npm run cli -- fund-and-approve --token USDC --from <whale> --amount 100
   npm run cli -- comet-demo
   ```

The tools log relevant information and transaction hashes.

## Notes

- This is a demo and uses a default private key. Do not use in production.
- Ensure the Hardhat node is running before executing the CLI.
- The script assumes the local node is at `http://127.0.0.1:8545`.
- On a fork, Hardhat accounts have ETH only, not WBTC/USDC. Use `fund-and-approve` to bootstrap balances and approvals as needed.

## Project Structure

- `src/cli.ts`: CLI entrypoint (commander)
- `src/tools/*.ts`: Tools (e.g., `comet-demo`, `markets`, `fund-and-approve`)
- `src/lib/*.ts`: Helpers (provider, Compound, ERC20 ABI, etc.)
- `hardhat.config.ts`: Hardhat forking config
- `docs/*`: Architecture and contributor guides

## Contributing

See `CONTRIBUTING.md` for guidelines on adding new tools.
# Backdated for repo correction
