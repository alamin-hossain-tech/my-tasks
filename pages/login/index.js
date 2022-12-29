import { GoogleAuthProvider } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { signIn, setLoading, providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((res) => {
        setLoading(false);
        reset();
        toast.success("Successfully logged in!");
        // navigate(from, { replace: true });
        setTimeout(() => {
          router.push("/add-task");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.message === "Firebase: Error (auth/wrong-password)."
            ? "Wrong Password"
            : error.message
        );
      });
  };

  return (
    <div className="bg-gray-900 h-screen ">
      <Head>
        <title>Login</title>
      </Head>
      <div className="text-center text-white pt-12 pb-5">
        <h1 className="text-4xl">Login</h1>
      </div>
      <div className=" w-1/2 mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              Need an account? Please do{" "}
              <Link href={"/register"} className="text-blue-600">
                Register
              </Link>
            </p>
          </div>

          <Button type="submit">Login</Button>
        </form>
        <Toaster />
      </div>
      <div className="py-5 pb-8">
        <Button className="mx-auto">
          <FcGoogle className="text-2xl mr-2"></FcGoogle> Google Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
