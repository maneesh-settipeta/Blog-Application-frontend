import BlogReplyInput from "./BlogReplyInput";
import { Link } from "react-router-dom";
import ReplyDiscription from "./ReplyDiscription";
import { IoBookmark } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import BlogContext from "../Store/StoreInput";
import { arrayUnion } from "firebase/firestore";
import useFetchUserData from "../useFetchUserData";
import { arrayRemove } from "firebase/firestore";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";

const PostedBlog = ({ sendBlogsData }) => {
  const { blogs, user, setUser } = useContext(BlogContext);

  const { userData } = useFetchUserData();

  const [currentState, setCurrentState] = useState({
    showInputField: null,
    blogReplies: null,
    showReplies: false,
    uniqueID: 0,
    toggleInput: false,
    sendBlogRepliesButtonStatus: false,
  });
  const [isBookMarkSaved, setBookMark] = useState([]);

  const [isBlogLiked, setBlogLike] = useState([]);

  const fetchUserSavedBlogs = () => {
    try {
      setUser(userData);
      setBlogLike(userData.blogLike);
      setBookMark(userData.blogSaved);
    } catch (error) {
      console.error("Error fetching user saved blogs", error);
    }
  };

  useEffect(() => {
    fetchUserSavedBlogs();
  }, [userData]);

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
  const handleSendFollow = async (firstName, lastName, id) => {
    const userFollowing = {
      firstName,
      lastName,
      id,
    };
    try {
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, {
        following: arrayUnion(userFollowing),
      });
    } catch (error) {
      console.error("Error Uploading");
    }
  };

  function handleShowRepliesLength(blogID) {
    const findBlogForReplyLength = blogs.find((blog) => blog.id === blogID);
    const lengthOfReplies = findBlogForReplyLength.replies.length;
    return lengthOfReplies;
  }

  function isFollowing(blog) {
    return user.following?.some(
      (followedUser) =>
        followedUser.firstName.toLowerCase() === blog.firstName.toLowerCase() &&
        followedUser.lastName.toLowerCase() === blog.lastName.toLowerCase()
    );
  }

  const handleSaveBookmarkBlog = async (blog) => {
    try {
      const isAlreadySaved = isBookMarkSaved.includes(blog.id);
      const userDocRef = doc(db, "users", user.id);
      if (isAlreadySaved) {
        setBookMark((prevState) => prevState.filter((id) => id !== blog.id));

        await updateDoc(userDocRef, {
          savedBlogs: arrayRemove(blog),
          blogSaved: arrayRemove(blog.id),
        });
      } else {
        setBookMark((prevState) => [...prevState, blog.id]);
        await updateDoc(userDocRef, {
          savedBlogs: arrayUnion(blog),
          blogSaved: arrayUnion(blog.id),
        });
      }
    } catch (error) {
      console.error("Error Uploading");
    }
  };

  const handleLikeButton = async (id) => {
    try {
      const isAlreadyBlogLiked = isBlogLiked.includes(id);
      const userDocRef = doc(db, "users", user.id);
      if (isAlreadyBlogLiked) {
        const test = setBlogLike((prevState) =>
          prevState.filter((idValue) => idValue !== id)
        );

        await updateDoc(userDocRef, {
          blogLike: arrayRemove(id),
        });
      } else {
        setBlogLike((prevState) => [...prevState, id]);
        await updateDoc(userDocRef, {
          blogLike: arrayUnion(id),
        });
      }
    } catch (error) {
      console.error("Error Uploading");
    }
  };

  return (
    <div>
      {" "}
      {sendBlogsData &&
        sendBlogsData.map((blog) => {
          return (
            <div
              className="w-full h-auto    mb-2 mt-2 rounded-md bg-white  shadow-customColorbeige shadow-md  p-4"
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
              <div className="flex justify-between">
                <div>
                  <p>
                    <button
                      className="font-sans text-lg mb-3 text-white bg-customcolorred p-2 rounded-md ml-4  mt-4 font-semibold "
                      onClick={() => handleShowInput(blog?.id)}
                    >
                      {" "}
                      Reply
                    </button>
                  </p>
                </div>
                <div>
                  <div className="flex justify-end">
                    <p className=" p-1 text-lg mt-2  font-medium text-customcolorred">
                      {blog?.firstName + " " + blog?.lastName}
                    </p>
                    <button
                      onClick={() =>
                        handleSendFollow(
                          blog?.firstName,
                          blog?.lastName,
                          blog?.id
                        )
                      }
                      className=" mt-2 corde text-lg ml-2 font-sans text-green-500"
                    >
                      {" "}
                      {isFollowing(blog) ? "Following" : "Follow"}
                    </button>
                  </div>
                  <p className="flex justify-end p-1 text-base font-medium text-customColor">
                    Created on: {blog?.dateCreated}
                  </p>
                </div>
              </div>
              {currentState.showInputField === blog?.id && (
                <BlogReplyInput
                  id={blog?.id}
                  sendFirebaseId={blog?.id}
                  sendOnClick={handleCancelButton}
                  replyOnClick={handleReplyClick}
                />
              )}
              <div className="flex justify-between">
                <p>
                  <button
                    className="font-sans text-lg  text-black p-1  underline rounded-md ml-3 mb-2  mt-1 font-semibold "
                    onClick={() => handleShowReplies(blog?.id)}
                  >
                    Replies({handleShowRepliesLength(blog?.id)})
                  </button>
                </p>
                <div className="flex">
                  <div>
                    {isBlogLiked.includes(blog.id) ? (
                      <button
                        onClick={() => handleLikeButton(blog.id)}
                        className="mt-5 w-12"
                      >
                        <FcLike />
                        {isBlogLiked[blog.id]}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLikeButton(blog.id)}
                        className="mt-5 w-12"
                      >
                        <FaRegHeart />
                        {isBlogLiked[blog.id]}
                      </button>
                    )}
                  </div>
                  <div>
                    {isBookMarkSaved?.includes(blog?.id) ? (
                      <button
                        className="mt-4 size-6"
                        onClick={() => handleSaveBookmarkBlog(blog)}
                      >
                        <IoBookmark />
                      </button>
                    ) : (
                      <button
                        className="mt-4 size-6"
                        onClick={() => handleSaveBookmarkBlog(blog)}
                      >
                        {" "}
                        <FaRegBookmark />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {currentState.sendBlogRepliesButtonStatus &&
                currentState.blogReplies === blog?.id && (
                  <ReplyDiscription
                    sendId={blog?.id}
                    sendBlogRepliesButtonStatus={
                      currentState.sendBlogRepliesButtonStatus
                    }
                  />
                )}
            </div>
          );
        })}
    </div>
  );
};

export default PostedBlog;
