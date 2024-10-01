import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
import BlogReplyInput from "./BlogReplyInput";
import axios from "axios";
import { baseURL } from "../URL";

function DetailBlog() {

  const { blogs, repliesData, } = useContext(BlogContext);
  const [blogDataAfterReload, setBlogDataAfterReload] = useState();

  const { state } = useLocation();
  const findBlogiD = state.blogid;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const getBlog = await axios.post(`${baseURL}/getSpecificBlog`, { bloguuid: findBlogiD })
        setBlogDataAfterReload(getBlog.data.blogData[0]);
      } catch (error) {
        console.error(error, "Error While Fetching Data");
      }
    }
    fetchBlog();
  }, []);



  const [currentState, setCurrentState] = useState({
    showReplyButton: null,
    showReplies: false,
  });

  const [repliesDataFromInitial, setRepliesData] = useState([])

  const findBlog = blogs.find((blog) => blog.bloguuid === findBlogiD);



  const handleShowReplyInputElement = (id) => {
    setCurrentState((prevState) => ({
      ...prevState,
      showReplyButton: id,
    }));
  };



  const handleReplyClick = (updatedReplyObject) => {
    setRepliesData([...repliesDataFromInitial, updatedReplyObject]);
  };

  const handleCancelButtonFun = (id) => {
    setCurrentState((prevState) => {
      if (prevState.showReplyButton === id) {
        return {
          ...prevState,
          showReplyButton: null,
        };
      }
      return prevState;
    });
  };


  const handleShowReplies = async (blogID) => {
    console.log(blogID);
    
    const findReplies = repliesData?.find((repliesDataInContext) => repliesDataInContext.bloguuid === blogID);
    if (!findReplies === undefined) {
      setRepliesData(findReplies.replies);
    }
    if (findReplies === undefined) {
      try {
        const response = await axios.post(`${baseURL}/getReplies`, { bloguuid: blogID });
        const repliesObjectData = response.data.data;
        setRepliesData(repliesObjectData);
      } catch (error) {
        console.error("Error in frontend", error);
      }
    }
    setCurrentState((prevState) => ({
      ...prevState,
      showReplies: !currentState.showReplies,
    }));
  };


  const displayBlog = findBlog === undefined ? blogDataAfterReload : findBlog


  
  


  return (
    <div className="flex  justify-center">
      <div className="md:w-1/2 xs:w-full xs:mr-1 xs:p-2  ">
        <div className="flex mb-6">
          <button className=" text-customcolorred text-sm">
            {displayBlog?.firstname + " " + displayBlog?.lastname}

          </button>
          <p className="flex pt-0  justify-end text-sm ml-2   text-customColor">
            {displayBlog?.created_at.split(' ')[0]}
          </p>
        </div>

        <h1 className="p-0 font-medium text-2xl text-left font-mono ">
          {displayBlog?.usertitle}
        </h1>

        <p className="p-0 font-medium text-lg text-gray-700 ">
          {displayBlog?.userinput}
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => handleShowReplyInputElement(displayBlog?.bloguuid)}
            className="p-2 bg-customcolorred outline-none text-gray-50 text-sm  mt-2 mb-4"
          >
            {" "}
            Reply
          </button>

          <button
            onClick={() => handleShowReplies(displayBlog?.bloguuid)}
            className="p-2 bg-white outline-none text-customcolorred-50 underline border border-gray-600 ml-1 text-sm  mt-2 mb-4"
          >
            Replies
          </button>
        </div>
        {currentState.showReplyButton === displayBlog?.bloguuid ? (
          <BlogReplyInput
            sendOnClick={handleCancelButtonFun}
            bloguuid={displayBlog?.bloguuid}
            replyOnClick={handleReplyClick}

          />
        ) : null}
        {repliesDataFromInitial &&
          currentState.showReplies &&
          repliesDataFromInitial.map((reply, index) => (
            <div key={index} className="flex  border border-x-0">

              <p className="pl-4 text-sm p-5 font-medium">{reply.repliedinput}</p>
              <div className="flex justify-end  ">
                <p className="text-customcolorred mr-4">{reply.fullname}</p>
                <p>{reply.created_at}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default DetailBlog;
