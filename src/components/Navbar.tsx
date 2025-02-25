import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className={`w-full h-[60px] flex justify-between items-center fixed top-0 left-0 bg-transparent px-4 py-3`}
    >
      <p></p>
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => {
          return (
            <button onClick={show} 
              className="inline-flex items-center h-11 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
              >
              {isConnected ? ensName ?? truncatedAddress : Connect <Wallet className="h-4 w-4" />}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </nav>
  );
};
export default Navbar;
