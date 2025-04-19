import { Outlet } from "react-router-dom";
import Header from "./Header";
import React from "react";

function Home() {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-customColor">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default Home;
