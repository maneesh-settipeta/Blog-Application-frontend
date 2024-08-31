import { createContext, useReducer } from "react";
// import { auth } from "../firebase";
// import fetchBlogs from "../fetchBlogs";

const BlogContext = createContext({
  blogs: [],
  replyClick: false,
  selectedBlog: undefined,
  replyCheckForTrue: false,
  user: {
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    id: null,
    email: null,
  },
  searchQuery: "",
  addBlog: () => {},
  editReply: () => {},
  addReplies: () => {},
  checkUser: () => {},
  setUser: () => {},
  bulkBlog: () => {},
  clearLocalStorage: () => {},
  handleSearchQuery: () => {},
});

function projectBlogUseReducer(state, action) {
  if (action.type === "ADD-BLOG") {
    console.log("Blog-add");

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
    console.log(action.userData);

    console.log(action.userData.firstName, action.userData.lastName);

    if (
      action.userData.firstName !== undefined &&
      action.userData.lastName !== undefined
    ) {
      // localStorage.setItem("firstName", action.userData.firstName);
      // localStorage.setItem("lastName", action.userData.lastName);
    }

    return {
      ...state,
      user: {
        ...action.userData,
      },
    };
  }

  if (action.type === "ADD-REPLIES") {
    // log;
    console.log("65");

    const blogIndex = state.blogs.findIndex(
      (blog) => blog.id === action.repliesData.id
    );

    const updatedBlog = {
      ...state.blogs[blogIndex],
      replies: [...state.blogs[blogIndex].replies, action.repliesData],
    };

    const updatedBlogs = [...state.blogs];
    updatedBlogs[blogIndex] = updatedBlog;

    return {
      ...state,
      blogs: updatedBlogs,
    };
  }
  if (action.type === "SEARCH-QUERY") {
    return {
      ...state,
      searchQuery: action.searchQueryValue,
    };
  }

  return state;
}

export function ProjectContext({ children }) {
  const [projectStateReducer, setProjectDispatch] = useReducer(
    projectBlogUseReducer,
    {
      blogs: [],
      user: {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        id: null,
        email: null,
      },
      searchQuery: "",
    }
  );
  // projectStateReducer.user.email;

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

  const setUser = (userFromFirebase) => {
    setProjectDispatch({
      type: "SET-USER",
      userData: {
        ...userFromFirebase,
      },
    });
  };

  const addReplies = (repliesData) => {
    setProjectDispatch({
      type: "ADD-REPLIES",
      repliesData: { ...repliesData },
    });
  };

  function clearLocalStorage() {
    localStorage.clear();
  }
  const handleSearchQuery = (searchQuery) => {
    setProjectDispatch({
      type: "SEARCH-QUERY",
      searchQueryValue: searchQuery,
    });
  };

  const blogsData = {
    blogs: projectStateReducer.blogs,
    replyCheckForTrue: projectStateReducer.replyCheckForTrue,
    user: projectStateReducer.user,
    searchQuery: projectStateReducer.searchQuery,
    addBlog,
    addReplies,
    setUser,
    bulkBlog,
    clearLocalStorage,
    handleSearchQuery,
  };

  return (
    <BlogContext.Provider value={blogsData}>{children}</BlogContext.Provider>
  );
}

export default BlogContext;
