import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
import BlogReplyInput from "./BlogReplyInput";
function DetailBlog({ id }) {
  const { blogs } = useContext(BlogContext);
  const [currentState, setCurrentState] = useState({
    showReplyButton: null,
    showReplies: false,
  });
  const { state } = useLocation();
  const findBlogiD = state.blogid;

  const findBlog = blogs.find((blog) => blog.id === findBlogiD);

  const handleShowReplyInputElement = (id) => {
    setCurrentState((prevState) => ({
      ...prevState,
      showReplyButton: id,
    }));
  };
  const handleReplyClick = () => {};

  const handleCancelButtonFun = (id) => {
    setCurrentState((prevState) => {
      if (prevState.showReplyButton === id) {
        return {
          ...prevState,
          showReplyButton: null,
        };
      }
      return prevState;
    });
  };
  const handleShowReplies = () => {
    setCurrentState((prevState) => ({
      ...prevState,
      showReplies: !currentState.showReplies,
    }));
  };
  const handleShowRepliesCount = () => {
    const blogFindLength = findBlog.replies.length;
    return blogFindLength;
  };
  return (
    <div className="flex justify-center">
      <div className="md:w-1/2 xs:w-full xs:mr-1 xs:p-2">
        <h1 className="p-4 font-medium text-4xl text-left text-customColors underline">
          {findBlog?.userTitle}
        </h1>
        <p className="flex  justify-end  text-customcolorred">
          {findBlog?.firstName + " " + findBlog?.lastName}
        </p>
        <p className="flex pt-1  justify-end   text-customColor">
          {findBlog?.dateCreated}
        </p>
        <p className="p-4 font-medium text-2xl text-left ">
          <span className=" underline">Description:</span> {findBlog?.userinput}
        </p>
        <button
          onClick={() => handleShowReplyInputElement}
          className="p-2 bg-customcolorred outline-none text-gray-50 text-lg ml-4 rounded-md mt-2"
        >
          {" "}
          Reply
        </button>
        {currentState.showReplyButton === findBlog?.id ? (
          <BlogReplyInput
            sendOnClick={handleCancelButtonFun}
            sendFirebaseId={findBlog?.id}
            id={findBlog.id}
            replyOnClick={handleReplyClick}
          />
        ) : null}
        <button
          onClick={handleShowReplies}
          className="pl-4 pt-3 pb-1 text-lg font-medium text-customcolorred underline"
        >
          Replies({handleShowRepliesCount(findBlog?.id)})
        </button>
        {findBlog?.replies &&
          currentState.showReplies &&
          findBlog?.replies.map((reply, index) => (
            <div key={index}>
              <p className="pl-4 text-sm border border-x-0 p-5">{reply.data}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
export default DetailBlog;
