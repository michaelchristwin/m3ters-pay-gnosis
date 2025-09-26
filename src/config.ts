import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "@wagmi/core";
import { gnosis } from "wagmi/chains";
import abi from "@/ABIs/abi.json";

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

if (!PROJECT_ID) {
  console.error("Project Id not available!");
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [walletConnectWallet, safeWallet],
    },
  ],
  {
    appName: "xCharge",
    projectId: PROJECT_ID || "",
  }
);

export const config = createConfig({
  chains: [gnosis],
  transports: {
    [gnosis.id]: http(),
  },
  connectors,
});

export const contractConfig = {
  address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
  abi: abi,
} as const;
