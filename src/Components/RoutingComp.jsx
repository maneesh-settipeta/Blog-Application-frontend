import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import MainInput from "./MainInput";
import DetailBlog from "./DetailBlog";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

// function ProtectedRoute({ element, redirectPath }) {
//   const [isAuthorized, setisAuthorized] = useState(() => {
//     return localStorage.length > 0;
//   });

//   return isAuthorized ? element : <Navigate to={redirectPath} />;
// }

const routerComp = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Login" />,
  },
  { path: "/Login", element: <LoginPage /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/Shimmer", element: <Shimmer /> },
  // {
  //   path: "/blogs",
  //   element: <ProtectedRoute element={<Home />} redirectPath="/Login" />,
  //   children: [
  //     {
  //       path: "",
  //       element: (
  //         <ProtectedRoute element={<MainInput />} redirectPath="/Login" />
  //       ),
  //     },
  //     {
  //       path: ":blogId",
  //       element: (
  //         <ProtectedRoute element={<DetailBlog />} redirectPath="/Login" />
  //       ),
  //     },
  //   ],
  // },
  {
    path: "/blogs",
    element: <Home />,
    children: [
      {
        path: "",
        element: <MainInput />,
      },
      {
        path: ":blogId",
        element: <DetailBlog />,
      },
    ],
  },
]);

function RoutingComp() {
  return (
    <>
      <RouterProvider router={routerComp}></RouterProvider>
    </>
  );
}
export default RoutingComp;
