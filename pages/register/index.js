import { GoogleAuthProvider } from "firebase/auth";
import { Button, FileInput, Label, Spinner, TextInput } from "flowbite-react";
import Head from "next/head";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const imghostkey = process.env.NEXT_PUBLIC_ANALYTICS_imgbb;
  console.log(imghostkey);
  const { createUser, updateUserProfile, providerLogin } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [createdEmail, setCreatedEmail] = useState("");

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };

    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const image = data.profile_image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          createUser(data.email, data.password)
            .then((result) => {
              handleUpdateUserProfile(data.name, imageData.data.url);
              toast.success("Succesfully Signed Up");
              reset();
            })
            .catch((e) => {
              toast.error(
                e.message === "Firebase: Error (auth/email-already-in-use)."
                  ? "Email already in Use"
                  : e.message
              );
              setIsLoading(false);
            });
        }
      });
  };

  return (
    <div className="bg-gray-900 h-screen">
      <Head>
        <title>Register</title>
      </Head>
      <div className="text-center text-white pt-12 pb-5">
        <h1 className="text-xl lg:text-4xl">Register</h1>
      </div>
      <div className=" w-11/12 lg:w-1/2 mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label className="text-white" htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="John Doe"
              required={true}
              {...register("name")}
            />
          </div>
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="file"
                value="Upload Your Image"
              />
            </div>
            <FileInput
              id="file"
              required={true}
              {...register("profile_image")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="email1"
                value="Your email"
              />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required={true}
              {...register("email")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="password1"
                value="Your password"
              />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              {...register("password")}
            />
          </div>
          <div className="py-3 text-white">
            <p>
              Already have an account? Please do{" "}
              <Link href={"/login"} className="text-blue-600">
                Login
              </Link>
            </p>
          </div>
          {isLoading && (
            <Spinner
              aria-label="Center-aligned spinner example"
              className="my-4"
            />
          )}

          <Button type="submit">Sign Up</Button>
        </form>
        <Toaster />
      </div>
      <div className="py-5 pb-8">
        <Button className="mx-auto">
          <FcGoogle className="text-2xl mr-2"></FcGoogle> Google Sign up
        </Button>
      </div>
    </div>
  );
};

export default Register;
