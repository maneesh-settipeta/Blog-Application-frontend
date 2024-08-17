import { useContext, useState, useEffect } from "react";
import BlogContext from "../Store/StoreInput";
import fetchBlogs from "../fetchBlogs";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import Shimmer from "./Shimmer";
import fetchUserDetails from "../fetchUserDetails";
import PostedBlog from "./PostedBlog";
import { useLocation } from "react-router-dom";

function MainInput() {
  const { bulkBlog, addBlog, blogs, user, searchQuery } =
    useContext(BlogContext);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.userTitle?.toLowerCase().includes(searchQuery) ||
      `${blog?.firstName} ${blog?.lastName}`.toLowerCase().includes(searchQuery)
  );
  const [savedBlogs, setSavedBlogs] = useState([]);
  console.log(savedBlogs);

  const location = useLocation();
  // const notFoundMessage = {
  //   userTitle: "Not Found",
  //   userinput: "",
  //   dateCreated: "",
  //   replies: [],
  //   userID: "",
  //   firstName: "",
  //   lastName: "",
  //   emial: "",
  // };

  let displayBlogs;
  if (filteredBlogs?.length > 0) {
    displayBlogs = filteredBlogs;
  }
  // else if (filteredBlogs?.length === 0) {
  //   displayBlogs = notFoundMessage;
  // }
  else if (location.pathname === "/blogs/bookmarks") {
    displayBlogs = savedBlogs;
  } else {
    displayBlogs = blogs;
  }

  const currentDate = new Date().toLocaleString();

  // useEffect(() => {}, [user.loggedInUserID]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      const responseData = await fetchBlogs();
      const responeUserData = await fetchUserDetails();
      bulkBlog(responseData);
      setSavedBlogs(responeUserData.savedBlogs);
      setLoading(false);
    };
    getBlogs();
  }, []);

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
      replies: [],
      userID: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emial: user.email,
    };

    const docRef = await addDoc(collection(db, "blogs"), newBlogDetails);
    const newBlog = { ...newBlogDetails, id: docRef.id };
    await updateDoc(doc(db, "blogs", docRef.id), newBlog);
    addBlog(newBlog);

    currentState.inputTitle = "";
    currentState.inputValue = "";
    currentState.uniqueID = newID;
  };

  if (loading) {
    return <Shimmer />;
  }

  return (
    <>
      <div className="flex justify-center max-h-max bg-gray-50">
        <div className="w-full md:w-1/2 px-4 ">
          <button
            className="flex underline mb-2 text-customColor font-serif text-3xl  text-start "
            onClick={handleToggleInputs}
          >
            {currentState.toggleInput ? "Write a post" : "Post Blog"}
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
            <PostedBlog sendBlogsData={displayBlogs} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainInput;
