"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cometDemo = cometDemo;
const dotenv = __importStar(require("dotenv"));
const provider_1 = require("../lib/provider");
const compound_1 = require("../lib/compound");
dotenv.config();
function cometDemo(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = (0, provider_1.createJsonRpcProvider)(options.rpcUrl);
        const wallet = (0, provider_1.createWallet)(options.privateKey, provider);
        const compound = (0, compound_1.createCompound)(provider);
        const comet = (0, compound_1.getCometUsdc)(compound);
        const supplyRate = yield comet.getSupplyRate();
        const borrowRate = yield comet.getBorrowRate();
        const utilization = yield comet.getUtilization();
        // Basic market info
        console.log({ supplyRate, borrowRate, utilization });
        const me = wallet.address;
        // WBTC and USDC mainnet addresses (work on fork)
        const WBTC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
        const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
        console.log('Supplying WBTC...');
        const supplyTrx = yield comet.supply(me, me, WBTC_ADDRESS, 3);
        yield supplyTrx.wait();
        console.log('Supplied:', supplyTrx.hash);
        console.log('Borrowing USDC...');
        const borrowTrx = yield comet.withdraw(USDC_ADDRESS, 100);
        yield borrowTrx.wait();
        console.log('Borrowed:', borrowTrx.hash);
        console.log('Repaying USDC...');
        const repayTrx = yield comet.supply(me, me, USDC_ADDRESS, 50);
        yield repayTrx.wait();
        console.log('Repaid:', repayTrx.hash);
    });
}
