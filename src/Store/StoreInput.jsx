import { createContext, useReducer } from "react";
// import { auth } from "../firebase";

const BlogContext = createContext({
  blogs: [],
  replyClick: false,
  selectedBlog: undefined,
  replyCheckForTrue: false,
  addBlog: () => {},
  editReply: () => {},
  addReplies: () => {},
  checkUser: () => {},
});

function projectBlogUseReducer(state, action) {
  // console.log("test", action.blogDetails);
  if (action.type === "ADD-BLOG") {
    const newBlog = {
      ...action.blogDetails,
      replies: [],
    };
    return {
      ...state,
      blogs: [...state.blogs, newBlog],
    };
  }
  if (action.type === "ADD-REPLIES") {
    const Blog = state.blogs.findIndex(
      (blog) => blog.id === action.repliesData.blogID
    );

    const updatedBlog = {
      ...state.blogs[Blog],
      replies: [...state.blogs[Blog].replies, action.repliesData.blogRepliess],
    };
    const updatedBlogs = [
      ...state.blogs.slice(0, Blog),
      updatedBlog,
      ...state.blogs.slice(Blog + 1),
    ];

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
    }
  );
  function addBlog(blogData) {
    // console.log(blogData);
    setProjectDispatch({
      type: "ADD-BLOG",
      blogDetails: { ...blogData },
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
    replyCheckForTrue: projectStateReducer.replyCheckForTrue,
    addBlog,
    addReplies,
  };

  return (
    <BlogContext.Provider value={blogsData}>{children}</BlogContext.Provider>
  );
}

export default BlogContext;
