"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompound = createCompound;
exports.getCometUsdc = getCometUsdc;
// @ts-ignore
const Compound = require("@compound-finance/compound-js");
function createCompound(provider) {
    // compound-js does not ship full TypeScript types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Compound(provider);
}
function getCometUsdc(compoundClient) {
    return compoundClient.comet.MAINNET_USDC();
}
