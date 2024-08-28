import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import MainInput from "./MainInput";
import DetailBlog from "./DetailBlog";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import SignUpUpdated from "./SignUpUpdated";

const routerComp = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Login" />,
  },
  { path: "/Login", element: <LoginPage /> },
  { path: "/SignUp", element: <SignUpUpdated /> },

  {
    path: "/blogs",
    element: <Home />,
    children: [
      { path: "profile", element: <Profile /> },

      { path: "bookmarks", element: <MainInput /> },
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
