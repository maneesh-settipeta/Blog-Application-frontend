import { Link } from "react-router-dom";
import React from "react";

function ProfileDropDown({ isOpen, clearLocalStorage, isClosedDropDown }) {

  function handleHideDropDown() {
    isClosedDropDown();
  }


  return (
    <>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-4 w-40   rounded-md shadow-lg bg-white  focus:outline-none">
          <div className="flex-col text-left">
            <Link to="bookmarks">
              <p className="block px-4 py-2 text-lg w-40 text-customColor hover:bg-gray-100">
                Bookmarks
              </p>
            </Link>
            <Link to="profile">
              <p
                onClick={handleHideDropDown}
                className="block px-4 py-2 text-lg  w-40 text-customColor hover:bg-gray-100"
              >
                Profile
              </p>
            </Link>
            <p className="block px-4 py-2 text-lg  w-40 text-customColor hover:bg-gray-100">
              Settings
            </p>
            <Link
              onClick={() => {
                clearLocalStorage();
              }}
              to="/Login"
            >
              <p className="block px-4 py-2 text-lg  w-40 text-customColor hover:bg-gray-100">
                Sign out
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
export default ProfileDropDown;
