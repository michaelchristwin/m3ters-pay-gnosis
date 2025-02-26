import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full h-[60px] flex justify-between items-center fixed top-0 left-0 bg-transparent px-4 py-3">
      <p></p>
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => (
          <button
            onClick={show}
            className="inline-flex items-center gap-2 px-4 h-11 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 rounded-md"
          >
            {isConnected ? (
              ensName ?? truncatedAddress
            ) : (
              <>
                Connect <Wallet className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </ConnectKitButton.Custom>
    </nav>
  );
};

export default Navbar;
