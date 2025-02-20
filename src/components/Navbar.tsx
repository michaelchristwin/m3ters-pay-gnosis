import { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <nav
      class={`w-full h-[60px] flex justify-between items-center fixed top-0 left-0 bg-transparent px-4 py-3`}
    >
      <p></p>
      {/*@ts-ignore */}
      <appkit-button />
    </nav>
  );
};
export default Navbar;
