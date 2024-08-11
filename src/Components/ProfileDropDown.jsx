import { Link } from "react-router-dom";

function ProfileDropDown({ isOpen, clearLocalStorage }) {
  return (
    <>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-16 w-40 flex  rounded-md shadow-lg bg-white  focus:outline-none">
          <div>
            <p className="block px-4 py-2 text-lg w-40 text-customColor hover:bg-gray-100">
              Bookmarks
            </p>
            <Link to="profile">
              <p className="block px-4 py-2 text-lg  w-40 text-customColor hover:bg-gray-100">
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
