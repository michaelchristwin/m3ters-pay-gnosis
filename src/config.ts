import { http, createConfig } from "@wagmi/core";
import { gnosis } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [gnosis],
  // connectors: [
  //   injected(),
  //   metaMask(),
  //   walletConnect({ projectId: PROJECT_ID }),
  //   safe(),
  // ],
  transports: {
    [gnosis.id]: http(),
  },
});
