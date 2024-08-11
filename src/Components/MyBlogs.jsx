import BlogContext from "../Store/StoreInput";
import { useContext } from "react";
function MyBlogs() {
  const { blogs, user } = useContext(BlogContext);

  const findMyBlogs = blogs.filter((blog) => blog.userID === user.id);
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
