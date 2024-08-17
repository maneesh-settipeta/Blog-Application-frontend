import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
import BlogReplyInput from "./BlogReplyInput";
function DetailBlog({ id }) {
  const { blogs } = useContext(BlogContext);
  const [currentState, setCurrentState] = useState({
    showReplyElement: null,
  });
  const { state } = useLocation();
  const findBlogiD = state.blogid;

  const findBlog = blogs.find((blog) => blog.id === findBlogiD);

  const handleShowReplyInputElement = (id) => {
    setCurrentState((prevState) => ({
      ...prevState,
      showReplyElement: id,
    }));
  };
  const handleReplyClick = () => {};

  const handleCancelButtonFun = (id) => {
    console.log(id, "ID in this");

    setCurrentState((prevState) => {
      if (prevState.showReplyElement === id) {
        return {
          ...prevState,
          showReplyElement: null,
        };
      }
      return prevState;
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/3">
          <h1 className="p-4 font-medium text-4xl text-left text-customColors underline">
            {findBlog?.userTitle}
          </h1>
          <p className="flex   justify-end  text-customcolorred">
            {findBlog?.firstName + " " + findBlog?.lastName}
          </p>
          <p className="flex pt-1  justify-end  text-customColor">
            {findBlog?.dateCreated}
          </p>
          <p className="p-4 font-medium text-2xl text-left ">
            <span className=" underline">Description:</span>{" "}
            {findBlog?.userinput}
          </p>
          <button
            onClick={() => handleShowReplyInputElement(findBlog?.id)}
            className="p-2 bg-customcolorred outline-none text-gray-50 text-lg ml-4 rounded-md mt-2"
          >
            {" "}
            Reply
          </button>
          {currentState.showReplyElement === findBlog?.id ? (
            <BlogReplyInput
              sendOnClick={handleCancelButtonFun}
              sendFirebaseId={findBlog?.id}
              id={findBlog.id}
              replyOnClick={handleReplyClick}
            />
          ) : null}
          <h1 className="pl-4 pt-3 pb-1 text-lg font-medium text-customcolorred underline">
            Replies:
          </h1>
          {findBlog?.replies &&
            findBlog?.replies.map((reply, index) => (
              <div key={index}>
                <p className="pl-4 text-sm border border-x-0 p-5">
                  {reply.data}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default DetailBlog;
