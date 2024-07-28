import { useContext, useState } from "react";
import BlogContext from "../Store/StoreInput";
import Replies from "./Replies";

function MainInput() {
  const { addBlog, blogs, editReply } = useContext(BlogContext);
  const [currentState, setCurrentState] = useState({
    inputTitle: "",
    inputValue: "",
  });

  const handleInput = (e) => {
    const inputText = e.target.value;
    setCurrentState((prevState) => ({
      ...prevState,
      inputValue: inputText,
    }));
  };
  const handleTitleInput = (e) => {
    const inputTextTitle = e.target.value;
    setCurrentState((prevState) => ({
      ...prevState,
      inputTitle: inputTextTitle,
    }));
  };
  const handleOnClickReply = (valuee) => {
    editReply(valuee);
  };

  const handlesendData = () => {
    addBlog({
      userTitle: currentState.inputTitle,
      userinput: currentState.inputValue,
    });
    currentState.inputTitle = "";
    currentState.inputValue = "";
  };

  return (
    <>
      <div className=" m-auto">
        <div>
          <p>
            <label className="font-bold text-lg text-gray-950 mt-4 ml-4">
              Title
            </label>
          </p>
          <input
            type="text"
            onChange={handleTitleInput}
            value={currentState.inputTitle}
            className="border w-60 border-black rounded-md h-10 mt-1 ml-4"
            placeholder="Enter Title"
          />
          <p>
            <label className="font-bold text-lg text-gray-950 mt-4 ml-4">
              Type Here
            </label>
          </p>
          <textarea
            type="text"
            onChange={handleInput}
            value={currentState.inputValue}
            className="border w-96 border-black rounded-md h-10 mt-1 ml-4"
            placeholder="please type here"
          />
          <div className="ml-80 mt-3">
            <button
              className="p-2 bg-rose-600 text-gray-50 rounded-md"
              onClick={handlesendData}
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <hr className="mt-2 mb-1 "></hr>
          <h1 className="ml-4 font-bold ">Conversations</h1>
          {blogs.map((blog) => (
            <div
              className="w-1/2 h-auto border ml-2 mb-2 mt-2 rounded-md    border-black"
              key={blog.id}
            >
              <p className="pl-4 font-medium ">{blog.userTitle}</p>
              <p className="pl-4 line-clamp-5 text-ellipsis ">
                {blog.userinput}
              </p>
              <p>
                <button
                  onClick={() => handleOnClickReply(true)}
                  className="font-sans text-xs text-sky-600 font-semibold ml-4"
                >
                  Reply
                </button>
              </p>
              <Replies />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default MainInput;
