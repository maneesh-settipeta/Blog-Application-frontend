import { useState, useContext } from "react";
import BlogContext from "../Store/StoreInput";
function Replies({ id }) {
  const [replyInputs, setReplyInputs] = useState([]);
  const { replyClick, editReply, addReplies, blogs } = useContext(BlogContext);
  console.log(blogs);
  function handleInputReply(e) {
    setReplyInputs(e.target.value);
  }
  const handleOnClickReply = (valuee) => {
    editReply(valuee);
  };

  const handleSendRepliesData = () => {
    addReplies({ blogRepliess: replyInputs, blogID: id });
    setReplyInputs("");
  };
  return (
    <>
      <div>
        {replyClick ? (
          <div className=" flex mb-2">
            <textarea
              type="text"
              onChange={handleInputReply}
              value={replyInputs}
              className="border border-black rounded-md   h-10 w-2/3 ml-4"
              placeholder="Reply here"
            />
            <button
              onClick={() => handleOnClickReply(false)}
              className="p-2 ml-2  bg-gray-300 text-gray-950 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSendRepliesData}
              className="p-2 ml-2  bg-rose-600 text-gray-50 rounded-md"
            >
              Reply
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default Replies;
