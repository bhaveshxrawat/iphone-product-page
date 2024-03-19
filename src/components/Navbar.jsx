import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="flex items-start justify-between p-5 sm:px-10">
      <nav className="screen-max-width flex w-full">
        <img src={appleImg} alt="Apple" width="14" height="18" />
        <ul className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item, index) => (
            <li key={index} className="cursor-pointer px-5 text-sm text-gray hover:text-white ">{item}</li>
          ))}
        </ul>
        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end"> 
          <img src={searchImg} alt="Search" width="18" height="18" />
          <img src={bagImg} alt="Cart" width="18" height="18" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
