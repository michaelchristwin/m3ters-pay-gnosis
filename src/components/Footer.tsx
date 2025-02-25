import BuiltOnETH from "@/assets/built-on-ethereum2.png";

function Footer() {
  return (
    <footer
      className={`w-full px-[30px] h-[40px] flex justify-end items-center fixed bottom-0 left-0 border border-green-500/20 bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 `}
    >
      <img src={BuiltOnETH} className={`h-[25px] w-[90px]`} />
    </footer>
  );
}

export default Footer;
