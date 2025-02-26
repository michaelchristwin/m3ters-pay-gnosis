const Navbar = () => {
  return (
    <nav className="w-full h-[60px] flex justify-between items-center fixed top-0 left-0 bg-transparent px-4 py-3">
      {/* Page title with logo on the top right */}
      <div className="flex items-center gap-1">
        <img
          src="https://docs.gnosischain.com/img/tokens/xdai.png"
          alt="xDAI logo"
          className="w-[25px] h-[25px]"
        />
        <span className="text-2xl font-bold text-white">Charge</span>
      </div>
    </nav>
  );
};

export default Navbar;
