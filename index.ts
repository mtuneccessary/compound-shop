// @ts-ignore
import Compound = require('@compound-finance/compound-js');
import { providers, Wallet } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const provider = new providers.JsonRpcProvider('http://127.0.0.1:8545');
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // Hardhat default private key
const wallet = new Wallet(privateKey, provider);
// @ts-ignore
const compound = new Compound(provider); // Use local provider
const comet = compound.comet.MAINNET_USDC(); // MAINNET_USDC works on fork as it's a contract address

(async () => {
  // Read market data
  const supplyRate = await comet.getSupplyRate();
  const borrowRate = await comet.getBorrowRate();
  const utilization = await comet.getUtilization();
  console.log({ supplyRate, borrowRate, utilization });

  const me = wallet.address;

  // Supply
  console.log('Supplying WBTC...');
  // WBTC address on Ethereum mainnet: 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
  const WBTC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
  const supplyTrx = await comet.supply(me, me, WBTC_ADDRESS, 3);
  await supplyTrx.wait();
  console.log('Supplied:', supplyTrx.hash);

  // Borrow (withdraw base)
  console.log('Borrowing USDC...');
  // USDC address on Ethereum mainnet: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
  const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
  const borrowTrx = await comet.withdraw(USDC_ADDRESS, 100);
  await borrowTrx.wait();
  console.log('Borrowed:', borrowTrx.hash);

  // Repay (supply base)
  console.log('Repaying USDC...');
  // Use the USDC address directly instead of Compound.USDC
  const repayTrx = await comet.supply(me, me, USDC_ADDRESS, 50);
  await repayTrx.wait();
  console.log('Repaid:', repayTrx.hash);
})().catch(console.error); 