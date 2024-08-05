import { useContext } from "react";
import BlogContext from "../Store/StoreInput";

function ReplyDiscription({ sendId, sendBlogRepliesButtonStatus }) {
  const { blogs } = useContext(BlogContext);
  console.log(sendId);
  console.log(sendBlogRepliesButtonStatus);

  const getBlogDescription = blogs.find((blog) => blog.id === sendId);

  return (
    <>
      <div>
        {sendBlogRepliesButtonStatus &&
          getBlogDescription?.replies.map((eachReply, index) => (
            <p
              className=" border border-black p-1 rounded-md m-4 ml-10 font-medium line-clamp-5 text-ellipsis"
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
