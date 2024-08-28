import { useContext, useEffect } from "react";
import BlogContext from "../Store/StoreInput";

function ReplyDiscription({ sendId, sendBlogRepliesButtonStatus }) {
  const { blogs, user } = useContext(BlogContext);

  const getBlogDescription = blogs.find((blog) => blog.id === sendId);

  useEffect(() => {}, [getBlogDescription]);

  return (
    <>
      <div>
        {sendBlogRepliesButtonStatus &&
          getBlogDescription?.replies?.map((eachReply, index) => (
            <div
              key={index}
              className="border  xs:ml-3 mr-4 bg-customcolorwarmgray rounded-md mb-2 p-2"
            >
              <p className="p-1 font-medium line-clamp-5 text-ellipsis">
                {eachReply?.data}
              </p>

              <p className="flex justify-end text-customcolorred mr-2">
                {user.firstName + " " + user.lastName}
              </p>
              <p className="flex justify-end text-customColor mr-2">
                {eachReply?.createdDateAndTime}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
export default ReplyDiscription;
