import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		mkcert(),
		TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		https: {},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers":
				"X-Requested-With, content-type, Authorization",
		},
	},
});
