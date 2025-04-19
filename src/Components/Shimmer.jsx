import React from "react";
function Shimmer() {
  return (
    <>
      {" "}
      <div>
        <div className=" flex flex-col justify-center items-center mt-8 ">
          <div className="w-1/2  h-96 animate-pulse bg-gray-200 rounded-md  mb-4"></div>
          <div className="w-1/2  h-96 animate-pulse bg-gray-200 rounded-md mb-4"></div>
          <div className="w-1/2  h-96 animate-pulse bg-gray-200 rounded-md mb-4"></div>
        </div>
      </div>
    </>
  );
}

export default Shimmer;
