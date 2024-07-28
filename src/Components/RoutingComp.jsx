import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import MainInput from "./MainInput";

const routerComp = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "/", element: <MainInput /> }],
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
