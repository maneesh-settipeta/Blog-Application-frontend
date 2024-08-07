import { useState, useContext } from "react";
import BlogContext from "../Store/StoreInput";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
function BlogReplyInput({ id, sendOnClick, replyOnClick, sendFirebaseId }) {
  const [replyInputs, setReplyInputs] = useState([]);
  const { addReplies } = useContext(BlogContext);
  console.log(id);
  const dateCreatedReplies = new Date().toLocaleString;

  function handleInputReply(e) {
    setReplyInputs(e.target.value);
  }
  const handleOnClickCancel = () => {
    sendOnClick(id);
  };

  const handleSendRepliesData = async () => {
    console.log(id);

    const blogDocRef = doc(db, "blogs", sendFirebaseId);

    await updateDoc(blogDocRef, {
      replies: arrayUnion(replyInputs),
    });
    addReplies({ blogRepliess: replyInputs, id: id });
    setReplyInputs("");
    replyOnClick;
  };

  return (
    <>
      <div className=" flex  md:flex-row mb-2  w-full  justify-between ">
        <div className="ml-6 flex-grow ">
          <textarea
            type="text"
            onChange={handleInputReply}
            value={replyInputs}
            className="border border-black rounded-md  h-10 w-full  ml-4 "
            placeholder="Reply here"
          />
        </div>
        <div className="mr-5 ml-4">
          <button
            onClick={() => handleOnClickCancel(id)}
            className="p-2 ml-2  bg-gray-300 text-gray-950 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSendRepliesData}
            className="p-2 ml-2  bg-customcolorred text-gray-50 rounded-md"
          >
            Reply
          </button>
        </div>
      </div>
    </>
  );
}
export default BlogReplyInput;
