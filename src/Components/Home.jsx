import { Outlet } from "react-router-dom";
import Header from "./Header";

function Home() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>
      {/* <div className="flex justify-center"> */} <Outlet />
      {/* </div> */}
    </>
  );
}
export default Home;
