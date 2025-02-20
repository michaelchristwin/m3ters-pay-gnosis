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
import { createSignal, Switch, Match, Show } from "solid-js";
import { M3terHead, m3terAlias } from "m3ters-solid";

interface FormState {
  tokenId: string;
  amount: number;
}
const Web3PaymentInterface = () => {
  const [formState, setFormState] = createSignal<FormState>({
    tokenId: "",
    amount: 0,
  });

  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Web3 transaction
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setFormState({
      tokenId: "",
      amount: 0,
    });
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Token ID:", formState().tokenId);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center p-4">
      <Card class="w-full max-w-md border border-purple-500/20 bg-gray-900/90 backdrop-blur-sm">
        <CardHeader class="space-y-1 border-b border-purple-500/20">
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
                    value={formState().tokenId}
                    onInput={handleChange}
                    class="h-11 bg-gray-800 border-purple-500/20 text-white placeholder:text-gray-500 pl-12"
                  />
                </TextField>
                <div class="absolute left-2 top-1/2 -translate-y-1/2">
                  <Switch>
                    <Match when={formState().tokenId}>
                      <div class="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/30">
                        <M3terHead seed={formState().tokenId} size={32} />
                      </div>
                    </Match>
                    <Match when={!formState().tokenId}>
                      <div class="w-8 h-8 rounded-full bg-gray-700/50 border border-purple-500/30 flex items-center justify-center">
                        <FiHash class="h-4 w-4 text-gray-500" />
                      </div>
                    </Match>
                  </Switch>
                </div>
              </div>
              <Show when={formState().tokenId}>
                <div class="text-xs text-gray-400 flex items-center gap-2 pl-12">
                  {m3terAlias(formState().tokenId)}
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
                    type="number"
                    placeholder="0.00"
                    value={formState().amount}
                    oninput={handleChange}
                    class="h-11 bg-gray-800 border-purple-500/20 text-white placeholder:text-gray-500 pl-16"
                    step="0.000001"
                    min="0"
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
              disabled={
                isLoading() || !formState().tokenId || !formState().amount
              }
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
