import BlogContext from "../Store/StoreInput";
import { useContext, useEffect, useState } from "react";
import fetchBlogs from "../fetchBlogs";

function MyBlogs() {
  const { user } = useContext(BlogContext);
  const [blogsData, setBlogsData] = useState([]);

  async function fetchBlogsData() {
    const blogsData = await fetchBlogs();
    setBlogsData(blogsData);
  }

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const findMyBlogs = blogsData.filter((blog) => blog.userID === user.id);

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
                  {blog?.userTitle}
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
