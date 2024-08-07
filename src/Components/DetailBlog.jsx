import { useContext } from "react";
import { useLocation } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
function DetailBlog() {
  const { blogs } = useContext(BlogContext);

  const { state } = useLocation();
  const blogID = state.blogid;

  const findBlog = blogs.find((blog) => blog.blogID === blogID);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/3">
          <h1 className="p-4 font-medium text-4xl text-left text-customColors underline">
            {findBlog?.userTitle}
          </h1>
          <p className="p-4 font-medium text-2xl text-left ">
            <span className=" underline">Description:</span>{" "}
            {findBlog?.userinput}
          </p>
          <h1 className="pl-4 pt-3 pb-1 text-lg font-medium text-customcolorred underline">
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
