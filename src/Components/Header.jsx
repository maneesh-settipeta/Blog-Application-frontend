import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
import ProfileDropDown from "./ProfileDropDown";
import { FaSearch } from "react-icons/fa";

function Header() {
  const { user, clearLocalStorage, handleSearchQuery } =
    useContext(BlogContext);

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [searchQuery, setSearchingQuery] = useState("");
  const dropdown = useRef();
  const handleOpenProfileMenu = () => {
    setOpenMenu(!isOpenMenu);
  };

  const handleSendSearchQuery = (searchQuery) => {
    setSearchingQuery(searchQuery);
    handleSearchQuery(searchQuery);
  };

  const firstNameExtract = user?.firstName ? user?.firstName[0] : "";
  const secondNameExtract = user?.lastName ? user?.lastName[0] : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdown.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="pl-6 pt-3 pb-2 text-3xl text-white font-medium border-b border-black mb-1 flex justify-between ">
        <div>
          <Link to="/blogs">
            <h1 className="font-sans"> Blogs</h1>
          </Link>
        </div>
        <div className="flex flex-row">
          <div>
            <input
              value={searchQuery}
              onChange={(e) =>
                handleSendSearchQuery(e.target.value.toLowerCase())
              }
              className="pt-2 pb-2 pl-2 bg-white mr-4 mb-1 text-customColor rounded-2xl w-80 h-10 mt-0 text-base font-thin outline-none  focus:ring-2 focus:ring-customcolorred"
              placeholder="Search here "
            />
            <div>
              <FaSearch className="absolute top-1/2 right-24 transform -translate-y-1/2 text-customcolorred size-5 mb-2" />
            </div>
          </div>
          <button
            ref={dropdown}
            onClick={handleOpenProfileMenu}
            className="rounded-full font-medium text-sm w-12 p-2 bg-customcolorred mr-7 "
          >
            {firstNameExtract.toUpperCase() + secondNameExtract.toUpperCase()}
            <ProfileDropDown
              clearLocalStorage={clearLocalStorage}
              isOpen={isOpenMenu}
              isClosedDropDown={() => handleOpenProfileMenu()}
            />
          </button>
        </div>
      </div>
    </>
  );
}
export default Header;
