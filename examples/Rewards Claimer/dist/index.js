"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commander_1 = require("commander");
const ethers_1 = require("ethers");
const CometRewards_json_1 = __importDefault(require("./abi/CometRewards.json"));
const config_1 = require("./config");
async function main() {
    const env = (0, config_1.loadEnv)();
    const program = new commander_1.Command();
    program
        .requiredOption('-a, --account <address>', 'Account to check/claim for')
        .option('--claim', 'Claim rewards using PRIVATE_KEY')
        .parse(process.argv);
    const { account, claim } = program.opts();
    if (!env.COMET_ADDRESS)
        throw new Error('COMET_ADDRESS not set');
    if (!env.COMET_REWARDS_ADDRESS)
        throw new Error('COMET_REWARDS_ADDRESS not set');
    const provider = new ethers_1.JsonRpcProvider(env.RPC_URL);
    const signer = env.PRIVATE_KEY ? new ethers_1.Wallet(env.PRIVATE_KEY, provider) : undefined;
    const rewards = new ethers_1.Contract(env.COMET_REWARDS_ADDRESS, CometRewards_json_1.default, signer ?? provider);
    const owed = await rewards.getRewardOwed(env.COMET_ADDRESS, account);
    const token = owed.token;
    const amount = owed.owed;
    console.log('Reward owed (raw):', { token, amount: amount.toString() });
    if (claim) {
        if (!signer)
            throw new Error('PRIVATE_KEY required to claim');
        if ((await signer.getAddress()).toLowerCase() !== account.toLowerCase()) {
            console.warn('Warning: Claiming for a different src than signer');
        }
        const tx = await rewards.claim(env.COMET_ADDRESS, account, true);
        console.log('Claim sent:', tx.hash);
        const rcpt = await tx.wait();
        console.log('Claim mined in block', rcpt.blockNumber);
    }
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
