import { useContext, useState, useEffect } from "react";
import BlogContext from "../Store/StoreInput";
import Shimmer from "./Shimmer";
import PostedBlog from "./PostedBlog";
import { useLocation } from "react-router-dom";
import fetchBlogs from "../fetchBlogs";
import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function MainInput() {
  const { bulkBlog, addBlog, blogs, user, searchQuery, savedBlogsData, savedBlogs } = useContext(BlogContext);

  const location = useLocation();
  useEffect(() => {
    const getBlogs = async () => {
      const blogsData = await fetchBlogs();
      bulkBlog(blogsData);
      setLoading(false);
    }
    getBlogs();
  }, []);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const handleFetchSavedBlogs = async () => {
      if (location.pathname === "/blogs/bookmarks") {
        const getSavedBlogsData = await axios.post(`${import.meta.env.VITE_baseURL}getBookMarksBlogs`, { useruuid: user.userUuid });

        const BlogsDataFromBE = getSavedBlogsData.data.data
        savedBlogs(BlogsDataFromBE);
      }
    }
    handleFetchSavedBlogs();
  }, [location.pathname])


  const [currentState, setCurrentState] = useState({
    toggleInput: false,
    showHeading: false,

  });

  // const filteredBlogs = blogs?.filter(
  //   (blog) =>
  //     blog.usertitle?.toLowerCase()?.includes(searchQuery)
  // );

  let displayBlogs;
  if (location.pathname === "/blogs/bookmarks") {

    displayBlogs = savedBlogsData;
  } else {
    displayBlogs = blogs
  }

  const [loading, setLoading] = useState(true);
  const handleToggleInputs = () => {
    setCurrentState((prevState) => ({
      ...prevState,
      toggleInput: !prevState.toggleInput,
    }));
  };

  const handlesendData = async (data) => {
    const { title, description } = data;


    const newBlogData = {
      usertitle: title,
      userinput: description,
      useruuid: user.userUuid,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_baseURL}createBlog`, newBlogData);
      const newBlogObject = {
        ...newBlogData,
        bloguuid: response?.data?.blogid,
        created_at: response?.data?.created_time,
        firstname: user.firstName,
        lastname: user.lastName,
      };

      addBlog(newBlogObject);
      reset();
    } catch (error) {
      console.error(error, "error while saving blogs data");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setValue('description', content);
      };
      reader.readAsText(file);
    }
  };

  if (loading) {
    return <Shimmer />;
  }



  const headingText = displayBlogs === savedBlogsData ? "Bookmarks :" : "Conversations :";

  return (
    <div className="flex justify-center">
      <div className="xs:w-full md:w-1/2 px-4  max-h-max ">
        <form onSubmit={handleSubmit(handlesendData)}>
          <button
            type="button"
            className="flex  mb-2 border p-1 border-black rounded-md text-gray-700 font-medium text-2xl  text-start "
            onClick={handleToggleInputs}
          >
            {currentState.toggleInput ? "Write a post " : "Post a Blog +"}
          </button>
          {currentState.toggleInput ? (
            <div>
              <p className="font-serif text-2xl text-gray-950 mt-5   ">Title</p>
              <input
                className="border w-full  border-black rounded-md outline-none h-10 mt-1  p-2  focus:outline-none"
                placeholder="Enter Title"
                name="title"
                {...register("title", { required: "This is Required" })}
              />
              <p className="text-customcolorred">{errors.title?.message}</p>

              <p className="font-serif text-2xl  text-gray-950 mt-6">
                Upload a file to be set in the description field.
              </p>
              <input
                type="file"
                accept=".txt"
                name="inputtext"
                onChange={handleFileUpload}
                className="pt-4"
              />
              <p className="font-serif text-2xl  text-gray-950 mt-6">
                Type Here
              </p>

              <textarea
                {...register("description", { required: "This is Required" })}
                className="border w-full border-black rounded-md  outline-none h-40 p-2 mt-1 "
                placeholder="please type here"
              />
              <p className="text-customcolorred">{errors.description?.message}</p>
              <div className="flex justify-center mt-3">
                <input
                  type="submit"
                  className="p-2 bg-customcolorred outline-none text-gray-50 rounded-md"
                />
              </div>
            </div>
          ) : null}
        </form>
        <div className="flex-col justify-center mt-10 ">
          <h1 className=" text-2xl text-customColor  mb-6 font-medium ">
            {headingText}
          </h1>
          <PostedBlog sendBlogsData={displayBlogs} />
        </div>
      </div>
    </div>
  );
}

export default MainInput;
