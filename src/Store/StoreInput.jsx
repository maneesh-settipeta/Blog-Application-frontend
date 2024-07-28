import { createContext, useReducer } from "react";

const BlogContext = createContext({
  blogs: [],
  replyClick: false,
  selectedBlog: undefined,
  addBlog: () => {},
  editReply: () => {},
  addReplies: () => {},
});

function projectBlogUseReducer(state, action) {
  console.log("test", action.blogDetails);
  if (action.type === "ADD-BLOG") {
    const newID = state.uniqueID + 1;
    const newBlog = {
      ...action.blogDetails,
      id: newID,
    };
    return {
      ...state,
      blogs: [...state.blogs, newBlog],
      uniqueID: newID,
    };
  }
  if (action.type === "EDIT-REPLY") {
    const updateReply = action.editReply;
    return {
      ...state,
      replyClick: updateReply,
    };
  }
  if (action.type === "ADD-REPLIES") {
  }

  return {
    ...state,
  };
}

export function ProjectContext({ children }) {
  const [projectStateReducer, setProjectDispatch] = useReducer(
    projectBlogUseReducer,
    {
      blogs: [],
      uniqueID: 0,
      replyClick: false,
    }
  );
  function addBlog(blogData) {
    console.log(blogData);
    setProjectDispatch({
      type: "ADD-BLOG",
      blogDetails: { ...blogData },
    });
  }
  function editReply(valuee) {
    setProjectDispatch({
      type: "EDIT-REPLY",
      editReply: valuee,
    });
  }
  const addReplies = (repliesData) => {
    setProjectDispatch({
      type: "ADD-REPLIES",
      repliesData: { ...repliesData },
    });
  };
  const blogsData = {
    blogs: projectStateReducer.blogs,
    replyClick: projectStateReducer.replyClick,
    addBlog,
    editReply,
    addReplies,
  };
  console.log(projectStateReducer.blogs);
  return (
    <BlogContext.Provider value={blogsData}>{children}</BlogContext.Provider>
  );
}

export default BlogContext;
