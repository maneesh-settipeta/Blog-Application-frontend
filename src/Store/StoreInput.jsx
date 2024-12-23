import { createContext, useReducer, useContext } from "react";
// import { auth } from "../firebase";
// import fetchBlogs from "../fetchBlogs";

const initialState = {
  blogs: [],
  repliesData: [],
  savedBlogsData: [],
  savedBlogUuids: [],
  replyClick: false,
  selectedBlog: undefined,
  replyCheckForTrue: false,
  user: {
    firstName: localStorage?.getItem("firstName"),
    lastName: localStorage?.getItem("lastName"),
    userUuid: localStorage?.getItem("useruuid"),
    email: localStorage?.getItem("email"),
  },
  searchQuery: "",
  addBlogUuids: () => { },
  addBlog: () => { },
  editReply: () => { },
  addReplies: () => { },
  checkUser: () => { },
  setUser: () => { },
  bulkBlog: () => { },
  clearLocalStorage: () => { },
  handleSearchQuery: () => { },
  savedBlogs: () => { },
}

const BlogContext = createContext(initialState);

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
    localStorage.setItem("firstName", action.userData.firstname);
    localStorage.setItem("lastName", action.userData.lastname);
    localStorage.setItem("email", action.userData.email);
    localStorage.setItem("useruuid", action.userData.useruuid);
    return {
      ...state,
      user: {
        email: action.userData.email,
        firstName: action.userData.firstname,
        lastName: action.userData.lastname,
        userUuid: action.userData.useruuid,
      },
    };
  }
  if (action.type === 'add-saved-blogs') {
    return {
      ...state,
      savedBlogsData: [...action.blogsSaved]
    }
  }
  if (action.type === 'ADD-BLOGUUIDS') {
    return {
      ...state,
      savedBlogUuids: [...action.bloguuids]
    }
  }

  if (action.type === "ADD-REPLIES") {
    const findRepliesData = state.repliesData.findIndex((replyObject) => replyObject.bloguuid === action.repliesAllData.bloguuid)
    if (findRepliesData > -1) {
      const replyDataUpdateObject = {
        repliedinput: action.repliesAllData.repliedinput,
        fullname: action.repliesAllData.fullname,
        created_at: action.repliesAllData.created_at,
        replyuuid: action.repliesAllData.replyuuid,
      }
      const updateObject = [
        ...state.repliesData[findRepliesData].replies,
        replyDataUpdateObject
      ]
      const updateReplyObject = {
        ...state.repliesData[findRepliesData],
        replies: updateObject,
      }
      const updateAllObjects = [...state.repliesData]
      updateAllObjects[findRepliesData] = updateReplyObject

      return {
        ...state,
        repliesData: updateAllObjects
      }
    }
    else {
      const replyData = {
        bloguuid: action.repliesAllData.bloguuid,
        replies: [
          {
            repliedinput: action.repliesAllData.repliedinput,
            fullname: action.repliesAllData.fullname,
            created_at: action.repliesAllData.created_at,
            replyuuid: action.repliesAllData.replyuuid,
          }
        ]
      }


      return {
        ...state,
        repliesData: [...state.repliesData, replyData],
      };
    }
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
    initialState,
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

  const setUser = (userData) => {
    setProjectDispatch({
      type: "SET-USER",
      userData: {
        ...userData,
      },
    });
  };

  const addReplies = (repliesData) => {
    setProjectDispatch({
      type: "ADD-REPLIES",
      repliesAllData: { ...repliesData },
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

  const savedBlogs = (savedBlogsDataFromBE) => {

    setProjectDispatch({
      type: 'add-saved-blogs',
      blogsSaved: savedBlogsDataFromBE
    })
  }

  const addBlogUuids = (bloguuidData) => {

    setProjectDispatch({
      type: "ADD-BLOGUUIDS",
      bloguuids: bloguuidData,
    })
  }
  console.log(projectStateReducer.user);


  const blogsData = {
    blogs: projectStateReducer.blogs,
    replyCheckForTrue: projectStateReducer.replyCheckForTrue,
    user: projectStateReducer.user,
    searchQuery: projectStateReducer.searchQuery,
    repliesData: projectStateReducer.repliesData,
    savedBlogsData: projectStateReducer.savedBlogsData,
    savedBlogUuids: projectStateReducer.savedBlogUuids,
    addBlog,
    addReplies,
    setUser,
    bulkBlog,
    clearLocalStorage,
    handleSearchQuery,
    savedBlogs,
    addBlogUuids,
  };

  return (
    <BlogContext.Provider value={blogsData}>{children}</BlogContext.Provider>
  );
}

export default BlogContext;
// export const useBlog= ()=>{
//   return useContext(BlogContext);
// }
