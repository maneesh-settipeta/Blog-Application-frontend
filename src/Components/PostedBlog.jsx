import BlogReplyInput from "./BlogReplyInput";
import { Link } from "react-router-dom";
import ReplyDiscription from "./ReplyDiscription";
import { IoBookmark } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import BlogContext from "../Store/StoreInput";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import React from "react";


const PostedBlog = ({ sendBlogsData }) => {

  const { blogs, user, setUser, bulkBlog, repliesData, addReplies, addBlogUuids, searchQuery } = useContext(BlogContext);
  const [currentState, setCurrentState] = useState({
    showInputField: null,
    blogReplies: null,
    showReplies: false,
    sendBlogRepliesButtonStatus: false,
  });

  const filteredBlogs = sendBlogsData?.filter(
    (blog) =>
      blog.usertitle?.toLowerCase()?.includes(searchQuery)
  );

  let displayBlogs
  if (searchQuery?.length > 0 && filteredBlogs?.length > 0) {
    displayBlogs = filteredBlogs;
  }
  else {
    displayBlogs = sendBlogsData
  }

  const [isBlogLiked, setBlogLike] = useState([]);
  console.log(isBlogLiked);
  const [following, setFollowing] = useState([]);
  const [isBookMarkSaved, setBookMark] = useState([]);


  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        const getLikesData = await axios.post(`${import.meta.env.VITE_baseURL}likes`, { useruuid: user.userUuid });
        const setLikesToArray = getLikesData.data.data;
        const onlyValues = setLikesToArray.map(eachValue => Object.values(eachValue)[0]);
        setBlogLike(onlyValues);
      } catch (error) {
        console.error("Error while fetching in front-end");
      }
    };
    fetchLikesData();
  }, []);


  useEffect(() => {
    const fetchBookMarksData = async () => {
      try {
        const getBookMarks = await axios.get(`${import.meta.env.VITE_baseURL}saveBookMarks`, { useruuid: user.userUuid });
        const setBookMarksToArray = getBookMarks.data.data;
        const onlyValues = setBookMarksToArray.map(eachValue => Object.values(eachValue)[0]);
        setBookMark(onlyValues)
        addBlogUuids(onlyValues)
      } catch (error) {
        console.error("Error while fetching in front-end");
      }
    };
    fetchBookMarksData();
  }, []);


  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const getFollowers = await axios.get(`${import.meta.env.VITE_baseURL}followers`, { useruuid: user.userUuid });
        const setFollowers = getFollowers.data.data;
        const onlyValues = setFollowers.map((eachValue) => Object.values(eachValue)[0]);
        setFollowing(onlyValues);
      } catch (error) {
        console.error("Error while fetching in front-end");
      }
    };
    fetchFollowers();
  }, []);

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

  const handleShowReplies = async (blogID) => {
    const findReplies = repliesData?.find((repliesDataInContext) => repliesDataInContext.bloguuid === blogID);
    if (!findReplies) {
      try {
        const bloguuid = blogID
        const response = await axios.post(`${import.meta.env.VITE_baseURL}getReplies`, { bloguuid: bloguuid });
        const repliesObjectData = response.data.data;
        repliesObjectData.forEach((singleReplyObject) => addReplies(singleReplyObject));
      } catch (error) {
        console.error("Error in frontend", error);
      }
    }
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
    const findBlogForReplyLength = blogs.find((blog) => blog.id === blogID);
    const lengthOfReplies = findBlogForReplyLength?.replies?.length;
    return lengthOfReplies;
  }


  const handleSendFollow = async (useruuid) => {
    const allFollowers = following;
    const unFollow = following?.filter(
      (followingId) => followingId !== useruuid
    );
    if (user.firstName === undefined && user.lastName === undefined) {
      alert("Please Login to save the blog");
    }
    else {
      if (following?.includes(useruuid)) {

        try {
          setFollowing(unFollow);
          const unFollowedUser = await axios.delete(`${import.meta.env.VITE_baseURL}unFollowedUser/${user.userUuid}/${useruuid}`);


        } catch (error) {
          console.error("Error while deleting data", error);
          alert("Network Issue please try again");
          setFollowing(allFollowers)
        }

      } else if (!following.includes(useruuid)) {

        try {
          setFollowing([...following, useruuid])
          const saveFollowing = await axios.post(`${import.meta.env.VITE_baseURL}followUser`, { useruuid: useruuid, loggedinuseruuidvalue: user.userUuid })
        } catch (error) {
          console.error("Error Uploading");
          alert("Network Issue please try again")
          setFollowing(unFollow);
        }
      }
    }

  };


  const handleSaveBookmarkBlog = async (bloguuid) => {
    const filterSavedBookMarks = isBookMarkSaved.filter((savedBookMarks) => savedBookMarks !== bloguuid);
    const allBookMarks = isBookMarkSaved;
    if (user.firstName === undefined && user.lastName === undefined) {
      alert("Please Login to save the blog");
    }

    else {
      if (isBookMarkSaved?.includes(bloguuid)) {


        try {
          setBookMark(filterSavedBookMarks)
          const unSavedBlog = await axios.delete(`${import.meta.env.VITE_baseURL}deleteBookMark/${bloguuid}/${user.userUuid}`);

        } catch (error) {
          console.error("error while fetching", error);
          alert("Network Issue please try again");
          setBookMark(allBookMarks);
        }
      }
      if (!isBookMarkSaved?.includes(bloguuid)) {

        try {
          setBookMark((prevState) => [
            ...prevState,
            bloguuid
          ])
          const saveBlogs = await axios.post(`${import.meta.env.VITE_baseURL}saveBookMarks`, { savedbloguuid: bloguuid, useruuid: user.userUuid });

        } catch (error) {
          console.error("error while fetching ", error);
          alert("Network Issue please try again");
          setBookMark(filterSavedBookMarks);
        }
      }
    }

  };

  const handleLikeButton = async (id) => {
    const totalBlogLikes = isBlogLiked;
    const filterLikes = isBlogLiked.filter((bloguuid) => bloguuid !== id);
    if (user.firstName === undefined && user.lastName === undefined) {
      alert("Please Login to like the blog");
    }
    const bloguuid = id
    if (!isBlogLiked.includes(id)) {
      try {
        setBlogLike((prevState) => [
          ...prevState,
          bloguuid,
        ])
        const response = await axios.post(`${import.meta.env.VITE_baseURL}likedBlog`, { bloguuid: bloguuid, useruuid: user.userUuid });
        console.log(response, "Error in try");

      } catch (error) {
        console.error("Error while fetching", error);
        alert("Network Issue please try again")
        setBlogLike(filterLikes);
      }
    }
    if (isBlogLiked.includes(id)) {
      const filterLikes = isBlogLiked.filter((bloguuid) => bloguuid !== id);
      try {
        setBlogLike(filterLikes);
        const unLike = await axios.delete(`${import.meta.env.VITE_baseURL}deleteBlog/${bloguuid}/${user.userUuid}`);
        console.log(unLike, "Error in try");

      } catch (error) {
        console.error("Error while doing unlike", error);
        alert("Network Issue please try again");
        setBlogLike(totalBlogLikes);
      }

    }
  };

  // const handleDeleteBlog = async (id) => {
  //   if (user.admin === true) {
  //     const filterdDeletedBlogs = blogs.filter((blog) => blog.id !== id);
  //     bulkBlog(filterdDeletedBlogs);
  //     const deleteBlogDoc = doc(db, "blogs", id);
  //     await deleteDoc(deleteBlogDoc);
  //   } else {
  //     console.error("Error Deleting");
  //   }
  // };

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
    <>
      {" "}
      {displayBlogs?.map((blog) => {

        return (
          <div
            className="h-auto line-clamp-5 text-ellipsis  mb-2 mt-2"
            key={blog?.bloguuid + blog?.firstname + blog?.created_time}
          >
            <hr className="mt-1 mb-1"></hr>
            <div className="flex justify-between ">
              <div className="flex flex-row">
                <p className=" p-1 text-sm mt-2  ml-3  ">
                  {blog?.firstname + " " + blog?.lastname}
                </p>
                {following?.includes(blog?.useruuid) ? (
                  <button
                    onClick={() =>
                      handleSendFollow(
                        blog?.useruuid
                      )
                    }
                    className=" mt-2 corde text-sm ml-2 font-sans text-green-500"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleSendFollow(
                        blog?.useruuid
                      )
                    }
                    className=" mt-2 corde text-sm ml-2 font-sans text-green-500"
                  >
                    Follow
                  </button>
                )}
              </div>
              <div>
                {user.admin ? (
                  <button>
                    {" "}
                    <MdDeleteOutline
                      className="mt-5 size-6"
                      onClick={() => handleDeleteBlog(blog.id)}
                    />
                  </button>
                ) : null}{" "}
              </div>
            </div>
            <Link to={`/blogs/${blog.bloguuid}`} state={{ blogid: blog.bloguuid }}>
              <h1 className="pl-4 font-bold text-3xl p-2 ">
                {blog?.usertitle}
              </h1>
              <p className="pl-4 line-clamp-5 text-ellipsis text-gray-700 ">
                {blog?.userinput}
              </p>
            </Link>
            <div className=" flex justify-between md:mt-3 ">
              <div className="flex xs:flex-col md:flex-row">
                <p className="  p-1 text-base ml-3 font-medium mt-7 xs:mt-2 text-gray-600">
                  {blog?.created_at.split(' ')[0]}
                </p>
                <p>
                  <button
                    className="font-sans text-lg mb-3 border xs:pt-0 hover:bg-customcolorred hover:text-white border-customcolorred p-1 w-20 rounded-md ml-4 xs:mt-2 mt-6 font-semibold text-gray-600"
                    onClick={() => handleShowInput(blog?.bloguuid)}
                  >
                    {" "}
                    Reply
                  </button>
                </p>
                <p>
                  <button
                    className="font-sans text-lg   p-1  xs:mt-1 text-gray-900  underline rounded-md ml-3 mb-2  mt-6 font-semibold "
                    onClick={() => handleShowReplies(blog?.bloguuid)}
                  >
                    Replies
                  </button>
                </p>
              </div>
              <div className="flex xs:flex-col md:flex-row">
                <div>
                  {isBlogLiked?.includes(blog?.bloguuid) ? (
                    <button onClick={() => handleLikeButton(blog?.bloguuid)}>
                      <FcLike className="lg:mt-3 xs:mt-5 w-12 xs:w-14 lg:size-6 xs:size-6" />
                    </button>
                  ) : (
                    <button onClick={() => handleLikeButton(blog?.bloguuid)}>
                      <FaRegHeart className="lg:mt-3 xs:mt-5 w-12 xs:w-14 lg:size-6 xs:size-6 " />
                    </button>
                  )}
                </div>
                <div>
                  {isBookMarkSaved?.includes(blog?.bloguuid) ? (
                    <button onClick={() => handleSaveBookmarkBlog(blog?.bloguuid)}>
                      <IoBookmark className="lg:mt-3 xs:mt-5 w-12 xs:w-14 size-6 " />
                    </button>
                  ) : (
                    <button onClick={() => handleSaveBookmarkBlog(blog?.bloguuid)}>
                      {" "}
                      <FaRegBookmark className="lg:mt-3  xs:mt-5 w-12 xs:w-14 size-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {currentState.showInputField === blog?.bloguuid && (
              <BlogReplyInput

                bloguuid={blog?.bloguuid}
                sendOnClick={handleCancelButton}
                replyOnClick={handleReplyClick}
              />
            )}
            {currentState.sendBlogRepliesButtonStatus &&
              currentState.blogReplies === blog?.bloguuid && (
                <ReplyDiscription
                  sendId={blog?.bloguuid}
                  sendBlogRepliesButtonStatus={
                    currentState.sendBlogRepliesButtonStatus
                  }
                />
              )}
          </div>
        );
      })}
    </>
  );
};

export default PostedBlog;
