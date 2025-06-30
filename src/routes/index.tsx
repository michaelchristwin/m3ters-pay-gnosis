import Web3PaymentInterface from "@/components/payment-interface";
import "@/index.css";
import { createFileRoute } from "@tanstack/react-router";

export interface HomeSearchParams {
	id?: string;
	amount?: string;
}

export const Route = createFileRoute("/")({
	component: Index,
	validateSearch: (search: Record<string, unknown>): HomeSearchParams => {
		return {
			id: search.id as string | undefined,
			amount: search.amount as string | undefined,
		};
	},
});

function Index() {
	return (
		<div className={`w-[100vw] h-[100vh]`}>
			<Web3PaymentInterface />
		</div>
	);
}
