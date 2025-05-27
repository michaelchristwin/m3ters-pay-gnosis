import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import Navbar from "@/components/Navbar";
import { config } from "@/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import SafeProvider from "@safe-global/safe-apps-react-sdk";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <SafeProvider>
            <RainbowKitProvider>
              <div className={`w-[100vw] h-[100vh]`}>
                <Navbar />
                <Outlet />
              </div>
            </RainbowKitProvider>
          </SafeProvider>
        </QueryClientProvider>
      </WagmiProvider>

      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
});
