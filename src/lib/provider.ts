import { providers, Wallet } from 'ethers';

export const DEFAULT_HARDHAT_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export function createJsonRpcProvider(rpcUrl: string): providers.JsonRpcProvider {
  return new providers.JsonRpcProvider(rpcUrl);
}

export function createWallet(privateKey: string | undefined, provider: providers.Provider): Wallet {
  const keyToUse = privateKey ?? DEFAULT_HARDHAT_PRIVATE_KEY;
  return new Wallet(keyToUse, provider as providers.JsonRpcProvider);
} 