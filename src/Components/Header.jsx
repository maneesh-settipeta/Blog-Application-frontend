import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
import ProfileDropDown from "./ProfileDropDown";
import { FaSearch } from "react-icons/fa";

function Header() {
  const { user, clearLocalStorage, handleSearchQuery } =
    useContext(BlogContext);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  console.log(isUserLoggedIn);

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [searchQuery, setSearchingQuery] = useState("");
  const dropdown = useRef();
  const handleOpenProfileMenu = () => {
    setOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    const fetchDataFromFirebase = () => {
      const getFirstName = localStorage.getItem("firstName");
      const getLastName = localStorage.getItem("lastName");
      if (getFirstName === "undefined" && getLastName === "undefined") {
        setUserLoggedIn(true);
      }
    };
    fetchDataFromFirebase();
  }, []);

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
    <div className="text-3xl xs:p-2  lg:p-2  font-medium border-b border-black mb-1 flex justify-between ">
      <div>
        <Link to="/blogs">
          <h1 className="font-sans xs:text-md text-white  "> Blogs</h1>
        </Link>
      </div>
      <div className="flex flex-row">
        <div>
          <input
            value={searchQuery}
            onChange={(e) =>
              handleSendSearchQuery(e.target.value.toLowerCase())
            }
            className=" bg-white md:mr-4 xs:mr-2  xs:pl-1 md:mb-1 xs:mb-0  text-customColor rounded-2xl md:h-10 md:p-2 md:w-80 xs:w-44 xs:p-2 h-10 xs:h-9 text-base font-thin outline-none  focus:ring-2 focus:ring-customcolorred"
            placeholder="Search here "
          />
          <div>
            <FaSearch className="absolute top-1/2 md:right-24 transform xs:size-4  xs:right-16 -translate-y-1/2 text-customcolorred md:size-5 md:mb-2" />
          </div>
        </div>
        {isUserLoggedIn ? (
          <Link to="/Login">
            <button className="text-base h-10 p-2 mt-1 bg-customcolorred text-white rounded">
              Login
            </button>
          </Link>
        ) : (
          <button
            ref={dropdown}
            onClick={handleOpenProfileMenu}
            className="rounded-full font-medium text-sm md:w-12 md:p-2 xs:w-10 xs:mt-0  text-white bg-customcolorred md:mr-3  "
          >
            {firstNameExtract.toUpperCase() + secondNameExtract.toUpperCase()}
            <ProfileDropDown
              clearLocalStorage={clearLocalStorage}
              isOpen={isOpenMenu}
              isClosedDropDown={() => handleOpenProfileMenu()}
            />
          </button>
        )}
      </div>
    </div>
  );
}
export default Header;
