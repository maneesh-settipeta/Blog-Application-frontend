import { useContext } from "react";
import BlogContext from "../Store/StoreInput";

function MySavedBlogs() {
  const { user , blogs , savedBlogsData, savedBlogUuids} = useContext(BlogContext);


  const filterBlogsFromUuids = blogs.filter((eachBlog)=>
    savedBlogUuids.includes(eachBlog.bloguuid)
  );
 

  return (
    <>
      {filterBlogsFromUuids.map((eachMySavedBlog, index) => {
        return (
          <div
            key={index}
            className="w-full h-auto border  mb-2 mt-3 rounded-md  border-black  p-4 "
          >
            <h1 className="text-lg font-bold font-mono">
            
              {eachMySavedBlog?.usertitle}
            </h1>
            <p className=" text-sm font-medium text-gray-600">
            
              {eachMySavedBlog?.userinput}
            </p>
          </div>
        );
      })}
    </>
  );
}
export default MySavedBlogs;
