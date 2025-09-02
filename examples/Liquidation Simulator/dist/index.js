"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commander_1 = require("commander");
const ethers_1 = require("ethers");
const Comet_json_1 = __importDefault(require("./abi/Comet.json"));
const config_1 = require("./config");
async function main() {
    const env = (0, config_1.loadEnv)();
    const program = new commander_1.Command();
    program.requiredOption('-t, --targets <addresses>', 'Comma-separated target accounts').parse(process.argv);
    const { targets } = program.opts();
    const list = targets.split(',').map((s) => s.trim()).filter(Boolean);
    if (!env.COMET_ADDRESS)
        throw new Error('COMET_ADDRESS not set');
    const provider = new ethers_1.JsonRpcProvider(env.RPC_URL);
    const comet = new ethers_1.Contract(env.COMET_ADDRESS, Comet_json_1.default, provider);
    for (const a of list) {
        const healthy = await comet.isBorrowCollateralized(a).catch(() => true);
        console.log({ account: a, liquidatable: !healthy });
    }
}
main().catch((err) => { console.error(err); process.exit(1); });
