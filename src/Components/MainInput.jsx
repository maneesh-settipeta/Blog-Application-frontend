import { useContext, useState } from "react";
import BlogContext from "../Store/StoreInput";
import BlogReplyInput from "./BlogReplyInput";
import ReplyDiscription from "./ReplyDiscription";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

function MainInput() {
  const currentDate = new Date().toLocaleString();
  const { addBlog, blogs } = useContext(BlogContext);

  const [currentState, setCurrentState] = useState({
    inputTitle: "",
    inputValue: "",
    showInputField: null,
    blogReplies: null,
    showReplies: false,
    uniqueID: 0,
    toggleInput: false,
    sendBlogRepliesButtonStatus: false,
  });

  const [userDetails, setUserDetails] = useState(null);

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docref = doc(db, "users", user.uid);
      const docData = await getDoc(docref);
      if (docData.exists()) {
        setUserDetails(docData.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
  const handleToggleInputs = () => {
    setCurrentState((prevState) => ({
      ...prevState,
      toggleInput: !prevState.toggleInput,
    }));
  };

  const handlesendData = async () => {
    const newID = currentState.uniqueID + 1;
    const newBlogDetails = {
      userTitle: currentState.inputTitle,
      userinput: currentState.inputValue,
      dateCreated: currentDate,
      id: newID,
    };
    const docRef = await addDoc(collection(db, "blogs"), newBlogDetails);
    const newBlog = { ...newBlogDetails, id: docRef.id };
    addBlog(newBlog);
    currentState.inputTitle = "";
    currentState.inputValue = "";
    setCurrentState({
      inputTitle: "",
      inputValue: "",
      uniqueID: newID,
    });
  };
  const handleShowInput = (id) => {
    setCurrentState((prevState) => ({
      ...prevState,
      showInputField: id,
    }));
  };
  const handleCancelButton = (id) => {
    setCurrentState((prevState) => {
      if (prevState.showInputField === id) {
        return {
          ...prevState,
          showInputField: null,
        };
      }
      return prevState;
    });
  };
  const handleShowReplies = (id) => {
    setCurrentState((prevState) => ({
      ...prevState,
      blogReplies: id,
      sendBlogRepliesButtonStatus: !prevState.sendBlogRepliesButtonStatus,
    }));
  };

  const handleReplyClick = () => {
    setCurrentState((prevState) => ({
      ...prevState,
      showReplies: !prevState.showReplies,
    }));
  };
  return (
    <>
      <button
        className="flex underline mb-2  font-serif text-3xl  text-start ml-6"
        onClick={handleToggleInputs}
      >
        Post Blog
      </button>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 px-4">
          {currentState.toggleInput ? (
            <div>
              <p className="font-serif text-2xl text-gray-950 mt-5   ">Title</p>

              <input
                type="text"
                onChange={handleTitleInput}
                value={currentState.inputTitle}
                className="border w-full  border-black rounded-md h-10 mt-1  p-2  focus:outline-none"
                placeholder="Enter Title"
              />

              <p className="font-serif text-2xl  text-gray-950 mt-6">
                Type Here
              </p>

              <textarea
                type="text"
                onChange={handleInput}
                value={currentState.inputValue}
                className="border w-full border-black rounded-md h-40 p-2 mt-1 "
                placeholder="please type here"
              />
              <div className="flex justify-center mt-3">
                <button
                  className="p-2 bg-customcolorred text-gray-50 rounded-md"
                  onClick={handlesendData}
                >
                  Submit
                </button>
              </div>
              <hr className="mt-2 mb-4 "></hr>
            </div>
          ) : null}
          <div className="flex-col justify-center mt-10 ">
            <h1 className=" text-4xl mb-6 font-bold ">Conversations</h1>
            {blogs &&
              blogs?.map((blog) => {
                return (
                  <div
                    className="w-full h-auto border  mb-2 mt-2 rounded-md  border-black  p-4"
                    key={blog.id}
                  >
                    <Link to={`:blogid=${blog.id}`} state={{ blogid: blog.id }}>
                      <h1 className="pl-4 font-serif text-3xl p-2 ">
                        {blog.userTitle}
                      </h1>
                      <p className="pl-4 line-clamp-5 text-ellipsis ">
                        {blog.userinput}
                      </p>
                    </Link>
                    <div className="flex flex-col">
                      <p>
                        <button
                          className="font-sans text-lg  text-white bg-customcolorred p-2 rounded-md ml-4 mb-1 mt-4 font-semibold "
                          onClick={() => handleShowInput(blog.id)}
                        >
                          {" "}
                          Reply
                        </button>
                      </p>
                      <p>
                        <button
                          className="font-sans text-lg  text-black p-1 rounded-md ml-3 mb-2 underline mt-1 font-semibold "
                          onClick={() => handleShowReplies(blog.id)}
                        >
                          {" "}
                          Replies
                        </button>
                      </p>
                    </div>
                    {currentState.sendBlogRepliesButtonStatus &&
                      currentState.blogReplies === blog.id && (
                        <ReplyDiscription
                          sendId={blog.id}
                          sendBlogRepliesButtonStatus={
                            currentState.sendBlogRepliesButtonStatus
                          }
                        />
                      )}

                    {currentState.showInputField === blog.id && (
                      <BlogReplyInput
                        id={blog.id}
                        sendOnClick={handleCancelButton}
                        replyOnClick={handleReplyClick}
                      />
                    )}
                    <p className="flex justify-end p-2 text-lg ">
                      {userDetails?.firstName + " " + userDetails?.lastName}
                    </p>
                    <p className="flex justify-end p-2 text-base">
                      Created on: {blog.dateCreated}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainInput;
