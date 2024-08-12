import { useContext, useState } from "react";
import BlogContext from "../Store/StoreInput";
import UserInfo from "./UserInfo";
import MyBlogs from "./MyBlogs";
import MySavedBlogs from "./MySavedBlogs";

function Profile() {
  const { user } = useContext(BlogContext);
  const [showMyBlogs, setShowMyBlogs] = useState(true);
  const [showSavedBlogs, setShowSavedBlogs] = useState(false);

  const handleShowMyBlogs = () => {
    setShowMyBlogs(true);
    setShowSavedBlogs(false);
  };

  const handleShowSavedBlogs = () => {
    setShowMyBlogs(false);
    setShowSavedBlogs(true);
  };

  return (
    <>
      <div className="flex">
        <div className="w-2/3 pr-40 pl-40 pt-40  h-screen border-r-2">
          <h1 className="font-medium text-5xl mb-4">
            {user.firstName + " " + user.lastName}
          </h1>
          <div className="flex  ">
            <button onClick={handleShowMyBlogs}>
              {showMyBlogs ? (
                <span className=" p-2 ml-8- text-lg font-bold text-customColor">
                  My Blogs
                </span>
              ) : (
                <span className=" p-2 ml-8- text-lg text-customColor">
                  My Blogs
                </span>
              )}
            </button>
            <button onClick={handleShowSavedBlogs}>
              <p>
                {" "}
                {showSavedBlogs ? (
                  <span className=" p-2 ml-8- text-lg font-bold text-customColor">
                    Saved
                  </span>
                ) : (
                  <span className=" p-2 ml-8- text-lg text-customColor">
                    Saved
                  </span>
                )}
              </p>
            </button>
          </div>
          <hr></hr>
          {showMyBlogs && <MyBlogs />}
          {showSavedBlogs && <MySavedBlogs />}
        </div>
        <div>
          <UserInfo />
        </div>
      </div>
    </>
  );
}
export default Profile;
