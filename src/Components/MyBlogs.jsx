import BlogContext from "../Store/StoreInput";
import { useContext, useEffect, useState } from "react";


function MyBlogs() {
  const { user , blogs } = useContext(BlogContext);

 
  
  // const [MyblogsData, setBlogsData] = useState([]);

  // function fetchBlogsData() {
  //   setBlogsData();
  // }

  // useEffect(() => {
  //   fetchBlogsData();
  // }, []);

  const findMyBlogs = blogs.filter((blog) => blog.useruuid === user.userUuid);

  

  return (
    <>
      <div>
        {findMyBlogs &&
          findMyBlogs.map((blog, index) => {
            return (
              <div
                key={index}
                className="w-full h-auto border  mb-2 mt-3 rounded-md  border-black  p-4 "
              >
                <h1 className="text-lg font-bold font-mono">
              
                  {blog?.usertitle}
                </h1>
                <p className=" text-sm font-medium text-gray-600">
                  {" "}
                
                  {blog?.userinput}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default MyBlogs;
