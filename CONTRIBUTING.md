# Contributing

Thank you for considering contributing! This project is organized as a small, plugin-friendly CLI with tools under `src/tools` and shared code under `src/lib`.

## Repository Layout

- `src/cli.ts`: CLI entrypoint using `commander`
- `src/tools/*`: Individual tools/commands
- `src/lib/*`: Reusable utilities (provider/wallet, protocol wrappers)
- `hardhat.config.ts`: Local mainnet fork configuration

## Adding a New Tool

1. Create a new file under `src/tools`, e.g. `src/tools/my-new-tool.ts` and export a function:

```ts
export interface MyNewToolOptions { /* define your options */ }
export async function myNewTool(options: MyNewToolOptions): Promise<void> {
  // implement
}
```

2. Register the tool in `src/cli.ts`:

```ts
import { myNewTool } from './tools/my-new-tool';

program
  .command('my-new-tool')
  .description('Describe what it does')
  .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
  .action(async (opts) => {
    await myNewTool({ /* map options */ });
  });
```

3. Use shared utilities from `src/lib` when possible (e.g., provider/wallet).

4. Add an npm script shortcut (optional) in `package.json`.

## Development

- Install deps: `npm install`
- Start forked node: `npm run fork`
- Run CLI: `npm run cli -- <command>` or `npm run demo`

## Style & TypeScript

- Keep code readable and explicit; avoid single-letter names
- Prefer early returns and guard clauses
- Use strict TypeScript; avoid `any` unless unavoidable (e.g., compound-js)

## Testing

- Prefer deterministic local fork tests
- Add integration steps and checks where feasible

## Security

- Never commit real private keys or secrets
- Default Hardhat key is acceptable only for local forks 