# Architecture Overview

## Purpose
A plugin-friendly CLI for interacting with Compound v3 (Comet) on a local Hardhat mainnet fork. The repository is designed for community contributions of new tools and improvements.

## Layout
- `src/cli.ts`: Commander-based CLI entrypoint
- `src/tools/*`: Individual tool commands (e.g., `comet-demo`)
- `src/lib/*`: Shared utilities (provider/wallet helpers, Compound wrappers)
- `hardhat.config.ts`: Hardhat mainnet fork config
- `docs/*`: Documentation

## Flow
1. CLI parses arguments and invokes a tool function
2. Tool uses `src/lib/provider.ts` to create provider and wallet
3. Tool uses `src/lib/compound.ts` to construct the Compound client and Comet market
4. Tool performs read/write operations (e.g., supply/borrow/repay) and logs results

## Decisions
- Ethers v5 chosen for compatibility with `@compound-finance/compound-js`
- Minimal Hardhat plugins to avoid ethers v6 peer dep conflicts
- TypeScript strict mode; ESLint + Prettier for consistency

## Extensibility
- New tools live in `src/tools` and are registered in `src/cli.ts`
- Shared helpers should be added under `src/lib` for reuse
- CI ensures lint/typecheck/build on PRs 