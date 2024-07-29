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
      replies: [],
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
    alert("add-replies");

    // const replyData = action.repliesData;
    // const Blog = state.blogs.findIndex(
    //   (blog) => blog.id === action.repliesData.blogID
    // );

    // const updatedBlog = {
    //   ...state.blogs[Blog],
    //   replies: [...state.blogs[Blog].replies, action.repliesData.blogRepliess],
    // };
    // const updatedBlogs = [
    //   ...state.blogs.slice(0, Blog),
    //   updatedBlog,
    //   ...state.blogs.slice(Blog + 1),
    // ];

    // return {
    //   ...state,
    //   blogs: updatedBlogs,
    // };

    const blogIndex = state.blogs.findIndex((blog) => {
      return blog.id === action.repliesData.blogID;
    });
    const allBlogs = [...state.blogs];
    console.log(allBlogs);

    const existingBlog = state.blogs[blogIndex];
    console.log(existingBlog);

    existingBlog.replies.push(action.repliesData.blogRepliess);
    console.log(existingBlog);
    allBlogs[blogIndex] = existingBlog;
    console.log(allBlogs);

    return { ...state, blogs: allBlogs };

    // const updatedBlogs = state.blogs.map((blog) =>
    //   blog.id === replyData.blogID
    //     ? { ...blog, replies: [...blog.replies, replyData.blogRepliess] }
    //     : blog
    // );
  }

  return state;
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

  return (
    <BlogContext.Provider value={blogsData}>{children}</BlogContext.Provider>
  );
}

export default BlogContext;
