import { useContext } from "react";
import { useLocation } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
function DetailBlog() {
  const { blogs } = useContext(BlogContext);

  const { state } = useLocation();
  const blogID = state.blogid;
  console.log(state.blogid);

  const findBlog = blogs.find((blog) => blog.id === blogID);
  console.log(findBlog);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/3">
          <h1 className="p-4 font-medium text-5xl text-left">
            {findBlog?.userTitle}
          </h1>
          <p className="p-4 font-medium text-2xl text-left ">
            Description: {findBlog?.userinput}
          </p>
          <h1 className="pl-4 pt-3 pb-1 text-lg font-medium text-red-600 underline">
            Replies:
          </h1>
          {findBlog.replies &&
            findBlog?.replies.map((reply, index) => (
              <div key={index}>
                <p className="pl-4 text-sm border border-x-0 p-5">{reply}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default DetailBlog;
