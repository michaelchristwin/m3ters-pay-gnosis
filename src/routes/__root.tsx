import {
	darkTheme,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { WagmiProvider } from "wagmi";
import Navbar from "@/components/Navbar";
import { config } from "@/config";
import "@rainbow-me/rainbowkit/styles.css";
import SafeProvider from "@safe-global/safe-apps-react-sdk";

const queryClient = new QueryClient();

export const Route = createRootRoute({
	component: () => (
		<>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<SafeProvider>
						<RainbowKitProvider
							theme={{
								lightMode: lightTheme(),
								darkMode: darkTheme(),
							}}
						>
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
