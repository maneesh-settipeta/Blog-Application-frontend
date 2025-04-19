import axios from "axios";
import BlogContext from "../Store/StoreInput";
import { useContext, useEffect, useState } from "react";
import React from "react";

function UserInfo() {
  const { user } = useContext(BlogContext);


  const [followingUserDetails, setfollowingUserDetails] = useState([])

  useEffect(() => {
    const getFollowingData = async () => {
      const response = await axios.post(`${import.meta.env.VITE_baseURL}getFollowers`, { useruuid: user.userUuid })
      const followingDetails = response.data.blogs
      followingDetails.forEach((eachFollowing) => {
        setfollowingUserDetails([...followingUserDetails, eachFollowing])
      })
    }
    getFollowingData();
  }, [])

  const firstNameFirstCharExtract = user?.firstName[0];
  const firstNameLastCharExtract = user?.lastName[0];
  return (
    <div className=" flex-col justify-center h-screen  xs:pt-4 pl-10 md:pr-40 md:pl-40 lg:pt-32">
      <div>
        <h1 className=" text-lg w-14 h-14   p-4 rounded-full bg-customcolorred  text-white">
          {firstNameFirstCharExtract + firstNameLastCharExtract}
        </h1>
        <h1 className="text-lg font-medium mr-4 mt-4 mb-4">
          {user.firstName + " " + user.lastName}
        </h1>
        <p className="text-cyan-600 mb-4">{user.email}</p>
        <h1 className="text-customcolorred font-medium   text-lg">
          Following
        </h1>
        {followingUserDetails.map((eachUserData, index) => (
          <div key={index}>
            <li className="text-customColor font-medium text-base">
              {" "}
              {eachUserData.firstname + " " + eachUserData.lastname}
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UserInfo;
