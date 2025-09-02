"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_HARDHAT_PRIVATE_KEY = void 0;
exports.createJsonRpcProvider = createJsonRpcProvider;
exports.createWallet = createWallet;
const ethers_1 = require("ethers");
exports.DEFAULT_HARDHAT_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
function createJsonRpcProvider(rpcUrl) {
    return new ethers_1.providers.JsonRpcProvider(rpcUrl);
}
function createWallet(privateKey, provider) {
    const keyToUse = privateKey !== null && privateKey !== void 0 ? privateKey : exports.DEFAULT_HARDHAT_PRIVATE_KEY;
    return new ethers_1.Wallet(keyToUse, provider);
}
