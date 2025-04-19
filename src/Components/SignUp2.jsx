import { useForm } from "react-hook-form";
import React from "react";
function SignUp2() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => { })}>
      <div className=" bg-customColor h-screen w-screen  ">
        <h1 className="text-3xl text-white font-sans  flex justify-center pt-5 pb-10">
          Sign-up
        </h1>
        <div className="flex justify-center mt-10">
          <div className="flex flex-col w-1/3  bg-gray-100 p-4 rounded-md">
            <label className="text-customColor font-medium text-xl ">
              First Name
            </label>
            <input
              {...register("firstName", { required: " This is Required" })}
              placeholder="First Name"
              className="w-fullrounded-lg h-12 mb-2  p-2 "
            />
            <p className="text-customcolorred">{errors.firstName?.message}</p>

            <label className="text-customColor font-medium text-xl">
              Last Name
            </label>
            <input
              {...register("lastName", { required: true })}
              placeholder="Last Name"
              className="  w-full rounded-lg h-12 mb-2  p-2"
            />
            <p className="text-customcolorred">{errors.firstName?.message}</p>
            <label className="text-customColor font-medium text-xl">
              Email
            </label>
            <input
              {...register("Email", { required: true })}
              placeholder="Email"
              className="  w-full  rounded-lg h-12 mb-2 p-2"
            />
            <p className="text-customcolorred">{errors.firstName?.message}</p>

            <label className="text-customColor font-medium text-xl">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              placeholder="Password"
              className="  w-full bg-white  rounded-lg h-12 mb-2  p-2"
            />
            <p className="text-customcolorred">{errors.firstName?.message}</p>

            <input
              type="submit"
              className="text-white
        mt-5 border bg-customColor p-3 font-bold rounded"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
export default SignUp2;
