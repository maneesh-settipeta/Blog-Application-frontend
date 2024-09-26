import { useContext, useEffect, useState } from "react";
import BlogContext from "../Store/StoreInput";
import UserInfo from "./UserInfo";
import MyBlogs from "./MyBlogs";
import MySavedBlogs from "./MySavedBlogs";
import axios from "axios";


function Profile() {
 const {user}= useContext(BlogContext)

  useEffect(()=>{
    const userData = axios.post('http://localhost:3000/getUserDetails',{useruuid:user.userUuid});
  },[]);

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
    <div className="flex md:flex-row lg:flex-row xs:flex-col">
      <div>
        <UserInfo />
      </div>

      <div className="md:w-2/3  md:pr-40 md:pl-40  xs:pt-8 md:pt-40  h-screen border-l-2  xs:p-2 ">
        <h1 className="font-medium md:text-5xl xs:text-lg mb-4">
          {user.firstName + " " + user.lastName}
        </h1>
        <div className="flex  justify-between mb-4 ">
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
    </div>
  );
}
export default Profile;
