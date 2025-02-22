import "@/App.css";
import Web3PaymentInterface from "@/components/payment-interface";
import { createFileRoute } from "@tanstack/react-router";

//@ts-ignore
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className={`w-[100vw] h-[100vh]`}>
      <Web3PaymentInterface />
    </div>
  );
}
