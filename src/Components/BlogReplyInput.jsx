import { useState, useContext } from "react";
import BlogContext from "../Store/StoreInput";
import axios from "axios";
import { baseURL } from "../URL";

function BlogReplyInput({ sendOnClick, replyOnClick, bloguuid }) {
  const { addReplies, user } = useContext(BlogContext);


  const [replyInputState, setReplyInputs] = useState({
    repliedinput: null,
    fullname: user.firstName + " " + user.lastName,
    bloguuid: bloguuid,
  });

  function handleInputReply(e) {
    const inputValue = e.target.value;
    setReplyInputs((prevstate) => ({
      ...prevstate,
      repliedinput: inputValue,
    }));
  }

  const handleOnClickCancel = (bloguuid) => {
    sendOnClick(bloguuid);
  };

  const handleSendRepliesData = async () => {
    const replyObject = {
      repliedinput: replyInputState.repliedinput || " ",
      fullname: replyInputState.fullname || " ",
      bloguuid: replyInputState.bloguuid,
    };
    let updatedReplyObject;
    try {
      const response = await axios.post(`${baseURL}/replies`, replyObject);
      updatedReplyObject = {
        repliedinput: replyInputState.repliedinput,
        fullname: replyInputState.fullname,
        bloguuid: replyInputState.bloguuid,
        created_at: response.data.created_at,
        replyuuid: response.data.replyuuid,
      }
    } catch (error) {
      console.error(error, "Error while creating from frontend");
    }


    addReplies(updatedReplyObject);
    setReplyInputs((prevState) => ({
      ...prevState,
      repliedinput: "",
    }));
    replyOnClick(updatedReplyObject);
  };

  return (
    <div className=" flex  xs:w-full mb-2 mt-2 w-full  justify-between">
      <div className="md:ml-1  flex-grow ">
        <textarea
          type="text"
          onChange={handleInputReply}
          value={replyInputState.repliedinput}
          className="border border-black rounded-md  h-10 xs:w-full   xs:ml-3 p-1 "
          placeholder="Reply here"
        />
      </div>
      <div className="md:mr-5 md:ml-4 xs:ml-3 xs:flex-row md:flex-col ">
        <button
          onClick={() => handleOnClickCancel(bloguuid)}
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
