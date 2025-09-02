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
exports.fundAndApprove = fundAndApprove;
const dotenv = __importStar(require("dotenv"));
const ethers_1 = require("ethers");
const provider_1 = require("../lib/provider");
const compound_1 = require("../lib/compound");
const erc20_1 = require("../lib/erc20");
dotenv.config();
const ADDRESSES = {
    WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
};
function setBalanceAndImpersonate(provider, address) {
    return __awaiter(this, void 0, void 0, function* () {
        yield provider.send('hardhat_setBalance', [address, '0x3635C9ADC5DEA00000']); // 1000 ETH
        yield provider.send('hardhat_impersonateAccount', [address]);
    });
}
function fundAndApprove(options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const provider = (0, provider_1.createJsonRpcProvider)(options.rpcUrl);
        const localWallet = (0, provider_1.createWallet)(options.privateKey, provider);
        const recipient = (_a = options.to) !== null && _a !== void 0 ? _a : localWallet.address;
        const tokenAddress = ADDRESSES[options.token];
        const token = new ethers_1.Contract(tokenAddress, erc20_1.ERC20_ABI, provider);
        // Impersonate the whale and fund recipient
        yield setBalanceAndImpersonate(provider, options.from);
        const whaleSigner = provider.getSigner(options.from);
        const decimals = yield token.connect(whaleSigner).decimals();
        const symbol = yield token.connect(whaleSigner).symbol();
        const ten = ethers_1.BigNumber.from(10);
        const amountWei = ten.pow(decimals).mul(ethers_1.BigNumber.from(options.amount.replace(/\D/g, '')));
        console.log(`Transferring ${options.amount} ${symbol} from ${options.from} to ${recipient}...`);
        const tx = yield token.connect(whaleSigner).transfer(recipient, amountWei);
        yield tx.wait();
        console.log('Transfer tx:', tx.hash);
        const compound = (0, compound_1.createCompound)(provider);
        const comet = (0, compound_1.getCometUsdc)(compound);
        const cometAddress = (_b = comet.address) !== null && _b !== void 0 ? _b : yield ((_c = comet.getAddress) === null || _c === void 0 ? void 0 : _c.call(comet));
        console.log(`Approving Comet at ${cometAddress} to spend ${symbol} from ${recipient}...`);
        const recipientSigner = provider.getSigner(recipient);
        const approveTx = yield token.connect(recipientSigner).approve(cometAddress, amountWei);
        yield approveTx.wait();
        console.log('Approve tx:', approveTx.hash);
    });
}
