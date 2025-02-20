/* @refresh reload */
import { lazy, ParentComponent } from "solid-js";
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./index.css";
import { createAppKit } from "@reown/appkit";
import { gnosis } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import Navbar from "~/components/Navbar";

const queryClient = new QueryClient();

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

export const networks = [gnosis];

const wagmiAdapter = new WagmiAdapter({
  projectId: PROJECT_ID,
  networks,
});

const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

createAppKit({
  adapters: [wagmiAdapter],
  networks: [gnosis],
  metadata,
  projectId: PROJECT_ID,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
const Layout: ParentComponent = (props) => {
  return (
    <div class="w-[100vw] h-[100vh]">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        {props.children}
      </QueryClientProvider>
    </div>
  );
};

const routes = [
  {
    path: "/",
    component: lazy(() => import("./routes")),
  },
];
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <Router root={Layout}>{routes}</Router>, root!);
