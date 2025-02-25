import { http, createConfig } from "@wagmi/core";
import { gnosis } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import abi from "@/ABIs/abi.json";
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

export const config = createConfig(
  getDefaultConfig({
    chains: [gnosis],
    appName: "m3terspay",
    walletConnectProjectId: PROJECT_ID,
    appDescription: "",
    appIcon: "",
    appUrl: "",
    transports: {
      [gnosis.id]: http(),
    },
  })
);

export const contractConfig = {
  address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
  abi: abi,
} as const;
