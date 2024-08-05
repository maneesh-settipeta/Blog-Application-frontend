import { Outlet } from "react-router-dom";
import Header from "./Header";

function Home() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-customColor">
        <Header />
      </div>
      <Outlet />
    </>
  );
}
export default Home;
