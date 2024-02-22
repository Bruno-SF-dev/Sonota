import logo from "../../assets/sonota.svg";

export const Header = () => {
  return (
    <div className="flex items-center justify-center py-2 bg-black fixed top-0 left-0 right-0 z-10">
      <img src={logo} alt="NLW Experts" className="h-8" />
    </div>
  );
};
