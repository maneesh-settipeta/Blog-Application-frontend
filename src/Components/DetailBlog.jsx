import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogContext from "../Store/StoreInput";
import BlogReplyInput from "./BlogReplyInput";
import axios from "axios";
function DetailBlog() {

  const { blogs,repliesData,  } = useContext(BlogContext);
  console.log(repliesData);
  
  const [currentState, setCurrentState] = useState({
    showReplyButton: null,
    showReplies: false,
  });
  const [repliesDataFromInitial, setRepliesData] = useState([])
  console.log(repliesDataFromInitial);
  
  const { state } = useLocation();
  const findBlogiD = state.blogid;

  const findBlog = blogs.find((blog) => blog.bloguuid === findBlogiD);

  const handleShowReplyInputElement = (id) => {
    setCurrentState((prevState) => ({
      ...prevState,
      showReplyButton: id,
    }));
  };
  console.log(currentState.showReplyButton);
  

  const handleReplyClick = (updatedReplyObject) => {
    console.log(updatedReplyObject);
    setRepliesData([...repliesDataFromInitial, updatedReplyObject]);
  };

  const handleCancelButtonFun = (id) => {
    console.log("33, detailblog");
    
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

  const handleShowReplies = async(blogID) => {
    console.log("37");
    const findReplies = repliesData?.find((repliesDataInContext) => repliesDataInContext.bloguuid === blogID);
    console.log(findReplies,"findreplies");
    if (!findReplies === undefined){
      setRepliesData(findReplies.replies);
    }
  

    
    if (findReplies===undefined) {
      try {
        const bloguuid = blogID
        const response = await axios.post("http://localhost:3000/getReplies", { bloguuid: findBlog.bloguuid });
        const repliesObjectData = response.data.data;
        console.log(repliesObjectData);
        console.log("success");
        setRepliesData(repliesObjectData);
        
      } catch (error) {
        console.log("error");
        console.error("Error in frontend", error);
      }
    } 
    setCurrentState((prevState) => ({
      ...prevState,
      showReplies: !currentState.showReplies,
    }));
  };


  return (
    <div className="flex justify-center">
      <div className="md:w-1/2 xs:w-full xs:mr-1 xs:p-2">
        <h1 className="p-4 font-medium text-4xl text-left text-customColors underline">
          {findBlog?.usertitle}
        </h1>
        <p className="flex  justify-end  text-customcolorred">
          {findBlog?.firstname + " " + findBlog?.lastname}
        </p>
        <p className="flex pt-1  justify-end   text-customColor">
          {findBlog?.dateCreated}
        </p>
        <p className="p-4 font-medium text-2xl text-left ">
          <span className=" underline">Description:</span> {findBlog?.userinput}
        </p>
        <button
          onClick={() => handleShowReplyInputElement(findBlog?.bloguuid)}
          className="p-2 bg-customcolorred outline-none text-gray-50 text-lg ml-4 rounded-md mt-2 mb-4"
        >
          {" "}
          Reply
        </button>
        {currentState.showReplyButton === findBlog?.bloguuid ? (
          <BlogReplyInput
            sendOnClick={handleCancelButtonFun}
            bloguuid={findBlog.bloguuid}
            replyOnClick={handleReplyClick}

          />
        ) : null}
        <button
          onClick={()=>handleShowReplies(findBlog.bloguuid)}
          className="pl-4 pt-3 pb-1 text-lg font-medium text-customcolorred underline"
        >
          Replies
        </button>
        {repliesDataFromInitial&&
          currentState.showReplies &&
          repliesDataFromInitial.map((reply, index) => (
            <div key={index} className=" border border-x-0">
             
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
