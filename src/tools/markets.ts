import * as dotenv from 'dotenv';
import { createJsonRpcProvider } from '../lib/provider';
import { createCompound, getCometUsdc } from '../lib/compound';

dotenv.config();

export interface MarketsOptions {
  rpcUrl: string;
}

export async function markets(options: MarketsOptions): Promise<void> {
  const provider = createJsonRpcProvider(options.rpcUrl);
  const compound = createCompound(provider);
  const comet = getCometUsdc(compound);

  const [supplyRate, borrowRate, utilization] = await Promise.all([
    comet.getSupplyRate(),
    comet.getBorrowRate(),
    comet.getUtilization(),
  ]);

  console.log(JSON.stringify({
    market: 'USDC Comet',
    supplyRate,
    borrowRate,
    utilization,
  }, null, 2));
} 