import { signal, effect } from "@preact/signals-react";

const isSafe = signal(false);

effect(() => {
  if (typeof window !== "undefined") {
    const inSafe =
      window.parent &&
      window.self !== window.parent &&
      window.location.ancestorOrigins?.[0]?.includes("app.safe.global");

    isSafe.value = inSafe;
  }
});

export const useIsSafeApp = () => isSafe;
