import { useContext } from "react";
import BlogContext from "../Store/StoreInput";

function ReplyDiscription({
  sendId,
  sendBlogRepliesButtonStatus,
  sendFirebaseId,
}) {
  const { blogs } = useContext(BlogContext);

  const getBlogDescription = blogs.find((blog) => blog.blogID === sendId);

  return (
    <>
      <div>
        {sendBlogRepliesButtonStatus &&
          getBlogDescription?.replies.map((eachReply, index) => (
            <p
              className=" border  p-1 bg-slate-200 rounded-md m-4 ml-10 font-medium line-clamp-5 text-ellipsis"
              key={index}
            >
              {eachReply}
            </p>
          ))}
      </div>
    </>
  );
}
export default ReplyDiscription;
