import { useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
function SignUp() {
  const firstName = useRef(null);
  const secondName = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  async function handleUserLogin() {
    const firstname = firstName.current.value;
    const lastname = secondName.current.value;
    const email = userEmail.current.value;
    const password = userPassword.current.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log(user);

      await setDoc(doc(db, "users", user.uid), {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      });

      alert("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("Error signing up: " + error.message);
    }
  }
  return (
    <>
      <div className="bg-slate-200 h-screen flex items-center justify-center ">
        <div className="bg-[#f7f7f7] p-7 rounded-md border border-black">
          <div>
            <p className="flex flex-col py-2">
              <label className="text-1xl font-medium "> First Name</label>
              <input
                className="max-w-fit p-3 border border-black outline-none rounded-md"
                ref={firstName}
                placeholder="Please Enter your ID"
              ></input>
            </p>
          </div>
          <div>
            <p className="flex flex-col py-2 ">
              <label className="text-1xl font-medium  ">Last Name</label>
              <input
                className="max-w-fit p-3 border  border-black outline-none rounded-md"
                ref={secondName}
                placeholder="Please Enter Password"
              ></input>
            </p>
          </div>
          <div>
            <p className="flex flex-col py-2 ">
              <label className="text-1xl font-medium  ">Email</label>
              <input
                className="max-w-fit p-3 border  border-black outline-none rounded-md"
                ref={userEmail}
                placeholder="Please Enter Password"
              ></input>
            </p>
          </div>
          <div>
            <p className="flex flex-col py-2 ">
              <label className="text-1xl font-medium  ">Password</label>
              <input
                type="password"
                className="max-w-fit p-3 border  border-black outline-none rounded-md"
                ref={userPassword}
                placeholder="Please Enter Password"
              ></input>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Link to="/Login">
              <button
                className="bg-cyan-400 p-2 text-gray-350 text-lg hover:font-medium rounded-md   hover:text-black hover:shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out"
                onClick={handleUserLogin}
              >
                Sign-up
              </button>
            </Link>
            <Link to="/Login">
              <button className=" p-2 text-gray-350  ed-md underline text-lg font-medium">
                Sign-In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
