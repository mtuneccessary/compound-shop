# Environment Setup

## Variables
- `INFURA_URL`: Your Infura mainnet endpoint for Hardhat forking, e.g. `https://mainnet.infura.io/v3/<KEY>`

## Example
Create a `.env` file in the project root:

```
INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY
```

## Notes
- Keep your keys private. Do not commit `.env` files.
- The CLI defaults to `http://127.0.0.1:8545` for JSON-RPC. Start `npm run fork` first. 