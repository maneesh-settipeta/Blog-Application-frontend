import { useContext } from "react";
import BlogContext from "../Store/StoreInput";
import UserInfo from "./UserInfo";

function Profile() {
  const { user } = useContext(BlogContext);

  return (
    <>
      <div className="flex">
        <div className="w-2/3 pr-40 pl-40 pt-40  h-screen border-r-2">
          <h1 className="font-medium text-5xl mb-4">
            {user.firstName + " " + user.lastName}
          </h1>
          <div className="flex  ">
            <p className=" p-2 text-lg text-customColor">My Blogs</p>
            <p className=" p-2 ml-8- text-lg text-customColor">Saved</p>
          </div>
          <hr></hr>
        </div>
        <div>
          <UserInfo />
        </div>
      </div>
    </>
  );
}
export default Profile;
