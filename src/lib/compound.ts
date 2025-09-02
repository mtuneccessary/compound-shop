// @ts-ignore
import Compound = require('@compound-finance/compound-js');
import { providers } from 'ethers';

export function createCompound(provider: providers.Provider): any {
  // compound-js does not ship full TypeScript types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new (Compound as any)(provider as any);
}

export function getCometUsdc(compoundClient: any): any {
  return compoundClient.comet.MAINNET_USDC();
} 