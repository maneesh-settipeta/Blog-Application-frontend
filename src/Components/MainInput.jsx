import { useContext, useState, useEffect } from "react";
import BlogContext from "../Store/StoreInput";
import BlogReplyInput from "./BlogReplyInput";
import ReplyDiscription from "./ReplyDiscription";
import { Link } from "react-router-dom";
import fetchBlogs from "../fetchBlogs";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import Shimmer from "./Shimmer";

function MainInput() {
  const currentDate = new Date().toLocaleString();
  const {
    bulkBlog,
    addBlog,
    blogs,
    currentUserFirstName,
    currentUserLastName,
  } = useContext(BlogContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      const responseData = await fetchBlogs();
      bulkBlog(responseData);
      setLoading(false);
    };
    getBlogs();
  }, []);

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
      blogID: currentUserFirstName + newID + currentDate,
      replies: [],
      firstName: currentUserFirstName,
      lastName: currentUserLastName,
    };
    const docRef = await addDoc(collection(db, "blogs"), newBlogDetails);
    const newBlog = { ...newBlogDetails, id: docRef.id };
    await updateDoc(doc(db, "blogs", docRef.id), newBlog);
    addBlog(newBlog);
    currentState.inputTitle = "";
    currentState.inputValue = "";
    currentState.uniqueID = newID;
  };
  const handleShowInput = (id) => {
    setCurrentState((prevState) => ({
      ...prevState,
      showInputField: id,
    }));
  };
  const handleCancelButton = (blogID) => {
    setCurrentState((prevState) => {
      if (prevState.showInputField === blogID) {
        return {
          ...prevState,
          showInputField: null,
        };
      }
      return prevState;
    });
  };
  const handleShowReplies = (blogID) => {
    setCurrentState((prevState) => ({
      ...prevState,
      blogReplies: blogID,
      sendBlogRepliesButtonStatus: !prevState.sendBlogRepliesButtonStatus,
    }));
  };

  const handleReplyClick = () => {
    setCurrentState((prevState) => ({
      ...prevState,
      showReplies: !prevState.showReplies,
    }));
  };
  function handleShowRepliesLength(blogID) {
    const findBlogForReplyLength = blogs.find((blog) => blog.blogID === blogID);
    const lengthOfReplies = findBlogForReplyLength.replies.length;
    return lengthOfReplies;
  }

  if (loading) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 px-4 ">
          <button
            className="flex underline mb-2 text-customColor font-serif text-3xl  text-start "
            onClick={handleToggleInputs}
          >
            {currentState.toggleInput ? "Write a post" : "Post Blog+"}
          </button>
          {currentState.toggleInput ? (
            <div>
              <p className="font-serif text-2xl text-gray-950 mt-5   ">Title</p>

              <input
                type="text"
                onChange={handleTitleInput}
                value={currentState.inputTitle}
                className="border w-full  border-black rounded-md outline-none h-10 mt-1  p-2  focus:outline-none"
                placeholder="Enter Title"
              />

              <p className="font-serif text-2xl  text-gray-950 mt-6">
                Type Here
              </p>

              <textarea
                type="text"
                onChange={handleInput}
                value={currentState.inputValue}
                className="border w-full border-black rounded-md  outline-none h-40 p-2 mt-1 "
                placeholder="please type here"
              />
              <div className="flex justify-center mt-3">
                <button
                  className="p-2 bg-customcolorred outline-none text-gray-50 rounded-md"
                  onClick={handlesendData}
                >
                  Submit
                </button>
              </div>
              <hr className="mt-2 mb-4 "></hr>
            </div>
          ) : null}
          <div className="flex-col justify-center mt-10 ">
            <h1 className=" text-4xl text-customColor  mb-6 font-bold ">
              Conversations
            </h1>
            {blogs &&
              blogs.map((blog) => {
                return (
                  <div
                    className="w-full h-auto border  mb-2 mt-2 rounded-md  border-black  p-4"
                    key={blog?.blogID + blog?.firstName + blog?.dateCreated}
                  >
                    <Link to={`/blogs/${blog.id}`} state={{ blogid: blog.id }}>
                      <h1 className="pl-4 font-serif text-3xl p-2 ">
                        {blog?.userTitle}
                      </h1>
                      <p className="pl-4 line-clamp-5 text-ellipsis ">
                        {blog?.userinput}
                      </p>
                    </Link>
                    <div className="flex flex-col">
                      <p>
                        <button
                          className="font-sans text-lg  text-white bg-customcolorred p-2 rounded-md ml-4 mb-1 mt-4 font-semibold "
                          onClick={() => handleShowInput(blog?.blogID)}
                        >
                          {" "}
                          Reply
                        </button>
                      </p>
                      <p>
                        <button
                          className="font-sans text-lg  text-black p-1  underline rounded-md ml-3 mb-2  mt-1 font-semibold "
                          onClick={() => handleShowReplies(blog?.blogID)}
                        >
                          Replies({handleShowRepliesLength(blog.blogID)})
                        </button>
                      </p>
                    </div>
                    {currentState.sendBlogRepliesButtonStatus &&
                      currentState.blogReplies === blog.blogID && (
                        <ReplyDiscription
                          sendId={blog.blogID}
                          sendBlogRepliesButtonStatus={
                            currentState.sendBlogRepliesButtonStatus
                          }
                        />
                      )}

                    {currentState.showInputField === blog.blogID && (
                      <BlogReplyInput
                        id={blog.blogID}
                        sendFirebaseId={blog.id}
                        sendOnClick={handleCancelButton}
                        replyOnClick={handleReplyClick}
                      />
                    )}
                    <p className="flex justify-end p-2 text-lg  font-medium text-customcolorred">
                      {blog?.firstName + " " + blog?.lastName}
                    </p>
                    <p className="flex justify-end p-2 text-base font-medium text-customColor">
                      Created on: {blog?.dateCreated}
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
