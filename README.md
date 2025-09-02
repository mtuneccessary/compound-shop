# Compound Connect Tools

[![CI](https://github.com/mtuneccessary/compund-shop/actions/workflows/ci.yml/badge.svg)](https://github.com/mtuneccessary/compund-shop/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A community-driven, plugin-friendly CLI and documentation hub for building with Compound v3 (Comet). This repository provides runnable tools, clear tutorials, and a contribution workflow designed to make it easy for developers to learn, build, and collaborate.

## Highlights
- Extensible CLI with pluggable tools
- Works on a local Hardhat mainnet fork
- Strict TypeScript, ESLint, Prettier, and CI
- Contributor-friendly: issue/PR templates, labels, CODEOWNERS

## Quick Links
- Architecture: `docs/ARCHITECTURE.md`
- Beginner Tutorial: `docs/TUTORIAL_BEGINNER.md`
- Environment: `docs/ENVIRONMENT.md`
- Cookbook: `docs/COOKBOOK.md`
- How to Add a Tool: `docs/HOW_TO_ADD_A_TOOL.md`

## Quick Start

### Prerequisites
- Node.js 16+
- An Infura API key (for Hardhat mainnet forking)

### Install
```
npm install
```

### Environment
Create a `.env` at the repo root with:
```
INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY
```

See `docs/ENVIRONMENT.md` for details.

### Run a local fork
```
npm run fork
```

### Use the CLI (in a second terminal)
```
# Read-only market metrics
npm run cli -- markets

# Fund and approve tokens on the fork (example; requires a whale address)
npm run cli -- fund-and-approve --token USDC --from 0x... --amount 100

# Full demo (supply WBTC -> borrow USDC -> repay USDC)
npm run cli -- comet-demo
```

Notes:
- The CLI defaults to `http://127.0.0.1:8545`. Ensure the fork is running first.
- Hardhat accounts start with ETH only; use `fund-and-approve` for WBTC/USDC and approvals as needed.
- This is a demo. Do not use default keys in production.

## CLI Commands
- `markets`: Prints current supply/borrow rates and utilization for Comet USDC
- `fund-and-approve`: Impersonates a whale on the fork, transfers WBTC/USDC, and approves Comet
- `comet-demo`: Supplies WBTC, borrows USDC, and repays a portion

See `docs/COOKBOOK.md` for more examples and flags.

## Project Structure
```
.
├─ src/
│  ├─ cli.ts               # Commander-based CLI entrypoint
│  ├─ lib/
│  │  ├─ provider.ts       # Provider & wallet helpers
│  │  ├─ compound.ts       # Compound client wrapper
│  │  └─ erc20.ts          # Minimal ERC-20 ABI
│  └─ tools/
│     ├─ markets.ts        # Read-only market info
│     ├─ fund-and-approve.ts # Impersonate whale, transfer, approve
│     └─ comet-demo.ts     # Supply/borrow/repay demo
├─ docs/
│  ├─ ARCHITECTURE.md
│  ├─ ENVIRONMENT.md
│  ├─ HOW_TO_ADD_A_TOOL.md
│  ├─ COOKBOOK.md
│  └─ RELEASE.md
├─ examples/               # Community examples & hackathon submissions
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  ├─ workflows/           # CI, label sync, issue seed
│  └─ CODEOWNERS
├─ hardhat.config.ts       # Forking config (uses INFURA_URL)
├─ tsconfig.json           # rootDir/outDir -> dist
├─ package.json            # scripts, bin, lint/format/typecheck/build
└─ CHANGELOG.md
```

## Development
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build to `dist/`: `npm run build`
- Smoke test (CI/dev): `npm run smoke`

The CLI binary is exposed as `compound-tools` after build (points to `dist/cli.js`).

## How to Contribute
We welcome tools, docs, and examples.

- Read the guidelines: `CONTRIBUTING.md`
- Add a tool: see `docs/HOW_TO_ADD_A_TOOL.md`
- Use labels to find issues: `good first issue`, `help wanted`, `tool`, `docs`, `tutorial`, `ci`, `hackathon`
- Open a PR and ensure CI passes (lint, typecheck, build, smoke)

## Documentation
- Architecture: `docs/ARCHITECTURE.md`
- Environment: `docs/ENVIRONMENT.md`
- Cookbook: `docs/COOKBOOK.md`
- Release process: `docs/RELEASE.md`

## Governance & Security
- Code of Conduct: `CODE_OF_CONDUCT.md`
- Security Policy: `SECURITY.md`
- CODEOWNERS: `.github/CODEOWNERS`
- License: `LICENSE` (MIT)

## Acknowledgements
This repository is part of a broader effort to help developers build with Compound via tutorials, tools, and community collaboration.
