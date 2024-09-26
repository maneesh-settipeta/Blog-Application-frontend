import BlogContext from "../Store/StoreInput";
import { useContext, useEffect, useState } from "react";


function MyBlogs() {
  const { user , blogs } = useContext(BlogContext);

  console.log(blogs);
  
  // const [MyblogsData, setBlogsData] = useState([]);

  // function fetchBlogsData() {
  //   setBlogsData();
  // }

  // useEffect(() => {
  //   fetchBlogsData();
  // }, []);

  const findMyBlogs = blogs.filter((blog) => blog.useruuid === user.userUuid);
  console.log(findMyBlogs);
  

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
                <h1>
                  <span className="font-medium text-lg text-customcolorred">
                    User Title:{" "}
                  </span>
                  {blog?.usertitle}
                </h1>
                <p>
                  {" "}
                  <span className="font-medium text-lg text-customcolorred">
                    User Input:{" "}
                  </span>
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
