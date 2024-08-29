import { useContext, useState, useEffect } from "react";
import BlogContext from "../Store/StoreInput";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import Shimmer from "./Shimmer";
import PostedBlog from "./PostedBlog";
import { useLocation } from "react-router-dom";
import useFetchBlogs from "../useFetchBlogs";
import useFetchUserData from "../useFetchUserData";
import { useForm } from "react-hook-form";

function MainInput() {
  const { bulkBlog, addBlog, blogs, user, searchQuery } =
    useContext(BlogContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { blogsData } = useFetchBlogs();
  const { userData } = useFetchUserData();

  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog.userTitle?.toLowerCase()?.includes(searchQuery) ||
      `${blog?.firstName} ${blog?.lastName}`
        .toLowerCase()
        ?.includes(searchQuery)
  );

  const [savedBlogs, setSavedBlogs] = useState([]);
  console.log(savedBlogs);

  const location = useLocation();
  console.log(location);

  let displayBlogs;
  if (filteredBlogs?.length > 0) {
    displayBlogs = filteredBlogs;
  } else if (location.pathname === "/blogs/bookmarks") {
    displayBlogs = savedBlogs;
  } else {
    displayBlogs = blogs;
  }

  const [currentState, setCurrentState] = useState({
    inputTitle: "",
    inputValue: "",
  });

  const currentDate = new Date().toLocaleString();

  const [loading, setLoading] = useState(true);

  const getBlogs = () => {
    bulkBlog(blogsData);
    console.log(userData?.savedBlogs);
    setSavedBlogs(userData?.savedBlogs);
    setLoading(false);
  };
  useEffect(() => {
    getBlogs();
  }, [blogsData, userData, location]);

  // const handleInput = (e) => {
  //   const inputText = e.target.value;
  //   setCurrentState((prevState) => ({
  //     ...prevState,
  //     inputValue: inputText,
  //   }));
  // };

  // const handleTitleInput = (e) => {
  //   const inputTextTitle = e.target.value;
  //   setCurrentState((prevState) => ({
  //     ...prevState,
  //     inputTitle: inputTextTitle,
  //   }));
  // };

  const handleToggleInputs = () => {
    setCurrentState((prevState) => ({
      ...prevState,
      toggleInput: !prevState.toggleInput,
    }));
  };

  const handlesendData = async (data) => {
    const { title, description } = data;
    console.log(title, description);

    const newID = currentState.uniqueID + 1;
    const newBlogDetails = {
      userTitle: title,
      userinput: description,
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
    // currentState.inputTitle = "";
    // currentState.inputValue = "";
    currentState.uniqueID = newID;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setCurrentState((prevState) => ({
          ...prevState,
          inputValue: prevState.inputValue + " " + content,
        }));
      };
      reader.readAsText(file);
    }
  };

  if (loading) {
    return <Shimmer />;
  }

  if (searchQuery?.length !== 0 && filteredBlogs?.length === 0) {
    return (
      <>
        <h1 className=" text-4xl text-customColor flex justify-center  mb-6 font-bold ">
          {"No Data found"}
        </h1>
      </>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="xs:w-full md:w-1/2 px-4  max-h-max ">
        <form onSubmit={handleSubmit(handlesendData)}>
          <button
            className="flex  mb-2 border p-2 border-black rounded-md text-customColor font-medium text-3xl  text-start "
            onClick={handleToggleInputs}
          >
            {currentState.toggleInput ? "Write a post" : "Post Blog"}
          </button>
          {currentState.toggleInput ? (
            <div>
              <p className="font-serif text-2xl text-gray-950 mt-5   ">Title</p>
              <input
                className="border w-full  border-black rounded-md outline-none h-10 mt-1  p-2  focus:outline-none"
                placeholder="Enter Title"
                {...register("title", { required: "This is Required" })}
              />

              <p className="font-serif text-2xl  text-gray-950 mt-6">
                Upload a file to be set in the description field.
              </p>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className=" pt-4"
              />
              <p className="font-serif text-2xl  text-gray-950 mt-6">
                Type Here
              </p>

              <textarea
                {...register("description", { required: "This is Required" })}
                className="border w-full border-black rounded-md  outline-none h-40 p-2 mt-1 "
                placeholder="please type here"
              />
              <div className="flex justify-center mt-3">
                <input
                  type="submit"
                  className="p-2 bg-customcolorred outline-none text-gray-50 rounded-md"
                >
                  Submit
                </input>
              </div>
            </div>
          ) : null}
          <div className="flex-col justify-center mt-10 ">
            <h1 className=" text-4xl text-customColor underline mb-6 font-bold ">
              Conversations
            </h1>
            <PostedBlog sendBlogsData={displayBlogs} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainInput;
