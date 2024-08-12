import BlogContext from "../Store/StoreInput";
import { useContext, useEffect } from "react";
function UserInfo() {
  const { user } = useContext(BlogContext);

  useEffect(() => {}, [
    user.firstName,
    user.lastName,
    user.email,
    user.following,
  ]);

  const firstNameFirstCharExtract = user.firstName[0];
  const firstNameLastCharExtract = user.lastName[0];
  return (
    <>
      <div className=" flex-col justify-center h-screen pr-40 pl-40 pt-32">
        <div>
          <h1 className=" text-3xl w-16 p-2 rounded-full bg-customcolorred mr-4 ml-4 text-white">
            {firstNameFirstCharExtract + firstNameLastCharExtract}
          </h1>
          <h1 className="text-lg font-medium mr-4 mt-4 mb-4">
            {user.firstName + " " + user.lastName}
          </h1>
          <p className="text-cyan-600 mb-4">{user.email}</p>
          <h1 className="text-customcolorred font-medium underline  text-lg">
            Following :
          </h1>
          {user.following.map((eachUserData, index) => (
            <div key={index}>
              <li className="text-customColor font-medium text-base">
                {" "}
                {eachUserData.firstName + " " + eachUserData.lastName}
              </li>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default UserInfo;
