import { Button, FileInput, Label, Spinner, TextInput } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const AddTask = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  if (!user && !loading) {
    router.push("/login");
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const imghostkey = process.env.NEXT_PUBLIC_ANALYTICS_imgbb;
  const onSubmit = (data) => {
    setIsLoading(true);
    const image = data.task_media[0];
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
          const task = {
            task_name: data.task_name,
            task_image: imageData.data.url,
            published_time: new Date(),
            userEmail: user.email,
          };
          fetch("http://localhost:4000/add-task", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success("Added");
              reset();
              setIsLoading(false);
            });
        } else {
          toast.error("Provide a Valid image file");
          setIsLoading(false);
        }
      });
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
                    htmlFor="task"
                    value="Task Name"
                  />
                </div>
                <TextInput
                  id="task"
                  type="text"
                  placeholder="i.e : Do shopping"
                  required={true}
                  {...register("task_name")}
                />
              </div>
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label
                    className="text-white"
                    htmlFor="file"
                    value="Upload media file"
                  />
                </div>
                <FileInput id="file" {...register("task_media")} />
              </div>
              {isLoading && (
                <Spinner
                  aria-label="Center-aligned spinner example"
                  className="my-4"
                />
              )}
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
