import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import Navbar from "@/components/Navbar";
import { config } from "@/config";
import { ConnectKitProvider } from "connectkit";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();
export const Route = createRootRoute({
  component: () => (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <div className={`w-[100vw] h-[100vh]`}>
              <Navbar />
              <Outlet />
              <Footer />
            </div>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>

      <TanStackRouterDevtools />
    </>
  ),
});
