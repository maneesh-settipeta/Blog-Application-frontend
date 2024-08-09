import { createContext, useReducer } from "react";
// import { auth } from "../firebase";
import fetchBlogs from "../fetchBlogs";

const BlogContext = createContext({
  blogs: [],
  replyClick: false,
  selectedBlog: undefined,
  replyCheckForTrue: false,
  currentUserFirstName: localStorage.getItem("firstName"),
  currentUserLastName: localStorage.getItem("lastName"),
  addBlog: () => {},
  editReply: () => {},
  addReplies: () => {},
  checkUser: () => {},
  setUser: () => {},
  bulkBlog: () => {},
  clearLocalStorage: () => {},
  // blukBlogAdd: () => {},
});

function projectBlogUseReducer(state, action) {
  if (action.type === "ADD-BLOG") {
    return {
      ...state,
      blogs: [...state.blogs, action.blogDetails],
    };
  }

  if (action.type === "BULK-BLOG") {
    return {
      ...state,
      blogs: action.blogDetails,
    };
  }

  if (action.type === "SET-USER") {
    localStorage.setItem("firstName", action.userDetails.firstName);
    localStorage.setItem("lastName", action.userDetails.lastName);
    return {
      ...state,
      currentUserFirstName: action.userDetails.firstName,
      currentUserLastName: action.userDetails.lastName,
    };
  }

  if (action.type === "ADD-REPLIES") {
    const blogIndex = state.blogs.findIndex(
      (blog) => blog.id === action.repliesData.id
    );
    console.log("Replies-Data", action.repliesData);

    const updatedBlog = {
      ...state.blogs[blogIndex],
      replies: [...state.blogs[blogIndex].replies, action.repliesData],
    };

    const updatedBlogs = [...state.blogs];
    console.log(updatedBlogs);

    updatedBlogs[blogIndex] = updatedBlog;

    return {
      ...state,
      blogs: updatedBlogs,
    };
  }

  return state;
}

export function ProjectContext({ children }) {
  const [projectStateReducer, setProjectDispatch] = useReducer(
    projectBlogUseReducer,
    {
      blogs: [],
      currentUserFirstName: localStorage.getItem("firstName"),
      currentUserLastName: localStorage.getItem("lastName"),
    }
  );

  function bulkBlog(blogData) {
    setProjectDispatch({
      type: "BULK-BLOG",
      blogDetails: blogData,
    });
  }
  function addBlog(blogData) {
    setProjectDispatch({
      type: "ADD-BLOG",
      blogDetails: blogData,
    });
  }

  const setUser = (userDetail) => {
    setProjectDispatch({
      type: "SET-USER",
      userDetails: userDetail,
    });
  };

  const addReplies = (repliesData) => {
    console.log("Replies-Data", repliesData);

    setProjectDispatch({
      type: "ADD-REPLIES",
      repliesData: { ...repliesData },
    });
  };

  function clearLocalStorage() {
    localStorage.clear();
  }

  const blogsData = {
    blogs: projectStateReducer.blogs,
    replyCheckForTrue: projectStateReducer.replyCheckForTrue,
    currentUserFirstName: projectStateReducer.currentUserFirstName,
    currentUserLastName: projectStateReducer.currentUserLastName,
    addBlog,
    addReplies,
    // blukBlogAdd,
    setUser,
    bulkBlog,
    clearLocalStorage,
  };

  return (
    <BlogContext.Provider value={blogsData}>{children}</BlogContext.Provider>
  );
}

export default BlogContext;
