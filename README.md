# Compound Demo

This project demonstrates basic interactions with the Compound v3 (Comet) protocol using the Compound-js library and Ethers.js. It runs on a local Hardhat fork of the Ethereum mainnet.

## Description

The script in `index.ts` performs the following actions:
- Connects to a local Hardhat node.
- Supplies WBTC as collateral.
- Borrows USDC.
- Repays a portion of the borrowed USDC.

It uses hardcoded mainnet contract addresses and a default Hardhat private key for demonstration purposes.

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

2. In a separate terminal, run the demo script:  
   ```
   npm run start
   ```

The script will log the transaction hashes for supply, borrow, and repay operations, as well as current market rates.

## Notes

- This is a demo and uses a default private key. Do not use in production.
- Ensure the Hardhat node is running before executing the script.
- The script assumes the local node is at `http://127.0.0.1:8545`.

## Dependencies

- @compound-finance/compound-js
- ethers
- dotenv

For more details, see `package.json`.
# compund-shop
