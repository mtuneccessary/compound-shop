import * as dotenv from 'dotenv';
import { BigNumber, Contract, providers } from 'ethers';
import { createJsonRpcProvider, createWallet } from '../lib/provider';
import { createCompound, getCometUsdc } from '../lib/compound';
import { ERC20_ABI } from '../lib/erc20';

dotenv.config();

export interface FundApproveOptions {
  rpcUrl: string;
  privateKey?: string;
  token: 'WBTC' | 'USDC';
  from: string; // whale address to impersonate
  to?: string;  // recipient; defaults to local wallet
  amount: string; // human amount
}

const ADDRESSES = {
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
};

async function setBalanceAndImpersonate(provider: providers.JsonRpcProvider, address: string): Promise<void> {
  await provider.send('hardhat_setBalance', [address, '0x3635C9ADC5DEA00000']); // 1000 ETH
  await provider.send('hardhat_impersonateAccount', [address]);
}

export async function fundAndApprove(options: FundApproveOptions): Promise<void> {
  const provider = createJsonRpcProvider(options.rpcUrl);
  const localWallet = createWallet(options.privateKey, provider);
  const recipient = options.to ?? localWallet.address;

  const tokenAddress = ADDRESSES[options.token];
  const token = new Contract(tokenAddress, ERC20_ABI, provider);

  // Impersonate the whale and fund recipient
  await setBalanceAndImpersonate(provider, options.from);
  const whaleSigner = provider.getSigner(options.from);

  const decimals: number = await token.connect(whaleSigner).decimals();
  const symbol: string = await token.connect(whaleSigner).symbol();
  const ten = BigNumber.from(10);
  const amountWei = ten.pow(decimals).mul(BigNumber.from(options.amount.replace(/\D/g, '')));

  console.log(`Transferring ${options.amount} ${symbol} from ${options.from} to ${recipient}...`);
  const tx = await token.connect(whaleSigner).transfer(recipient, amountWei);
  await tx.wait();
  console.log('Transfer tx:', tx.hash);

  const compound = createCompound(provider);
  const comet = getCometUsdc(compound);
  const cometAddress = comet.address ?? await comet.getAddress?.();

  console.log(`Approving Comet at ${cometAddress} to spend ${symbol} from ${recipient}...`);
  const recipientSigner = provider.getSigner(recipient);
  const approveTx = await token.connect(recipientSigner).approve(cometAddress, amountWei);
  await approveTx.wait();
  console.log('Approve tx:', approveTx.hash);
} 