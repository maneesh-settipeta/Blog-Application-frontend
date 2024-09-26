import { useContext } from "react";
import BlogContext from "../Store/StoreInput";

function MySavedBlogs() {
  const { user , blogs , savedBlogsData, savedBlogUuids} = useContext(BlogContext);

  console.log(blogs);
  console.log(savedBlogUuids);
  
  const filterBlogsFromUuids = blogs.filter((eachBlog)=>
    savedBlogUuids.includes(eachBlog.bloguuid)
  );
  console.log(filterBlogsFromUuids);
  

  return (
    <>
      {filterBlogsFromUuids.map((eachMySavedBlog, index) => {
        return (
          <div
            key={index}
            className="w-full h-auto border  mb-2 mt-3 rounded-md  border-black  p-4 "
          >
            <h1>
              <span className="font-medium text-lg text-customcolorred">
                User Title:{" "}
              </span>
              {eachMySavedBlog?.usertitle}
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
