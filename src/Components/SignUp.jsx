import { useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid"; 
import axios from "axios";


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

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   const user = userCredential.user;
    //   const uuid = uuidv4(); 
    //   const userData = {
    //     firstName: firstname,
    //     lastName: lastname,
    //     email: email,
    //     password: password,
    //     id: user.uid,
    //     userUuid:uuid,
    //     following: [],
    //     blogLike: [],
    //     bookmarks: [],
    //     likedBlog: [],
    //     savedBlogs: [],
    //     followingUserDetails: [],
    //   };
    //   const userDataWithId = await setDoc(doc(db, "users", user.uid), userData);
      const userDataToPostGresSql = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        userUuid:uuid,
      }
      try {
        const response = await axios.post('http://localhost:3000/SignUp', userDataToPostGresSql);
        if (response===true){
          alert("User created succesfully");
          
        }
        if (response===false){
          console.error("user creation error")
        }
      } catch (error) {
        console.error(error,"User Creation Error");
      }
    // } catch (error) {
    //   console.error("Error signing up: ", error);
    // }
  }
  return (
    <div className="bg-customColor h-screen flex items-center justify-center  ">
      <div className="bg-[#f7f7f7] p-7  rounded-md border xs:w-fit xs:h-fit w-1/4 sm:w-fit h-1/2 lg:w-96 ">
        <h1 className="text-xl font-bold flex justify-center">Sign-up</h1>
        <div>
          <p className="flex flex-col py-2">
            <p className="text-1xl font-medium text-customColor"> First Name</p>
            <input
              className="w-full p-3 border  outline-none rounded-md"
              ref={firstName}
              placeholder="Please Enter your firstName"
            ></input>
          </p>
        </div>
        <div>
          <p className="flex flex-col py-2 ">
            <p className="text-1xl font-medium text-customColor  ">Last Name</p>
            <input
              className="w-full p-3 border   outline-none rounded-md"
              ref={secondName}
              placeholder="Please Enter your LastName"
            ></input>
          </p>
        </div>
        <div>
          <p className="flex flex-col py-2 ">
            <p className="text-1xl font-medium text-customColor ">Email</p>
            <input
              className="w-full p-3 border   outline-none rounded-md"
              ref={userEmail}
              placeholder="Please Enter your Email"
            ></input>
          </p>
        </div>
        <div>
          <p className="flex flex-col py-2 ">
            <p className="text-1xl font-medium  text-customColor  ">Password</p>
            <input
              type="password"
              className="w-full p-3 border   outline-none rounded-md"
              ref={userPassword}
              placeholder="Please Enter your Password"
            ></input>
          </p>
        </div>
        <div className="flex flex-col justify-end items-end">
          <Link to="/Login">
            <button
              className="bg-customcolorred  p-2 text-white text-lg hover:font-medium rounded-md   hover:text-black hover:shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out"
              onClick={handleUserLogin}
            >
              Sign-up
            </button>
          </Link>
          <Link to="/Login">
            <button className=" p-2 text-customColor ed-md underline text-lg font-medium">
              Sign-In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
