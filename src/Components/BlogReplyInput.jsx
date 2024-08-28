import { useState, useContext } from "react";
import BlogContext from "../Store/StoreInput";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

function BlogReplyInput({ id, sendOnClick, replyOnClick, sendFirebaseId }) {
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

  const handleOnClickCancel = (id) => {
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

    await updateDoc(fireBaseBlogRef, {
      replies: arrayUnion(newObjectReply),
    });
    addReplies(newObjectReply);

    setReplyInputs((prevState) => ({
      ...prevState,
      data: "",
    }));
    replyOnClick();
  };

  return (
    <div className=" flex  xs:w-full mb-2 mt-2 w-full  justify-between">
      <div className="md:ml-1  flex-grow ">
        <textarea
          type="text"
          onChange={handleInputReply}
          value={replyInputState.data}
          className="border border-black rounded-md  h-10 xs:w-full   xs:ml-3 p-1 "
          placeholder="Reply here"
        />
      </div>
      <div className="md:mr-5 md:ml-4 xs:ml-3 xs:flex-row md:flex-col ">
        <button
          onClick={() => handleOnClickCancel(id)}
          className="p-2 ml-2  bg-gray-300 text-gray-950 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSendRepliesData}
          className="p-2 ml-2 hover:bg-customcolorredHover bg-customcolorred text-gray-50 rounded-md"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
export default BlogReplyInput;
