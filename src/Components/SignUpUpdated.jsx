import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
function SignUpUpdated() {
  //   const firstName = useRef(null);
  //   const lastName = useRef(null);
  //   const email = useRef(null);
  //   const password = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(data) {
    const { firstName, lastName, Email, password } = data;
    console.log(firstName, lastName, Email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Email,
        password
      );
      console.log(userCredential);

      const user = userCredential.user;
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: Email,
        password: password,
        id: user.uid,
        following: [],
        blogLike: [],
        bookmarks: [],
        likedBlog: [],
        savedBlogs: [],
        followingUserDetails: [],
      };
      await setDoc(doc(db, "users", user.uid), userData);
    } catch (error) {
      console.log(error.message);
      console.log(error?.errors?.message);

      //   setError("root", { type: "custom", message: "custom message" });
      setError("root", {
        type: "manual",
        message: error?.message,
      });
      console.error("Error signing up: ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-customColor h-screen w-screen">
        <h1 className="text-3xl text-white font-sans flex justify-center pt-5 pb-10">
          Sign-up
        </h1>
        <div className="flex justify-center mt-10">
          <div className="flex flex-col  md:w-1/3 xs:w-fit bg-gray-100 p-4 rounded-md">
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
              placeholder="Password"
              className="w-full bg-white rounded-lg h-12 mb-2 p-2"
            />
            <p className="text-customcolorred">{errors.password?.message}</p>
            {errors.root && (
              <p className="text-red-500  text-sm">{errors.root.message}</p>
            )}
            <input
              type="submit"
              className="text-white mt-5 border bg-customColor p-3 font-bold rounded"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpUpdated;
