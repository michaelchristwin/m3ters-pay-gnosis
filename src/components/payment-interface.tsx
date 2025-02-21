import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { Button } from "~/components/ui/button";
import { BiRegularWallet } from "solid-icons/bi";
import { FiDollarSign, FiHash } from "solid-icons/fi";
import { IoQrCodeSharp } from "solid-icons/io";
import { createSignal, Switch, Match, Show, JSX } from "solid-js";
import { M3terHead, m3terAlias } from "m3ters-solid";
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "~/config";
import abi from "~/ABIs/abi.json";
import { parseEther } from "viem";

interface FormState {
  tokenId: string;
  amount: number;
}
const Web3PaymentInterface = () => {
  const [formState, setFormState] = createStore<FormState>({
    tokenId: "",
    amount: 0,
  });

  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await writeContract(config, {
        abi,
        address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
        functionName: "pay",
        value: parseEther(String(formState.amount)),
        args: [BigInt(formState.tokenId)],
      });

      const reciept = await waitForTransactionReceipt(config, {
        hash: result,
      });
      if (reciept.status === "reverted") {
        throw Error("Transaction reverted");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      // setFormState({
      //   tokenId: "",
      //   amount: 0,
      // });
    }
  };

  const handleChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const { value } = e.currentTarget;
    setFormState("tokenId", value);
  };

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const newValue = e.currentTarget.value;
    if (/^\d*\.?\d*$/.test(newValue)) {
      setFormState("amount", Number(newValue));
    }
  };

  const handleKeyDown = (e: any) => {
    if (
      !/[0-9.]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  return (
    <div
      style={{
        "background-image":
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../src/assets/gnosis3.png')",
      }}
      class={`min-h-screen bg-contain bg-center bg-[#121212] bg-no-repeat flex items-center justify-center p-4`}
    >
      <Card class="w-full max-w-md border border-green-500/20 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <CardHeader class="space-y-1 border-b border-green-500/20">
          <div class="flex items-center justify-between px-2">
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span class="text-xs text-green-500">Gnosis Chain Connected</span>
            </div>
            <Button variant="ghost" class="h-8 w-8 p-0">
              <IoQrCodeSharp class="h-4 w-4 text-purple-400" />
            </Button>
          </div>
          <CardTitle class="text-2xl font-bold text-center flex items-center justify-center gap-2 text-white">
            <FiDollarSign class="h-6 w-6 text-purple-400" />
            Pay with xDAI
          </CardTitle>
        </CardHeader>
        <CardContent class="mt-4">
          <form onSubmit={handleSubmit} class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiHash class="h-4 w-4 text-purple-400" />
                NFT Token ID
              </label>
              <div class="relative">
                <TextField>
                  <TextFieldInput
                    type="text"
                    name="tokenId"
                    placeholder="Enter NFT token ID"
                    value={formState.tokenId}
                    onInput={handleChange}
                    class="h-11 bg-gray-800 border-green-500/20 text-white placeholder:text-gray-500 pl-12"
                  />
                </TextField>
                <div class="absolute left-2 top-1/2 -translate-y-1/2">
                  <Switch>
                    <Match when={formState.tokenId}>
                      <div
                        class={`relative w-8 h-8 rounded-full overflow-hidden ${
                          !formState.tokenId && "border"
                        } border-green-500/30`}
                      >
                        <Dynamic
                          component={M3terHead}
                          seed={formState.tokenId}
                          size={32}
                        />
                      </div>
                    </Match>
                    <Match when={!formState.tokenId}>
                      <div class="w-8 h-8 rounded-full bg-gray-700/50 border border-green-500/30 flex items-center justify-center">
                        <FiHash class="h-4 w-4 text-gray-500" />
                      </div>
                    </Match>
                  </Switch>
                </div>
              </div>
              <Show when={formState.tokenId}>
                <div class="text-xs text-gray-400 flex items-center gap-2 pl-12">
                  {m3terAlias(formState.tokenId)}
                </div>
              </Show>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiDollarSign class="h-4 w-4 text-purple-400" />
                Amount (xDAI)
              </label>
              <div class="relative">
                <TextField>
                  <TextFieldInput
                    name="amount"
                    type="text"
                    inputMode={`decimal`}
                    placeholder="0.00"
                    value={formState.amount}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    class="h-11 bg-gray-800 border-green-500/20 text-white placeholder:text-gray-500 pl-16"
                  />
                </TextField>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 font-mono">
                  <img
                    src="https://docs.gnosischain.com/img/tokens/xdai.png"
                    alt="xDAI logo"
                    class={`w-[25px] h-[25px]`}
                  />
                </span>
              </div>
            </div>
            <div class="rounded-lg bg-purple-500/10 p-3 border border-purple-500/20">
              <div class="text-xs text-gray-400 flex items-center justify-between">
                <span>Network Fee</span>
                <span class="font-mono">~0.001 xDAI</span>
              </div>
            </div>
            <Button
              type="submit"
              class="w-full h-11 bg-purple-600 hover:bg-purple-700 transition-all duration-200"
              disabled={isLoading() || !formState.tokenId || !formState.amount}
            >
              {isLoading() ? (
                <div class="flex items-center gap-2">
                  <div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Confirming Transaction...
                </div>
              ) : (
                <div class="flex items-center gap-2">
                  <BiRegularWallet class="h-4 w-4" />
                  Confirm Payment
                </div>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter class="justify-center text-xs text-gray-500 flex flex-col gap-1">
          <div class="flex items-center gap-1">
            <div class="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Secured by Gnosis Chain
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Web3PaymentInterface;
