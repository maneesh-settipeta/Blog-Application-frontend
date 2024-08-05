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

const routerComp = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Login" />,
  },
  { path: "/Login", element: <LoginPage /> },
  { path: "/SignUp", element: <SignUp /> },
  {
    path: "/blogs",
    element: <Home />,
    children: [
      { path: "", element: <MainInput /> },
      { path: ":blogid", element: <DetailBlog /> },
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
