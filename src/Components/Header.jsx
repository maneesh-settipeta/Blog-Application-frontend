import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
import ProfileDropDown from "./ProfileDropDown";
import { FaSearch } from "react-icons/fa";
function Header() {
  const { currentUserFirstName, currentUserLastName, clearLocalStorage } =
    useContext(BlogContext);

  const [isOpenMenu, setOpenMenu] = useState(false);
  const handleOpenProfileMenu = () => {
    setOpenMenu(!isOpenMenu);
  };

  useEffect(() => {}, [currentUserFirstName, currentUserLastName]);

  const firstNameExtract = currentUserFirstName ? currentUserFirstName[0] : "";
  const secondNameExtract = currentUserLastName ? currentUserLastName[0] : "";
  return (
    <>
      <div className="pl-6 pt-4 pb-4 text-5xl text-white font-bold border-b border-black mb-3 flex justify-between ">
        <div>
          <Link to="/blogs">
            <h1 className="font-sans"> Blogs</h1>
          </Link>
        </div>
        <div className="flex flex-row">
          <div>
            <input
              className="pt-2 pb-2 pl-2 bg-white mr-4 mb-1 text-customColor rounded-2xl w-80 h-14 mt-0 text-base font-thin"
              placeholder="Search here "
            />
            <div>
              <FaSearch className="absolute top-1/2 right-32 transform -translate-y-1/2 text-customcolorred size-6" />
            </div>
          </div>
          <button
            onClick={handleOpenProfileMenu}
            className="rounded-full font-medium text-2xl p-4 bg-customcolorred mr-7 "
          >
            {firstNameExtract + secondNameExtract}
          </button>
          <ProfileDropDown
            clearLocalStorage={clearLocalStorage}
            isOpen={isOpenMenu}
          />
        </div>
      </div>
    </>
  );
}
export default Header;
