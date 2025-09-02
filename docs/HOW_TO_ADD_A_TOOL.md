# How to Add a New Tool

## 1) Create the tool module
Create a file in `src/tools`, export an options interface and a function:

```ts
export interface MyToolOptions {
  rpcUrl: string;
}

export async function myTool(options: MyToolOptions): Promise<void> {
  // implement tool logic here
}
```

Use shared helpers from `src/lib` when possible.

## 2) Register the command
In `src/cli.ts`, import and register the new command:

```ts
import { myTool } from './tools/my-tool';

program
  .command('my-tool')
  .description('Describe what it does')
  .option('--rpc <url>', 'JSON-RPC URL', 'http://127.0.0.1:8545')
  .action(async (opts) => {
    await myTool({ rpcUrl: opts.rpc });
  });
```

## 3) Test locally
- Start fork: `npm run fork`
- Run CLI: `npm run cli -- my-tool`

## 4) Open a PR
- Add brief docs to `README.md` or `docs/`
- Ensure `npm run typecheck && npm run lint && npm run build` succeed
- Fill PR template and link issues 