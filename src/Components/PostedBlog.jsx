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
    following: [],
    followingUserDetails: [],
  });
  console.log(currentState.following);

  const [isBookMarkSaved, setBookMark] = useState([]);

  const [isBlogLiked, setBlogLike] = useState([]);

  const fetchUserSavedBlogs = () => {
    try {
      setUser(userData);
      setBlogLike(userData?.blogLike);
      setBookMark(userData?.bookmarks);
      console.log(userData?.following);
      setCurrentState((prevState) => ({
        ...prevState,
        following: userData?.following,
      }));
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
    const userDocRef = doc(db, "users", user.id);
    const userFollowing = {
      firstName,
      lastName,
      id,
    };
    const ifUserFollowing = currentState.following?.includes(id);
    if (ifUserFollowing) {
      const unFollow = currentState.following.filter(
        (followingId) => followingId !== id
      );
      console.log(unFollow);
      setCurrentState((prevState) => ({
        ...prevState,
        following: unFollow,
      }));
      await updateDoc(userDocRef, {
        followingUserDetails: arrayRemove(userFollowing),
        following: arrayRemove(id),
      });
    } else {
      try {
        setCurrentState((prevState) => ({
          ...prevState,
          followingUserDetails: [...currentState.following, userFollowing],
          following: [...currentState.following, id],
        }));
        await updateDoc(userDocRef, {
          followingUserDetails: arrayUnion(userFollowing),
          following: arrayUnion(id),
        });
      } catch (error) {
        console.error("Error Uploading");
      }
    }
  };

  function handleShowRepliesLength(blogID) {
    const findBlogForReplyLength = blogs.find((blog) => blog.id === blogID);
    const lengthOfReplies = findBlogForReplyLength.replies.length;
    return lengthOfReplies;
  }

  const handleSaveBookmarkBlog = async (blog) => {
    try {
      const isAlreadySaved = isBookMarkSaved?.includes(blog.id);
      const userDocRef = doc(db, "users", user.id);
      if (isAlreadySaved) {
        setBookMark((prevState) => prevState.filter((id) => id !== blog.id));

        await updateDoc(userDocRef, {
          savedBlogs: arrayRemove(blog),
          bookmarks: arrayRemove(blog.id),
        });
      } else {
        setBookMark((prevState) => [...prevState, blog.id]);
        await updateDoc(userDocRef, {
          savedBlogs: arrayUnion(blog),
          bookmarks: arrayUnion(blog.id),
        });
      }
    } catch (error) {
      console.error("Error Uploading");
    }
  };

  const handleLikeButton = async (id) => {
    try {
      const isAlreadyBlogLiked = isBlogLiked?.includes(id);
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
    <>
      {" "}
      {sendBlogsData?.map((blog) => {
        return (
          <div
            className="h-auto    mb-2 mt-2 "
            key={blog?.blogID + blog?.firstName + blog?.dateCreated}
          >
            <hr className="mt-1 mb-1"></hr>
            <div className="flex">
              <p className=" p-1 text-lg mt-2  ml-3  ">
                {blog?.firstName + " " + blog?.lastName}
              </p>
              {currentState.following?.includes(blog?.userID) ? (
                <button
                  onClick={() =>
                    handleSendFollow(
                      blog?.firstName,
                      blog?.lastName,
                      blog?.userID
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
                      blog?.firstName,
                      blog?.lastName,
                      blog?.userID
                    )
                  }
                  className=" mt-2 corde text-lg ml-2 font-sans text-green-500"
                >
                  Follow
                </button>
              )}
            </div>
            <Link to={`/blogs/${blog.id}`} state={{ blogid: blog.id }}>
              <h1 className="pl-4 font-bold text-3xl p-2 ">
                {blog?.userTitle}
              </h1>
              <p className="pl-4 line-clamp-5 text-ellipsis text-gray-700 ">
                {blog?.userinput}
              </p>
            </Link>
            <div className=" flex justify-between md:mt-3 ">
              <div className="flex xs:flex-col md:flex-row">
                <p className="  p-1 text-base ml-3 font-medium mt-7 xs:mt-2 text-customColor">
                  {blog?.dateCreated}
                </p>
                <p>
                  <button
                    className="font-sans text-lg mb-3 border xs:pt-0 hover:bg-customcolorred hover:text-white border-customcolorred p-1 w-20 rounded-md ml-4 xs:mt-2 mt-6 font-semibold "
                    onClick={() => handleShowInput(blog?.id)}
                  >
                    {" "}
                    Reply
                  </button>
                </p>
                <p>
                  <button
                    className="font-sans text-lg  text-black p-1  xs:mt-1  underline rounded-md ml-3 mb-2  mt-6 font-semibold "
                    onClick={() => handleShowReplies(blog?.id)}
                  >
                    Replies({handleShowRepliesLength(blog?.id)})
                  </button>
                </p>
              </div>
              <div className="flex xs:flex-col md:flex-row">
                <div>
                  {isBlogLiked?.includes(blog?.id) ? (
                    <button onClick={() => handleLikeButton(blog?.id)}>
                      <FcLike className="lg:mt-3 xs:mt-12 w-12 xs:w-14 lg:size-6 xs:size-7" />
                    </button>
                  ) : (
                    <button onClick={() => handleLikeButton(blog?.id)}>
                      <FaRegHeart className="lg:mt-3 xs:mt-12 w-12 xs:w-14 lg:size-6 xs:size-7 " />
                    </button>
                  )}
                </div>
                <div>
                  {isBookMarkSaved?.includes(blog?.id) ? (
                    <button onClick={() => handleSaveBookmarkBlog(blog)}>
                      <IoBookmark className="lg:mt-3 xs:mt-5 w-12 xs:w-14 size-6 " />
                    </button>
                  ) : (
                    <button onClick={() => handleSaveBookmarkBlog(blog)}>
                      {" "}
                      <FaRegBookmark className="lg:mt-3  xs:mt-5 w-12 xs:w-14 size-6" />
                    </button>
                  )}
                </div>
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
    </>
  );
};

export default PostedBlog;
