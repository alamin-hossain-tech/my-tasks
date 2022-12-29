import { Button, FileInput, Label, Spinner, TextInput } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const AddTask = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
    toast.success("Success");
  };

  return (
    <div>
      <Head>
        <title>Add Task | MY TASKS</title>
      </Head>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : (
        <div className="bg-gray-900">
          <div className="text-center text-white py-5">
            <h1 className="text-4xl">Add Task</h1>
          </div>
          <div className=" w-1/2 mx-auto h-screen">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  {...register("name")}
                />
              </div>
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label
                    className="text-white"
                    htmlFor="file"
                    value="Upload file"
                  />
                </div>
                <FileInput id="file" />
              </div>

              <Button type="submit">Add Task</Button>
            </form>
            <Toaster />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
