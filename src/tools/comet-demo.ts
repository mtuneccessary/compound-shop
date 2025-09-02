import * as dotenv from 'dotenv';
import { createJsonRpcProvider, createWallet } from '../lib/provider';
import { createCompound, getCometUsdc } from '../lib/compound';

dotenv.config();

export interface CometDemoOptions {
  rpcUrl: string;
  privateKey?: string;
}

export async function cometDemo(options: CometDemoOptions): Promise<void> {
  const provider = createJsonRpcProvider(options.rpcUrl);
  const wallet = createWallet(options.privateKey, provider);

  const compound = createCompound(provider);
  const comet = getCometUsdc(compound);

  const supplyRate = await comet.getSupplyRate();
  const borrowRate = await comet.getBorrowRate();
  const utilization = await comet.getUtilization();
  // Basic market info
  console.log({ supplyRate, borrowRate, utilization });

  const me = wallet.address;

  // WBTC and USDC mainnet addresses (work on fork)
  const WBTC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
  const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

  console.log('Supplying WBTC...');
  const supplyTrx = await comet.supply(me, me, WBTC_ADDRESS, 3);
  await supplyTrx.wait();
  console.log('Supplied:', supplyTrx.hash);

  console.log('Borrowing USDC...');
  const borrowTrx = await comet.withdraw(USDC_ADDRESS, 100);
  await borrowTrx.wait();
  console.log('Borrowed:', borrowTrx.hash);

  console.log('Repaying USDC...');
  const repayTrx = await comet.supply(me, me, USDC_ADDRESS, 50);
  await repayTrx.wait();
  console.log('Repaid:', repayTrx.hash);
} 