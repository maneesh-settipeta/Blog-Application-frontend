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

const PostedBlog = ({ sendBlogsData }) => {
  console.log(sendBlogsData);
  
  const { blogs, user, setUser, bulkBlog, repliesData, addReplies, addBlogUuids } = useContext(BlogContext);
  const [currentState, setCurrentState] = useState({
    showInputField: null,
    blogReplies: null,
    showReplies: false,
    sendBlogRepliesButtonStatus: false,
  });

  const [isBlogLiked, setBlogLike] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isBookMarkSaved, setBookMark] = useState([]);
  console.log(isBookMarkSaved);

  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        const getLikesData = await axios.post('http://localhost:3000/getLikes', { useruuid: user.userUuid });
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
        const getBookMarks = await axios.post('http://localhost:3000/getBookMarks', { useruuid: user.userUuid });
        const setBookMarksToArray = getBookMarks.data.data;
        const onlyValues = setBookMarksToArray.map(eachValue => Object.values(eachValue)[0]);;
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
        const getFollowers = await axios.post('http://localhost:3000/getFollowers', { useruuid: user.userUuid });
        const setFollowers = getFollowers.data.data;
        const onlyValues = setFollowers.map((eachValue) => Object.values(eachValue)[0]);
        setFollowing(onlyValues);
      } catch (error) {
        console.error("Error while fetching in front-end");
      }
    };
    fetchFollowers();
  }, []);

  // const fetchUserSavedBlogs = () => {
  //   try {
  //     setUser(user);
  //     setBlogLike(user?.blogLike);
  //     setBookMark(user?.bookmarks);

  //     setCurrentState((prevState) => ({
  //       ...prevState,
  //       following: user?.following,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching user saved blogs", error);
  //   }
  // };



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
        const response = await axios.post("http://localhost:3000/getReplies", { bloguuid: bloguuid });
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
    if (user.firstName === undefined && user.lastName === undefined) {
      alert("Please Login to save the blog");
    }
    else {
      if (following?.includes(useruuid)) {
        const unFollow = following?.filter(
          (followingId) => followingId !== useruuid
        );
        try {
          const unFollowedUser = await axios.delete(`http://localhost:3000/unFollowedUser/${user.userUuid}/${useruuid}`);
          setFollowing(unFollow);
        } catch (error) {
          console.error("Error while deleting data", error);
        }

      } else if (!following.includes(useruuid)) {
        console.log("180");

        try {
          const saveFollowing = await axios.post('http://localhost:3000/followUser', { useruuid: useruuid, loggedinuseruuidvalue: user.userUuid })
          setFollowing([...following, useruuid])
        } catch (error) {
          console.error("Error Uploading");
        }
      }
    }

  };


  const handleSaveBookmarkBlog = async (bloguuid) => {
    if (user.firstName === undefined && user.lastName === undefined) {
      alert("Please Login to save the blog");
    }
    else {
      if (isBookMarkSaved?.includes(bloguuid)) {
        const filterSavedBookMarks = isBookMarkSaved.filter((savedBookMarks) => savedBookMarks !== bloguuid)
        setBookMark(filterSavedBookMarks)
        try {
          const unSavedBlog = await axios.delete(`http://localhost:3000/deleteBookMark/${bloguuid}/${user.userUuid}`);

        } catch (error) {
          console.error("error while fetching", error);
        }
      }
      if (!isBookMarkSaved?.includes(bloguuid)) {
        setBookMark((prevState) => [
          ...prevState,
          bloguuid
        ])
        try {
          const saveBlogs = await axios.post("http://localhost:3000/saveBookMarks", { savedbloguuid: bloguuid, useruuid: user.userUuid });
        } catch (error) {
          console.error("error while fetching ", error);
        }
      }
    }

  };

  const handleLikeButton = async (id) => {
    if (user.firstName === undefined && user.lastName === undefined) {
      alert("Please Login to like the blog");
    }
    const bloguuid = id
    if (!isBlogLiked.includes(id)) {
      try {
        await axios.post('http://localhost:3000/likedBlog', { bloguuid: bloguuid, useruuid: user.userUuid });
        setBlogLike((prevState) => [
          ...prevState,
          bloguuid,
        ])
      } catch (error) {
        console.error("Error while fetching", error);
      }
    }
    if (isBlogLiked.includes(id)) {
      const filterLikes = isBlogLiked.filter((bloguuid) => bloguuid !== id);
      try {
        const unLike = await axios.delete(`http://localhost:3000/deleteBlog/${bloguuid}/${user.userUuid}`);
      } catch (error) {
        console.error("Error while doing unlike", error);

      }
      setBlogLike(filterLikes);
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


  return (
    <>
      {" "}
      {sendBlogsData?.map((blog) => {



        return (
          <div
            className="h-auto    mb-2 mt-2 "
            key={blog?.blogID + blog?.firstname + blog?.created_time}
          >
            <hr className="mt-1 mb-1"></hr>
            <div className="flex justify-between">
              <div className="flex flex-row">
                <p className=" p-1 text-lg mt-2  ml-3  ">
                  {blog?.firstname + " " + blog?.lastname}
                </p>
                {following?.includes(blog?.useruuid) ? (
                  <button
                    onClick={() =>
                      handleSendFollow(
                        blog?.useruuid
                      )
                    }
                    className=" mt-2 corde text-lg ml-2 font-sans text-green-500"
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
                    className=" mt-2 corde text-lg ml-2 font-sans text-green-500"
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
                <p className="  p-1 text-base ml-3 font-medium mt-7 xs:mt-2 text-customColor">
                  {blog?.created_at}
                </p>
                <p>
                  <button
                    className="font-sans text-lg mb-3 border xs:pt-0 hover:bg-customcolorred hover:text-white border-customcolorred p-1 w-20 rounded-md ml-4 xs:mt-2 mt-6 font-semibold "
                    onClick={() => handleShowInput(blog?.bloguuid)}
                  >
                    {" "}
                    Reply
                  </button>
                </p>
                <p>
                  <button
                    className="font-sans text-lg  text-black p-1  xs:mt-1  underline rounded-md ml-3 mb-2  mt-6 font-semibold "
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
