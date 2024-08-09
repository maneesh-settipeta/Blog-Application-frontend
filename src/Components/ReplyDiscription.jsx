import { useContext, useEffect } from "react";
import BlogContext from "../Store/StoreInput";

function ReplyDiscription({
  sendId,
  sendBlogRepliesButtonStatus,
  sendFirebaseId,
}) {
  const { blogs } = useContext(BlogContext);

  const getBlogDescription = blogs.find((blog) => blog.blogID === sendId);
  console.log(getBlogDescription.data);

  useEffect(() => {}, [getBlogDescription]);
  console.log(getBlogDescription.data);
  return (
    <>
      <div>
        {sendBlogRepliesButtonStatus &&
          getBlogDescription?.replies.map((eachReply, index) => (
            <div
              key={index}
              className="border ml-10 mr-4 bg-slate-200 rounded-md mb-2 p-2"
            >
              <p className="p-1 font-medium line-clamp-5 text-ellipsis">
                {eachReply.data}
              </p>

              <p className="flex justify-end text-customcolorred mr-2">
                {eachReply?.fullName}
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
