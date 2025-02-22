import { http, createConfig } from "@wagmi/core";
import { gnosis } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
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
