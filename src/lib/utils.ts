import { type ClassValue, clsx } from "clsx";
import { Ed25519Extension } from "m3tering-ed25519";
import { EthersExtension } from "m3tering-ethers";
import { twMerge } from "tailwind-merge";
import { type Tag, WarpFactory } from "warp-contracts";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const warp = WarpFactory.forMainnet()
	.use(new Ed25519Extension())
	.use(new EthersExtension());

const tags = [
	{ name: "Contract-Label", value: "M3ters" },
	{ name: "Contract-Use", value: "M3tering Protocol" },
	{ name: "Content-Type", value: "application/json" },
] as Tag[];
export async function interact_evm(
	contractId: string,
	func: string,
	txHash: string,
) {
	const wallet = await warp.arweave.wallets.generate();
	const contract = warp.contract(contractId).connect(wallet);
	const interactionResult = await contract.writeInteraction(
		{
			function: func,
			txHash,
		},
		{ tags, inputFormatAsData: true },
	);
	console.log("result", interactionResult);
}
