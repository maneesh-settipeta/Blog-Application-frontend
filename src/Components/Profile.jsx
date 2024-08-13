import { useContext, useEffect, useState } from "react";
import BlogContext from "../Store/StoreInput";
import UserInfo from "./UserInfo";
import MyBlogs from "./MyBlogs";
import MySavedBlogs from "./MySavedBlogs";
import fetchUserDetails from "../fetchUserDetails";
import fetchBlogs from "../fetchBlogs";
// import fetchBlogs from "../fetchBlogs";

function Profile() {
  const { user, setUser, addBlog } = useContext(BlogContext);

  const fetchUserAndBlogsData = async () => {
    const userData = await fetchUserDetails();
    const blogsData = await fetchBlogs();
    console.log(userData, "Fetching Data");
    setUser(userData);
    addBlog(blogsData);
  };

  useEffect(() => {
    fetchUserAndBlogsData();
  }, []);

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
          <div className="flex  justify-between ">
            <button onClick={handleShowMyBlogs}>
              {showMyBlogs ? (
                <span className=" p-2 ml-8- text-xl font-bold text-customColor">
                  My Blogs
                </span>
              ) : (
                <span className=" p-2 ml-8- text-xl text-customColor">
                  My Blogs
                </span>
              )}
            </button>
            <button onClick={handleShowSavedBlogs}>
              <p>
                {" "}
                {showSavedBlogs ? (
                  <span className=" p-2 ml-8- text-xl font-bold text-customColor">
                    Saved
                  </span>
                ) : (
                  <span className=" p-2 ml-8- text-xl text-customColor">
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
