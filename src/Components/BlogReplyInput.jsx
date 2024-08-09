import { useState, useContext } from "react";
import BlogContext from "../Store/StoreInput";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

function BlogReplyInput({ BlogId, sendOnClick, replyOnClick, sendFirebaseId }) {
  const presentDataAndTime = new Date().toLocaleString();
  const { addReplies, currentUserFirstName, currentUserLastName } =
    useContext(BlogContext);

  const [replyInputState, setReplyInputs] = useState({
    data: null,
    fullName: currentUserFirstName + " " + currentUserLastName,
    createdDateAndTime: presentDataAndTime,
    id: sendFirebaseId,
  });

  function handleInputReply(e) {
    const inputValue = e.target.value;
    setReplyInputs((prevstate) => ({
      ...prevstate,
      data: inputValue,
    }));
  }

  const handleOnClickCancel = () => {
    sendOnClick(id);
  };

  const handleSendRepliesData = async () => {
    const fireBaseBlogRef = doc(db, "blogs", sendFirebaseId);
    const newObjectReply = {
      data: replyInputState.data || " ",
      fullName: replyInputState.fullName || " ",
      createdDateAndTime: replyInputState.createdDateAndTime,
      id: replyInputState.id,
    };
    console.log(newObjectReply);

    await updateDoc(fireBaseBlogRef, {
      replies: arrayUnion(newObjectReply),
    });
    addReplies(newObjectReply);
    console.log(newObjectReply);

    console.log(newObjectReply);
    setReplyInputs((prevState) => ({
      ...prevState,
      data: "",
    }));
    replyOnClick();
  };

  return (
    <>
      <div className=" flex  md:flex-row mb-2  w-full  justify-between">
        <div className="ml-6 flex-grow ">
          <textarea
            type="text"
            onChange={handleInputReply}
            value={replyInputState.data}
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
