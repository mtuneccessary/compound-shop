"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ethers_1 = require("ethers");
const Comet_json_1 = __importDefault(require("./abi/Comet.json"));
const config_1 = require("./config");
async function main() {
    const env = (0, config_1.loadEnv)();
    const provider = new ethers_1.JsonRpcProvider(env.RPC_URL);
    if (!env.COMET_ADDRESS) {
        console.log('Set COMET_ADDRESS in .env');
        return;
    }
    const comet = new ethers_1.Contract(env.COMET_ADDRESS, Comet_json_1.default, provider);
    const [name, symbol] = await Promise.all([
        comet.name().catch(() => 'Comet'),
        comet.symbol().catch(() => 'COMET')
    ]);
    const utilization = (await comet.getUtilization().catch(() => 0n));
    const borrowRate = (await comet.getBorrowRate?.(utilization).catch(() => 0n));
    const supplyRate = (await comet.getSupplyRate?.(utilization).catch(() => 0n));
    const reserveRate = (await comet.reserveRate?.().catch(() => 0n));
    const kink = (await comet.kink?.().catch(() => 0n));
    const baseRate = (await comet.baseRate?.().catch(() => 0n));
    const slopeLow = (await comet.slopeLow?.().catch(() => 0n));
    const slopeHigh = (await comet.slopeHigh?.().catch(() => 0n));
    const storefront = (await comet.storeFrontPriceFactor?.().catch(() => 0n));
    console.log('Market:', { name, symbol });
    console.log('Rates/raw:', { utilization: (0, ethers_1.formatUnits)(utilization, 18), borrowRate: borrowRate.toString(), supplyRate: supplyRate.toString() });
    console.log('Curve/raw:', { reserveRate: reserveRate.toString(), kink: kink.toString(), baseRate: baseRate.toString(), slopeLow: slopeLow.toString(), slopeHigh: slopeHigh.toString() });
    console.log('Other/raw:', { storeFrontPriceFactor: storefront.toString() });
    const numAssets = Number(await comet.numAssets().catch(() => 0));
    const assets = [];
    for (let i = 0; i < numAssets; i++) {
        const info = await comet.getAssetInfo(i);
        const price = (await comet.getPrice(info.asset).catch(() => 0n));
        assets.push({
            index: Number(info.offset ?? i),
            asset: info.asset,
            priceFeed: info.priceFeed,
            scale: info.scale?.toString?.() ?? '',
            borrowCollateralFactor: info.borrowCollateralFactor?.toString?.() ?? '',
            liquidateCollateralFactor: info.liquidateCollateralFactor?.toString?.() ?? '',
            liquidationFactor: info.liquidationFactor?.toString?.() ?? '',
            supplyCap: info.supplyCap?.toString?.() ?? '',
            price: price.toString()
        });
    }
    console.log({ assets });
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
