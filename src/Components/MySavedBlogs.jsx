import { useContext } from "react";
import BlogContext from "../Store/StoreInput";

function MySavedBlogs() {
  const { user } = useContext(BlogContext);
  console.log(user, "savedBlogs");

  return (
    <>
      {user?.savedBlogs?.map((eachMySavedBlog, index) => {
        return (
          <div
            key={index}
            className="w-full h-auto border  mb-2 mt-3 rounded-md  border-black  p-4 "
          >
            <h1>
              <span className="font-medium text-lg text-customcolorred">
                User Title:{" "}
              </span>
              {eachMySavedBlog?.userTitle}
            </h1>
            <p>
              {" "}
              <span className="font-medium text-lg text-customcolorred">
                User Input:{" "}
              </span>
              {eachMySavedBlog?.userinput}
            </p>
          </div>
        );
      })}
    </>
  );
}
export default MySavedBlogs;
