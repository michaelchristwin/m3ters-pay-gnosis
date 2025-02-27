import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tag, WarpFactory } from "warp-contracts";
import { EthersExtension } from "m3tering-ethers";
import { Ed25519Extension } from "m3tering-ed25519";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const warp = WarpFactory.forMainnet()
  .use(new Ed25519Extension())
  .use(new EthersExtension());

const wallet = await warp.arweave.wallets.generate();
const tags = [
  { name: "Contract-Label", value: "M3ters" },
  { name: "Contract-Use", value: "M3tering Protocol" },
  { name: "Content-Type", value: "application/json" },
] as Tag[];
export async function interact_evm(
  contractId: string,
  func: string,
  txHash: string
) {
  const contract = warp.contract(contractId).connect(wallet);
  const interactionResult = await contract.writeInteraction(
    {
      function: func,
      txHash,
    },
    { tags, inputFormatAsData: true }
  );
  console.log("result", interactionResult);
}
