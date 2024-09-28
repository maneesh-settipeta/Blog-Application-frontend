import { useContext, useEffect } from "react";
import BlogContext from "../Store/StoreInput";

function ReplyDiscription({ sendId, sendBlogRepliesButtonStatus }) {


  const { repliesData, blogs } = useContext(BlogContext);
  const getBlogDescription = blogs.find((blog) => blog.bloguuid === sendId);
  const replyData = repliesData.filter((reply) => reply.bloguuid === getBlogDescription.bloguuid);

  return (
    <>
      <div>
        {sendBlogRepliesButtonStatus &&
          replyData?.map((eachReply) =>
            eachReply?.replies?.map((eachReplyData, index2) => (
              <div key={index2}
                className=" border-2 border-gray-300 xs:ml-3 mr-4 rounded-md mb-2 p-2"
              >
                <div className="flex">
                <p className=" text-customcolorred mr-2 text-sm">
                  {eachReplyData?.fullname}
                </p>
                <p className=" text-customColor mr-2 text-sm">
                  {eachReplyData?.created_at.split(' ')[0]}
                </p>
                </div>
                <p className="p-1 font-medium text-gray-500 line-clamp-5 text-ellipsis">
                  {eachReplyData?.repliedinput}
                </p>
              </div>
            ))
          )}
      </div>
    </>
  );
}
export default ReplyDiscription;
