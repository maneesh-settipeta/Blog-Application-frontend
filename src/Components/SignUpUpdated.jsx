import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; 
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL } from "../URL";
import { Navigate, useNavigate } from "react-router-dom";
function SignUpUpdated() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    const { firstName, lastName, Email, password } = data;
    const uuid = uuidv4();

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     Email,
    //     password
    //   );

    //   const user = userCredential.user;
    //   const userData = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: Email,
    //     password: password,
    //     id: user.uid,
    //     following: [],
    //     blogLike: [],
    //     bookmarks: [],
    //     likedBlog: [],
    //     savedBlogs: [],
    //     followingUserDetails: [],
    //   };
      
    //   await setDoc(doc(db, "users", user.uid), userData);
    // } catch (error) {
    //   setError("root", {
    //     type: "manual",
    //     message: error?.message,
    //   });
    //   console.error("Error signing up: ", error);
    // }
    const userDataToPostGresSql = {
      firstName: firstName,
      lastName: lastName,
      email: Email,
      password: password,
      userUuid:uuid,
    }

    
    try {
      const response = await axios.post(`${baseURL}/SignUp`, userDataToPostGresSql);
      console.log(response);
      
      navigate('/Login')
    } catch (error) {
      console.error(error,"User Creation Error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-customColor h-screen w-screen">
       
        <div className="flex justify-center ">
          
          <div className="flex flex-col  md:w-1/3 xs:w-fit bg-gray-100 p-4 rounded-md mt-12">
          <h1 className="text-3xl text-customColor font-medium flex justify-center">
          Sign-up
        </h1>
          
            <label className="text-customColor font-medium text-xl">
              First Name
            </label>
            <input
              {...register("firstName", { required: "This is Required" })}
              placeholder="First Name"
              className="w-full rounded-lg h-12 mb-2 p-2"
            />
            <p className="text-customcolorred">{errors.firstName?.message}</p>

            <label className="text-customColor font-medium text-xl">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "This is Required" })}
              placeholder="Last Name"
              className="w-full rounded-lg h-12 mb-2 p-2"
            />
            <p className="text-customcolorred">{errors.lastName?.message}</p>

            <label className="text-customColor font-medium text-xl">
              Email
            </label>
            <input
              {...register("Email", {
                required: "This is Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
              className="w-full rounded-lg h-12 mb-2 p-2"
            />
            <p className="text-customcolorred">{errors.Email?.message}</p>
            <label className="text-customColor font-medium text-xl">
              Password
            </label>
            <input
              {...register("password", {
                required: "This is Required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full bg-white rounded-lg h-12 mb-2 p-2"
            />
            <p className="text-customcolorred">{errors.password?.message}</p>
            {errors.root && (
              <p className="text-red-500  text-sm">{errors.root.message}</p>
            )}
            <div className="flex justify-end">
            <input
              type="submit"
             className="bg-customcolorred p-2 text-white/80 text-lg mt-5 hover:font-medium  rounded-md hover:text-black hover:shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out"
            />
            </div>
            <div className="flex justify-center mt-5">
          <Link to="/Login">
            <button className="text-base mt-2 font-medium text-customColor  underline">
              Already have an Account? Sign-In Here
            </button>
          </Link>
        </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpUpdated;
