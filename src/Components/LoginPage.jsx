import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const userId = useRef(null);
  const userPassword = useRef(null);
  const navigate = useNavigate();

  async function handleUserLogin() {
    const email = userId.current.value;
    const password = userPassword.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // toast.success("Logged in Successfully", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      navigate("/blogs");
    } catch (error) {
      // toast.error("Invalid Credentials", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      console.error("Invalid Credentials");
    }
  }

  return (
    <>
      <div className="bg-slate-200 h-screen flex items-center justify-center">
        <div className="bg-[#f7f7f7] p-7 rounded-md border border-black">
          <div>
            <p className="flex flex-col py-2">
              <label className="text-1xl font-medium"> Email</label>
              <input
                className="max-w-fit p-3 border border-black outline-none rounded-md"
                ref={userId}
                placeholder="Please Enter your ID"
              ></input>
            </p>
          </div>
          <div>
            <p className="flex flex-col py-2">
              <label className="text-1xl font-medium">Password</label>
              <input
                type="password"
                className="max-w-fit p-3 border border-black outline-none rounded-md"
                ref={userPassword}
                placeholder="Please Enter Password"
              ></input>
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-cyan-400 p-2 text-gray-350 text-lg hover:font-medium rounded-md hover:text-black hover:shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out"
              onClick={handleUserLogin}
            >
              Sign-In
            </button>
          </div>
          <Link to="/SignUp">
            <button className="text-base mt-2 font-medium underline">
              Dont have an Account Sign-Up!
            </button>
          </Link>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default LoginPage;
