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
                className="border  xs:ml-3 mr-4 bg-customcolorwarmgray rounded-md mb-2 p-2"
              >
                <p className="p-1 font-medium line-clamp-5 text-ellipsis">
                  {eachReplyData?.repliedinput}
                </p>
                <p className="flex justify-end text-customcolorred mr-2">
                  {eachReplyData?.fullname}
                </p>
                <p className="flex justify-end text-customColor mr-2">
                  {eachReplyData?.created_at}
                </p>
              </div>
            ))
          )}
      </div>
    </>
  );
}
export default ReplyDiscription;
